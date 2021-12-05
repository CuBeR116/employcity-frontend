import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import * as icon from '@mdi/js';

Vue.use(Vuetify);

const opts = {
    theme: {dark: true}, icons: {
        iconfont: 'mdi', // default
        values: {
            'arrow-down': icon.mdiArrowDown,
            basket: icon.mdiBasketOutline,
            checked: icon.mdiBookmarkCheckOutline,
            warning: icon.mdiAlertCircle,
        },
    },
};

export default new Vuetify(opts);