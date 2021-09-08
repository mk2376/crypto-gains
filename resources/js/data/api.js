import axios from "axios";
import {getToken} from "../data/localStorage";
import store from '../store/index';

function crypto_api_link(cryptos) {
    return "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+cryptos+"&tsyms=USD"; 
}

const instance = axios.create({
    transformRequest: [(data, headers) => {
        delete headers.common['X-CSRF-TOKEN'];
        delete headers.common['X-Requested-With'];
        return data;
    }]
});

export function fetchLogin() {
    let state = store.state.login;
    return post('/api/auth/login', {
        username: state.username,
        password: state.password
    });
}

export function fetchLogout() {
    return post('/api/auth/logout', null);
}

export function fetchSignUp() {
    let state = store.state.login;
    return post('/api/auth/sign-up', {
        username: state.username,
        password: state.password
    });
}





export function fetchArchiveOpen_order() {
    let open_orders = store.state.open_orders;
    return post('/api/call/archive-open_order', {
        id: open_orders.selectedItemFinal.id,
        symbol: open_orders.selectedItemFinal.symbol,
        coins: open_orders.selectedItemFinal.coins,
        initial_price: open_orders.selectedItemFinal.initial_price,
        final_price: open_orders.selectedItemFinal.final_price,
    });
}

export function fetchReadOpen_orders() {
    return post('/api/call/read-open_orders');
}

export function fetchCryptoCompare(cryptos) {       // fetchCryptoCompare
    //console.log(cryptos);
    //console.log(crypto_api_link(cryptos));
    return instance.get(crypto_api_link(cryptos));
}

export function fetchCreateOpen_order() {
    let state = store.state.open_orders;
    return post('/api/call/create-open_order', {
        symbol: state.selectedItem.symbol,
        coins: state.selectedItem.coins,
        initial_price: state.selectedItem.initial_price,
    });
}

export function fetchUpdateOpen_order() {
    let state = store.state.open_orders;
    return post('/api/call/update-open_order', {
        id: state.selectedItem.id,
        symbol: state.selectedItem.symbol,
        coins: state.selectedItem.coins,
        initial_price: state.selectedItem.initial_price,
    });
}


export function fetchDeleteOpen_order() {
    let state = store.state.open_orders;
    return post('/api/call/delete-open_order', {
        id: state.selectedItem.id
    });
}





export function fetchReadPast_trades() {
    return post('/api/call/read-past_trades');
}

export function fetchCreatePast_trade() {
    let state = store.state.past_trades;
    return post('/api/call/create-past_trade', {
        symbol: state.selectedItem.symbol,
        coins: state.selectedItem.coins,
        initial_price: state.selectedItem.initial_price,
        final_price: state.selectedItem.final_price,
    });
}

export function fetchUpdatePast_trade() {
    let state = store.state.past_trades;
    return post('/api/call/update-past_trade', {
        id: state.selectedItem.id,
        symbol: state.selectedItem.symbol,
        coins: state.selectedItem.coins,
        initial_price: state.selectedItem.initial_price,
        final_price: state.selectedItem.final_price,
    });
}


export function fetchDeletePast_trade() {
    let state = store.state.past_trades;
    return post('/api/call/delete-past_trade', {
        id: state.selectedItem.id
    });
}





export function post(url,creds) {
    return axios.post(url, creds, {
            headers: {
                Authorization: getToken()
            }
        }
    );

}

export function get(url) {
    return axios.get(url, {
            headers: {
                Authorization: getToken()
            }
        }
    );
}
