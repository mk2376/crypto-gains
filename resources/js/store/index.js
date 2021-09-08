import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
import VueAxios from 'vue-axios'
import login from './login';
import past_trades from './past_trades';
import open_orders from './open_orders';


Vue.use(Vuex, VueAxios, axios);

export default new Vuex.Store({
    namespaced: true,
    modules: {
        login,
        past_trades,
        open_orders
    },

    actions: {
        // Shared actions
    },

    getters: {
 
       // Shared getters
    }
})