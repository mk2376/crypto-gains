import {fetchArchiveOpen_order, fetchCryptoCompare, fetchCreateOpen_order, fetchDeleteOpen_order, fetchReadOpen_orders, fetchUpdateOpen_order} from "../data/api";

const state = {
    contracts: [],
    cryptos: [],
    errors: [],
    pending: false,
    selectedItem: {symbol: null, coins: null, initial_price: null},
    selectedItemFinal: {symbol: null, coins: null, initial_price: null, final_price: null},
    isEditMode: false,
    dataDialog: false,
    deleteDialog: false,
    archiveDialog: false,
};

// getters
const getters = {

};

// actions
const actions = {
    readOpen_orders({state, commit, dispatch}) {
        commit('fetchingOpen_orders');
        fetchReadOpen_orders().then(jsonResponse => {
            commit('setOpen_orders', jsonResponse.data.data)

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
        if (state.isEditMode === true) {
            dispatch('edit');
        } else {
            dispatch('add');
        }
    },
    deleteOpen_order({commit,dispatch}) {
        commit('setPending',true);
        fetchDeleteOpen_order().then(()=> {
            commit('setPending',false);
            commit('hideDeleteDialog');
            dispatch('readOpen_orders');
        }, () => {                      // user already deleted probably from second device
            commit('setPending',false);
            commit('hideDeleteDialog');
            dispatch('readOpen_orders');
        })
    },
    archiveOpen_order({commit,dispatch}) {
        commit('setPending',true);
        fetchArchiveOpen_order().then(()=> {
            commit('setPending',false);
            commit('hideArchiveDialog');
            dispatch('readOpen_orders');
        }, () => {                      // user already deleted probably from second device
            commit('setPending',false);
            commit('hideArchiveDialog');
            dispatch('readOpen_orders');
        })
    },
    add({commit,dispatch}) {
        commit('setPending',true);
        fetchCreateOpen_order().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readOpen_orders');
        }, () => {                      // adding failed
            commit('setPending',false);
        })
    },
    edit({commit,dispatch}) {
        commit('setPending',true);
        fetchUpdateOpen_order().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readOpen_orders');
        }, () => {                      // edit failed
            commit('setPending',false);
        })
    }
};

// mutations
const mutations = {
    ['fetchingOpen_orders'](state) {
        state.pending = true;
    },
    ['setOpen_orders'](state, contracts) {
        state.pending = false;
        state.contracts = contracts;
    },
    ['setSelectedItem'](state, selectedItem) {
        state.selectedItem = selectedItem;
    },
    ['setSelectedItemFinal'](state, selectedItemFinal) {
        //console.log(selectedItemFinal);
        state.selectedItemFinal = {...selectedItemFinal};
        state.selectedItemFinal.final_price = Number(selectedItemFinal.coins * state.cryptos[selectedItemFinal.symbol]['USD']['PRICE']).toFixed(2);
    },
    ['setCryptos'](state, cryptos) {
        state.cryptos = cryptos;
    },

    
    ['setSymbol'](state, symbol) {
        state.selectedItem.symbol = symbol;
    },
    ['setSymbolFinal'](state, symbol) {
        state.selectedItemFinal.symbol = symbol;
    },
    ['setCoins'](state, coins) {
        state.selectedItem.coins = coins;
    },
    ['setCoinsFinal'](state, coins) {
        state.selectedItemFinal.coins = coins;
    },
    ['setInitial_price'](state, initial_price) {
        state.selectedItem.initial_price = initial_price;
    },
    ['setInitial_priceFinal'](state, initial_price) {
        state.selectedItemFinal.initial_price = initial_price;
    },
    ['setFinal_price'](state, final_price) {
        state.selectedItemFinal.final_price = final_price;
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
        state.dataDialog = false;
    },
    ['showDataDialog'](state) {
        state.dataDialog = true
    },
    ['hideArchiveDialog'](state) {
        state.archiveDialog = false
    },
    ['showArchiveDialog'](state) {
        state.archiveDialog = true
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
