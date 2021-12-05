import BasketItemEntity from '@/components/Products/Basket/BasketItemEntity.js';

const basket = {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {
        basket(state) {
            return state.items;
        },
        get: (state) => (id) => {
            return state.items.find(i => i.getId() === id);
        },
    },
    mutations: {
        add(state, value = BasketItemEntity) {
            state.items.push(value);

            return state;
        },
        delete(state, value) {
            state.items = state.items.filter(i => i.getId() !== value);

            return state;
        },
        clear(state) {
            state.items = [];

            return state;
        },
    },
};

export default basket;