import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state: {
            title: ""
        },
        mutations: {
            updateTitle(state, newTitle) {
                state.title = newTitle;
            }
        }
    });
};

export default createStore;
