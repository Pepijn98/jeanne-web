export default {
    commands() {
        return {
            path: '/commands.json',
            resolve: (response, mappers) => mappers.pipe(response.results)
        };
    }
};
