import {LOGIN,
    LOGGED_IN,
    LOG_OUT,
    LOGGED_OUT,
    CONNECTION_ERROR,
    CONNECTING,
    CONNECTED,
    LOGIN_ERROR } from './types';

const INITIAL_STATE = {
    connected       : false,
    connecting      : false,
    connectionError : false,

    loggedIn        : false,
    requestedLogIn  : false,
    loginFailed     : false,

    userAccount     : null,
    // userWallet      : null,
    // fetchingWallet  : false,
    // walletError     : null,
    sendingTokens   : false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CONNECTING:
            return {...state, connecting: true,};

        case CONNECTED:
            return {...state, connected: true, connectionError: false};

        case CONNECTION_ERROR:
            return {...state, connectionError: true};

        case LOGGED_IN:
            return {...state, loggedIn: true, loginFailed: false, userAccount: action.payload};

        // case GET_WALLET:
        //     return {...state, fetchingWallet: true, walletError: null};

        // case SET_WALLET:
        //     return {...state, fetchingWallet: false, walletError: null, userWallet: action.payload};

        // case SCATTER_ACTIONS.GET_WALLET_ERROR:
        //     return {...state, fetchingWallet: false, walletError: action.payload.message};

        case LOGGED_OUT:
            return {...state, loggedIn: false, loginFailed: false, userAccount: null, userWallet: null, walletError: null, fetchingWallet: false};

        // case SCATTER_ACTIONS.SEND_TOKEN:
        //     return {...state, sendingTokens: true};

        // case SCATTER_ACTIONS.SEND_TOKEN_SUCCESS:
        //     return {...state, sendingTokens: false};

        default:
            return state;
    }
};

export default reducer;