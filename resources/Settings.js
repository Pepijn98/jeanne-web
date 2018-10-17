export default {
    settings() {
        return {
            path: '/settings.json',
            resolve: (response, mappers) => mappers.pipe(response.results)
        };
    }
};
