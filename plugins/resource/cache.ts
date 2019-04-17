export default (() => {
    let store = {};
    return {
        has: (uri: string): boolean => Boolean(store[uri]),
        get: (uri: string): any => JSON.parse(store[uri]),
        set: (uri: string, data: Object): Promise<Object> => {
            store[uri] = JSON.stringify(data);
            return Promise.resolve(data);
        }
    };
})();
