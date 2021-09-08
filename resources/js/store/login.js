import {fetchLogin, fetchSignUp, fetchLogout} from "../data/api";
import {getToken, removeToken, saveToken} from "../data/localStorage";
import router from '../router';

const state = {
    isLoggedIn: !!getToken(),
    pending: false,
    showPassword: false,
    password: '',
    username: '',
    mode: 'login',
    isMsg: false,
    msgGood: false,
    msg: '',
};

// getters
const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn
    }
};

// actions
const actions = {

    loginOrSignUp({dispatch,state}) {
        if (state.mode === 'login') {
            dispatch('login')
        } else {
            dispatch('signUp')
        }
    },
    login({commit}) {
        commit('login');
        fetchLogin().then(jsonResponse => {
            saveToken(jsonResponse.headers.authorization);
            commit('setMsg', { good:true, msg:jsonResponse.data.data});
            commit('loginSuccess');
            router.push('/open_orders')
        }, jsonResponse => {                  // login failed
            //console.log("Failed!")
            commit('loginFailed');
            commit('setMsg', { good:false, msg:regex(jsonResponse)});
        });
    },
    logout({commit}) {
        commit('logout');
        fetchLogout().then(jsonResponse => {
            saveToken(jsonResponse.headers.authorization);
            commit('setMsg', { good:true, msg:jsonResponse.data.data});
            commit('logoutSuccess');
            removeToken();
            router.push('/login')
        }, jsonResponse => {                  // logout failed
            //console.log("Failed!")
            commit('logoutFailed');
            commit('setMsg', { good:false, msg:regex(jsonResponse)});
        });
    },
    signUp({commit}) {
        commit('login')
        fetchSignUp().then(jsonResponse => {
            commit('setMsg', { good:true, msg:jsonResponse.data.data});
            commit('loginSuccess');
            commit('loginMode');
        }, jsonResponse => {                  // signUp failed
            //console.log("Failed!")
            commit('loginFailed');
            removeToken();
            commit('setMsg', { good:false, msg:regex(jsonResponse)});
        })
    }
};

// mutations
const mutations = {
    ['login'](state) {
        state.pending = true;
    },
    ['loginSuccess'](state) {
        state.isLoggedIn = true;
        state.pending = false;
    },
    ['loginFailed'](state) {
        state.pending = false;
    },


    ['logout'](state) {
        state.pending = true;
    },
    ['logoutSuccess'](state) {
        state.isLoggedIn = false;
        state.pending = false;
    },
    ['logoutFailed'](state) {
        state.isLoggedIn = false;
        state.pending = false;
    },


    ['setUsername'](state, username) {
        state.username = username;
    },
    ['setPassword'](state, password) {
        state.password = password;
    },
    ['togglePassword'](state) {
        state.showPassword = !state.showPassword;
    },
    ['loginMode'](state) {
        state.mode = 'login';
    },
    ['signUpMode'](state) {
        state.mode = 'signUp';
    },
    ['toggleMode'](state) {
        state.mode = state.mode === 'signUp'? 'login': 'signUp';
    },
    ['setMsg'](state, data) {
        let good = data.good;
        let msg = data.msg;

        //console.log(good, msg)
        revertState(state);
        state.msgGood = good;
        state.isMsg = true;
        state.msg = msg;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

function regex(jsonResponse) {
    let str = JSON.stringify(jsonResponse.response.data.errors);
    str = String(str.match(/(?<=\[\").+(?=\"\])/g));
    //console.log(str);
    //console.log(typeof str);
    str = str.replaceAll("[\"", '');
    str = str.replaceAll("\"]", '');

    return str;
}

let timeouts = [];

function revertState(state) {
    //console.log(timeouts)        // Prevents interutpting previus timeout
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];

    timeouts.push(setTimeout(() => {
        state.isMsg = false;
        //console.log("timeout");
    }, 6000));

    timeouts.push(setTimeout(() => {
        state.msg = '';
        //console.log("timeout");
    }, 8000));
}