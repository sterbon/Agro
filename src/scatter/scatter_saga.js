import { takeLatest, put, call } from 'redux-saga/effects';

import {
    SCATTER_ACTIONS,
    connectedScatter,
    logInSuccess,
    connectionError,
    loginError,
    setWallet,
    errorGettingWallet,
    loggedOut,
    tokenTransferred,
    fetchWallet,
} from './scatter_actions';

import {
    connect,
    login,
    loginHistoryExists,
    getWallet,
    logout,
    sendTokens,
    uploadCrop,
    buyCrop,
} from "./scatter_helper";

import {
    createNewAccount,
    generateKeys
} from "./localWallet_helper";

// import {
//     loginKeycat
// } from "./keycat_helper";

import {
    notifyError,
    notifyInfo,
    notifySuccess
} from "../utils";

const APP_NAME = 'FoodSCM';

function* connectWithScatter() {
    try {
        yield call(connect, APP_NAME);
        yield put(connectedScatter());
    } catch (e) {
        yield put(connectionError());
    }
}

function* attemptAutoLoginWithScatter() {
    try {
        if (loginHistoryExists()) {
            yield call(connect, APP_NAME);
            yield put(connectedScatter());
            try {
                const { name, publicKey, authority } = yield call(login);
                yield put(logInSuccess({ name, publicKey, keyType: authority }));
                notifySuccess(`Logged in as ${name}`, 1);
            } catch (e) {
                console.error(e)
                notifyError('Scatter rejected login request !', 3);
            }
        }
    } catch (e) {
        notifyInfo('Please unlock Scatter !', 3);
    }
}

function* signup() {
    try {
        const traxId = yield call(createNewAccount);
        console.log("trx: ", traxId)

    } catch (e) {
        console.log('error')
    }
}

function* fetchUserWallet() {
    try {
        const wallet = yield call(getWallet);
        yield put(setWallet(wallet));
    } catch (e) {
        yield put(errorGettingWallet({ message: e.message }));
        // notifyError('Error fetching wallet !', 3);
    }
}

function* logOutUser() {
    yield call(logout);
    yield put(loggedOut());
    notifyInfo('Logged out !', 3);
}

function* transferTokens(action) {
    try {
        yield call(sendTokens, action.payload);
        yield put(tokenTransferred());
        notifySuccess('Successfully transferred tokens', 3);
        yield put(fetchWallet());
    } catch (e) {
        notifyError(e.message, 5);
    }
}

function* uploadTrans(data) {
    try {
        yield call(uploadCrop(data));
    } catch (e) {
        notifyError(e.message, 5);
    }
}

function* buyCrops(productId) {
    try {
        yield call(buyCrop(productId));
    } catch (e) {
        notifyError(e.message, 1);
    }
}

export default function* missionsSagas() {
    yield takeLatest(SCATTER_ACTIONS.CONNECT, connectWithScatter);
    // yield takeLatest(SCATTER_ACTIONS.ATTEMPT_AUTO_LOGIN, attemptAutoLoginWithScatter);
    yield takeLatest(SCATTER_ACTIONS.LOGIN, signup);
    yield takeLatest(SCATTER_ACTIONS.GET_WALLET, fetchUserWallet);
    yield takeLatest(SCATTER_ACTIONS.LOG_OUT, logOutUser);
    yield takeLatest(SCATTER_ACTIONS.SEND_TOKEN, transferTokens);
    yield takeLatest(SCATTER_ACTIONS.UPLOAD_CROP, uploadTrans);
    yield takeLatest(SCATTER_ACTIONS.BUY_CROP, buyCrops);
}