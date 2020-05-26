// import ScatterJS from 'scatterjs-core';
// import ScatterEOS from 'scatterjs-plugin-eosjs';
// import Eos from 'eosjs';
// import {
//     parseEOS,
//     toEOSString,
//     notifySuccess
// } from '../utils';

// let
//     scatter = null,
//     userAccount = null,
//     userEosConnection = null;

// ScatterJS.plugins(new ScatterEOS());

// const network = {
//     blockchain:'eos',
//     chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
//     host:'jungle2.cryptolions.io',
//     port:443,
//     protocol:'https'
// };

// const eosOptions = {
//     expireInSeconds: 60
// }

// scatter = ScatterJS.scatter;
// userEosConnection = scatter.eos(network, Eos, eosOptions);

// export const loginHistoryExists = () => !!localStorage.getItem("lastLoginAt");
// const setLoginHistory = () => localStorage.setItem("lastLoginAt", new Date().getTime());

// export const connect = appName => (new Promise((resolve, reject)=> {
//     ScatterJS.scatter.connect(appName).then(connected => {
//         const
//             onSuccess = () => {
//                 scatter = ScatterJS.scatter;
//                 resolve();
//             },
//             onError = () => reject({
//                 message: "Scatter not found. Please install and unlock scatter"
//             });

//         connected ? onSuccess() : onError();
//     });
// }));

// export const login = ()=> {
//     // Can have more required fields like firstname, lastname, address
//     const requiredFields = { accounts:[network] };
//     return scatter.getIdentity(requiredFields).then(() => {
//         userAccount = scatter.identity.accounts.find(x => x.blockchain === 'eos');

//         setLoginHistory();
//         return {
//             name: userAccount.name,
//             authority: userAccount.authority,
//             publicKey: userAccount.publicKey
//         };
//     });
// };

// export const logout = () => scatter.logout();

// export const sendTokens = ({toAccount, amount, memo}) => {
//     const transactionOptions = { authorization:[`${userAccount.name}@${userAccount.authority}`] };
//     return userEosConnection.transfer(
//         userAccount.name,
//         toAccount,
//         toEOSString(amount),
//         memo,
//         transactionOptions
//     ).then(trx => {
//         return trx.transaction_id;
//     });
// };

// export const getWallet = () => {
//     return userEosConnection.getAccount(userAccount.name).then(userDetails=> {
//         const
//             liquidToken = parseEOS(userDetails.core_liquid_balance),
//             netStaked = parseEOS(userDetails.total_resources.net_weight),
//             cpuStaked = parseEOS(userDetails.total_resources.cpu_weight),
//             totalWorth = liquidToken + netStaked + cpuStaked;

//         return {
//             balance: {
//                 liquidToken,
//                 totalWorth,
//                 netStaked,
//                 cpuStaked,
//                 refunding: '',
//                 stakedByOthers: '',
//             },
//             resource: {
//                 net: {total: userDetails.net_limit.max, available: userDetails.net_limit.available},
//                 cpu: {total: userDetails.cpu_limit.max, available: userDetails.cpu_limit.available},
//                 ram: {total: userDetails.ram_quota,     available: userDetails.ram_usage}
//             }
//         }
//     });
// };

// export const uploadCrop = (data) => {
//     // console.log(data)
//     userEosConnection.transaction({
//         "blocksBehind": 3,
//         "expireSeconds": 30,
//         "actions": [
//             {
//               "account": "sterbon23411",
//               "name": "uploadcrop",
//               "data": {
//                 "producer": userAccount.name,
//                 "cropName": data.payload.pname,
//                 "cropAmount": data.payload.camount,
//                 "imageHash": "QmImageHash",
//                 "price": data.payload.price,
//                 "dateOfHarvest": data.payload.harvest,
//                 "dateOfSow": data.payload.sow,
//                 "fertilizers": data.payload.fertilizer 
//               },
//               "authorization": [
//                 {
//                   "actor": userAccount.name,
//                   "permission": "active"
//                 }
//               ]
//             }
//           ]
//         }).then(notifySuccess('Uploading'));
// }

// export const buyCrop = (productId) => {
//     console.log(productId)
//     notifySuccess('Uploading')
//     userEosConnection.transaction({
//         "blocksBehind": 3,
//         "expireSeconds": 30,
//         "actions": [
//             {
//               "account": "sterbon23411",
//               "name": "buycrop",
//               "data": {
//                 "buyer": userAccount.name,
//                 "cropPid": productId.payload,
//                 "price": "12.0000 JUNGLE",
//                 "memo": "Buy crop"
//               },
//               "authorization": [
//                 {
//                   "actor": userAccount.name,
//                   "permission": "active"
//                 }
//               ]
//             }
//           ]
//     }).then(notifySuccess('Uploading'));
// }

// export const getCropDetailsTable = () => {
//     try {
//         return userEosConnection.getTableRows({
//         "json": true,
//         "code": "sterbon23411",
//         "scope": "sterbon23411",
//         "table": "crpdetail",
//         "limit": 20,
//         });
//     } catch(err) {
//         console.error(err);
//     }
// }

// export const getDetailsByCropId = (cropId) => {
//     try {
//         return userEosConnection.getTableRows({
//             "json": true,
//             "code": "sterbon23411",
//             "scope": "sterbon23411",
//             "table": "crpdetail",
//             "limit": 1,
//             "lower_bound": cropId,
//         });
//     } catch(err) {
//         console.error(err);
//     }
// }

// export const getTransactionDetails = () => {
//     try {
//         return userEosConnection.getTableRows({
//             "json": true,
//             "code": "sterbon23411",
//             "scope": "sterbon23411",
//             "table": "trxdetail1",
//         });
//     } catch(err) {
//         console.error(err);
//     }
// }