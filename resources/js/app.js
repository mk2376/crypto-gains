
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync'
import router from "./router";
import store from "./store/index";
import vClickOutside from 'v-click-outside'
import Vue from 'vue';

require('./bootstrap');

Vue.use(vClickOutside);

Vue.use(Vuetify, {
    // rtl: true,
    theme: {
        primary: '#b71c1c',
        success: '#4CAF50'
    }
});

Vue.component('app', require('./index.vue').default);

sync(store, router);

const app = new Vue({
    router,
    store,
    vuetify: new Vuetify({}),
    el: '#app',
});

