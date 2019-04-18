import _merge from "lodash.merge";
import cache from "./cache";
import { AxiosResponse } from "axios";
import { VueConstructor as Vue } from "vue";

interface Mappers {
    pipe(dataSet: any): Promise<any>;
    merge(dataSet: any): Promise<any>;
    set(dataSet: any): Promise<any>;
}

const resolve = (response: any, mappers: Mappers) => mappers.pipe(response.results);

export default {
    install(Vue: Vue, { endpoint = "" }) {
        Vue.prototype.$getResource = async function (method: string): Promise<any> {
            let name = this.$options.resource;
            if (!name) return;

            let uri = `${endpoint}?type=${method}`;

            const mappers: Mappers = {
                pipe: (dataSet: any): Promise<any> => Promise.resolve(dataSet),
                merge: (dataSet: any): Promise<any> => {
                    _merge(this.$data, dataSet);
                    return Promise.resolve(dataSet);
                },
                set: (dataSet: any): Promise<any> => {
                    Object.keys(dataSet).forEach((prop) => this.$set(this.$data, prop, dataSet[prop]));
                    return Promise.resolve(dataSet);
                }
            };

            if (cache.has(uri))
                return resolve(cache.get(uri), mappers);

            let response: AxiosResponse = await Vue.prototype.$http.get(uri);
            let data = await cache.set(uri, response.data);
            return resolve(data, mappers);
        };
    }
};
