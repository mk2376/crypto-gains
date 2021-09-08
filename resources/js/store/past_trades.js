import {fetchCryptoCompare, fetchCreatePast_trade, fetchDeletePast_trade, fetchReadPast_trades, fetchUpdatePast_trade} from "../data/api";

const state = {
    contracts: [],
    cryptos: [],
    errors: [],
    pending: false,
    selectedItem: {symbol: null, coins: null, initial_price: null, final_price: null},
    isEditMode: false,
    dataDialog: false,
    deleteDialog: false
};

// getters
const getters = {};

// actions
const actions = {
    readPast_trades({commit}) {
        commit('fetchingPast_trades');
        fetchReadPast_trades().then(jsonResponse => {
            commit('setPast_trades', jsonResponse.data.data)

            if (state.contracts.length !== 0) {
                //console.log("state.contracts ", state.contracts);
                //console.log("symbol", state.contracts.map(contract => contract.symbol));
                fetchCryptoCompare(String(state.contracts.map(contract => contract.symbol)).toUpperCase()).then(jsonResponse => {
                    //console.log(response)         // This will give you access to the full object
                    commit('setCryptos', jsonResponse.data.RAW);
                    //console.log(state.cryptos);
                }, () => {
                    // Data could not be retrived from server
                    this.errors.push(e);
                });
            }
        }, () => {
            // Data could not be retrived from server
        });
    },
    addOrEdit({state, commit, dispatch}) {
        if(state.isEditMode === true) {
            dispatch('edit');
        } else {
            dispatch('add');
        }
    },
    deletePast_trade({commit,dispatch}) {
        commit('setPending',true);
        fetchDeletePast_trade().then(()=> {
            commit('setPending',false);
            commit('hideDeleteDialog');
            dispatch('readPast_trades');
        }, () => {                      // user already deleted probably from second device
            commit('setPending',false);
            commit('hideDeleteDialog');
            dispatch('readPast_trades');
        })
    },
    add({commit,dispatch}) {
        commit('setPending',true);
        fetchCreatePast_trade().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readPast_trades');
        }, () => {                      // adding failed
            commit('setPending',false);
        })
    },
    edit({commit,dispatch}) {
        commit('setPending',true);
        fetchUpdatePast_trade().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readPast_trades');
        }, () => {                      // edit failed
            commit('setPending',false);
        })
    }
};

// mutations
const mutations = {
    ['fetchingPast_trades'](state) {
        state.pending = true;
    },
    ['setPast_trades'](state, contracts) {
        state.pending = false;
        state.contracts = contracts;
    },
    ['setSelectedItem'](state, selectedItem) {
        state.selectedItem = selectedItem;
    },
    ['setCryptos'](state, cryptos) {
        state.cryptos = cryptos;
    },

    
    ['setSymbol'](state, symbol) {
        state.selectedItem.symbol = symbol;
    },
    ['setCoins'](state, coins) {
        state.selectedItem.coins = coins;
    },
    ['setInitial_price'](state, initial_price) {
        state.selectedItem.initial_price = initial_price;
    },
    ['setFinal_price'](state, final_price) {
        state.selectedItem.final_price = final_price;
    },


    ['setEditMode'](state, editMode) {
        state.isEditMode = editMode;
    },
    ['setPending'](state, pending) {
        state.pending = pending;
    },
    ['hideDeleteDialog'](state) {
        state.deleteDialog = false
    },
    ['showDeleteDialog'](state) {
        state.deleteDialog = true
    },
    ['hideDataDialog'](state) {
        state.dataDialog = false
    },
    ['showDataDialog'](state) {
        state.dataDialog = true
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
