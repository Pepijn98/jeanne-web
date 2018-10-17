export default {
    features() {
        return {
            path: '/features.json',
            resolve: (response, mappers) => mappers.pipe(response.results)
        };
    }
};
