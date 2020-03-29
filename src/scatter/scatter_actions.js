import { 
    LOGIN,
    LOGGED_IN,
    LOG_OUT,
    LOGGED_OUT,
    CONNECTION_ERROR,
    LOGIN_ERROR
} from './types';

export const logout    = () => ({type: LOG_OUT});
export const loggedOut = () => ({type: LOGGED_OUT});

export const connectionError   = () => ({type: CONNECTION_ERROR});

export const logInSuccess      = payload => ({type: LOGGED_IN, payload});
export const requestLogin      = () => ({type: LOGIN});
export const loginError        = () => ({type: LOGIN_ERROR});

// export const fetchWallet       = () => ({type: SCATTER_ACTIONS.GET_WALLET});
// export const errorGettingWallet= payload => ({type: SCATTER_ACTIONS.GET_WALLET_ERROR, payload});
// export const setWallet         = payload => ({type: SCATTER_ACTIONS.SET_WALLET, payload});

// export const sendTokens        = payload => ({type: SCATTER_ACTIONS.SEND_TOKEN, payload});
// export const tokenTransferred   = () => ({type: SCATTER_ACTIONS.SEND_TOKEN_SUCCESS});

// export const checkAccount      = payload => ({type: SCATTER_ACTIONS.CHECK_ACCOUNT, payload});

// export const uploadCrop        = payload => ({type: SCATTER_ACTIONS.UPLOAD_CROP, payload});
// // export const getCropDetailsTable = (payload) => ({type: SCATTER_ACTIONS.GET_CROPS, payload});
// export const buyCrop        = payload => ({type: SCATTER_ACTIONS.BUY_CROP, payload});
// export const transactionUpload = () => ({type: SCATTER_ACTIONS.UPLOAD_CROP});
