const usd = {
    namespaced: true,
    state: {
        value: 0,
        history: [],
        //Длина истории
        length: 10,
    },
    getters: {
        value(state) {
            return state.value;
        },
        history(state) {
            return state.history;
        },
    },
    mutations: {
        length(state, value) {
            state.length = value;
        },
        //Выставляет текущий курс USD, так же, сохраняет его в историю
        //Новое значение будет первым элементом
        setUsd(state, value) {
            state.value = value;
            state.history = [value, ...state.history.slice(0, state.length - 1)];

            return state;
        },
    },
};

export default usd;