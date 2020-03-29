// import { takeLatest, put, call } from 'redux-saga/effects';

// import {
//     connectedScatter,
//     logInSuccess,
//     connectionError,
//     setWallet,
//     errorGettingWallet,
//     loggedOut,
//     tokenTransferred,
//     fetchWallet,
// } from './scatter_actions';

// import {
//     connect,
//     login,
//     loginHistoryExists,
//     getWallet,
//     logout,
//     sendTokens,
//     uploadCrop,
//     buyCrop,
// } from "./scatter_helper";

// import {
//     createNewAccount,
//     generateKeys,
//     getAccount,
//     getCropDetailsTable
// } from "./localWallet_helper";

// // import {
// //     loginKeycat
// // } from "./keycat_helper";

// import {
//     notifyError,
//     notifyInfo,
//     notifySuccess
// } from "../utils";

// const APP_NAME = 'FoodSCM';

// function* connectWithScatter() {
//     try {
//         yield call(connect, APP_NAME);
//         yield put(connectedScatter());
//     } catch (e) {
//         yield put(connectionError());
//     }
// }

// function* attemptAutoLoginWithScatter() {
//     try {
//         if (loginHistoryExists()) {
//             yield call(connect, APP_NAME);
//             yield put(connectedScatter());
//             try {
//                 const { name, publicKey, authority } = yield call(login);
//                 yield put(logInSuccess({ name, publicKey, keyType: authority }));
//                 notifySuccess(`Logged in as ${name}`, 1);
//             } catch (e) {
//                 console.error(e)
//                 notifyError('Scatter rejected login request !', 3);
//             }
//         }
//     } catch (e) {
//         notifyInfo('Please unlock Scatter !', 3);
//     }
// }

// function* signup() {
//     try {
//         const traxId = yield call(getAccount);
//         console.log("trx: ", traxId)

//     } catch (e) {
//         console.log('error!')
//     }
// }

// function* checkAccount(accountName) {
//     try {
//         const accountName = yield call(getAccount);
//         console.log("Account name: ", accountName)

//     } catch (e) {
//         console.log('error!')
//     }
// }

// function* fetchUserWallet() {
//     try {
//         const wallet = yield call(getWallet);
//         yield put(setWallet(wallet));
//     } catch (e) {
//         yield put(errorGettingWallet({ message: e.message }));
//         // notifyError('Error fetching wallet !', 3);
//     }
// }

// // function* getCrops() {
// //     try{
// //         const cropDetailsTable = yield call(getCropDetailsTable);

// //     }catch (e) {

// //     }
// // }


// function* logOutUser() {
//     yield call(logout);
//     yield put(loggedOut());
//     notifyInfo('Logged out !', 3);
// }

// function* transferTokens(action) {
//     try {
//         yield call(sendTokens, action.payload);
//         yield put(tokenTransferred());
//         notifySuccess('Successfully transferred tokens', 3);
//         yield put(fetchWallet());
//     } catch (e) {
//         notifyError(e.message, 5);
//     }
// }

// function* uploadTrans(data) {
//     try {
//         yield call(uploadCrop(data));
//     } catch (e) {
//         notifyError(e.message, 5);
//     }
// }

// function* buyCrops(productId) {
//     try {
//         yield call(buyCrop(productId));
//     } catch (e) {
//         notifyError(e.message, 1);
//     }
// }
                
// export default function* missionsSagas() {
//     yield takeLatest(CONNECT, connectWithScatter);
//     yield takeLatest(LOGIN, signup);
//     yield takeLatest(LOGIN, checkAccount);
//     yield takeLatest(GET_WALLET, fetchUserWallet);
//     yield takeLatest(LOG_OUT, logOutUser);
//     yield takeLatest(SEND_TOKEN, transferTokens);
//     yield takeLatest(UPLOAD_CROP, uploadTrans);
//     yield takeLatest(BUY_CROP, buyCrops);
// }