import Vue from 'vue';
import Vuex from 'vuex';
import usd from '@/store/store.usd.js';
import basket from '@/store/store.basket.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        usd: usd,
        basket: basket,
    },
});