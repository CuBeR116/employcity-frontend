import Vue from 'vue';
import vuetify from '@/plugins/vuetify.js';
import App from '@/App.vue';
import {store} from '@/store';

new Vue({
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app');
