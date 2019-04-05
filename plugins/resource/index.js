import cache from './cache';
import _merge from 'lodash.merge';

const resolve = (response, mappers) => mappers.pipe(response.results);

export default {
    install(Vue, { endpoint = '' }) {
        Vue.prototype.$getResource = async function (method) {
            let name = this.$options.resource;
            if (!name) return;

            let uri = `${endpoint}?type=${method}`;

            const mappers = {
                pipe: (dataSet) => Promise.resolve(dataSet),

                merge: (dataSet) => {
                    _merge(this.$data, dataSet);
                    return Promise.resolve(dataSet);
                },

                set: (dataSet) => {
                    Object.keys(dataSet).forEach((prop) => this.$set(this.$data, prop, dataSet[prop]));
                    return Promise.resolve(dataSet);
                }
            };

            if (cache.has(uri))
                return resolve(cache.get(uri), mappers);

            let response = await Vue.prototype.$http.get(uri);
            response = await cache.set(uri, response.data);
            return resolve(response, mappers);
        };
    }
};
