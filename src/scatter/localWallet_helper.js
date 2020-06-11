import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { isValidPrivate } from 'eosjs-ecc';
import createHash from 'create-hash';
import {
    parseEOS,
    toEOSString,
    notifySuccess
} from '../utils';
var CryptoJS = require("crypto-js");

// const sha512 = data => createHash('sha512').update(data).digest('hex');
// var salt = CryptoJS.lib.WordArray.random(128 / 8);
var salt = CryptoJS.lib.WordArray.create();

const nodeFetch = require('node-fetch');

var currKey = "";
// 5JdPutdYAYWcjZFsYudKMuLUY8xtnvSBvFg8Cgnbdaxg5rC3h2v

// 5JgcnGa4aRHJMkxkrFPj9BYeJn8xGi41NgtyzTsQBdahL6KkEoX
const network = {
    blockchain: 'eos',
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    host: 'jungle2.cryptolions.io',
    port: 443,
    keyProvider: 'EOS8QfBmtgZbXpJLDDCtNgf7teKT14wXxDkRYV5iZkNx86WNzUjh5',
    protocol: 'https',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true
};

// Necessary??
// export const loginHistoryExists = () => !!localStorage.getItem("lastLoginAt");
// const setLoginHistory = () => localStorage.setItem("lastLoginAt", new Date().getTime());

// Retrieving multi-index data
export async function getCropDetailsTable() {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon12122",
            "scope": "sterbon12122",
            "table": "agrotable5",
            "limit": 100,
        });
        // const result = await rpc.get_account('sterbon12122')
        console.log(result.rows.length);
        return (result);
    } catch (err) {
        console.error(err);
    }
}

export async function getLatestCrop() {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon12122",
            "scope": "sterbon12122",
            "table": "agrotable5",
            "limit": 100,
        });
        // const result = await rpc.get_account('sterbon12122')
        return ((result.rows.length - 1)+'');
    } catch (err) {
        console.error(err);
    }
}

export async function getDetailsByCropId(cropId) {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });

        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon12122",
            "scope": "sterbon12122",
            "table": "agrotable5",
            "limit": 1,
            "lower_bound": cropId,
        });
        return result

    } catch (err) {
        console.error(err);
    }
}

export async function getTransactionDetails() {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon12122",
            "scope": "sterbon12122",
            "table": "trxdetail5",
        });
        return result
    } catch (err) {
        console.error(err);
    }
}

export async function getAccount(account_name) {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
        const result = await rpc.get_account(account_name)
        if (result.account_name)
            return true
        // if (result.account_name && isValidPrivate(pvtKey) === true)
        //     return true

    } catch (e) {
        console.log(e);
        if (e instanceof RpcError)
            // console.log(JSON.stringify(e.json, null, 2));
            return false
    }
}

//Generating private and public keys
// export const generateKeys = () => {
//     ecc.randomKey().then(x => {
//         var private_key = x;
//         var public_key = ecc.privateToPublic(private_key);
//         console.log(private_key, public_key)
//         return (private_key, public_key)
//     })
// }

// Create new account on jungle Testnet
export const createNewAccount = async (account_name, password, public_key, private_key) => {

    var owner_publicKey = public_key
    var active_publicKey = public_key

    const signatureProvider = new JsSignatureProvider(['5JgcnGa4aRHJMkxkrFPj9BYeJn8xGi41NgtyzTsQBdahL6KkEoX']);
    const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    if (getAccount(account_name)) {
        try {
            const result = await api.transact(
                {
                    actions: [
                        {
                            account: 'eosio',
                            name: 'newaccount',
                            authorization: [
                                {
                                    actor: 'guptaanmol12',
                                    permission: 'active',
                                },
                            ],
                            data: {
                                creator: 'guptaanmol12',
                                name: account_name,
                                owner: {
                                    threshold: 1,
                                    keys: [
                                        {
                                            key: owner_publicKey,
                                            weight: 1,
                                        },
                                    ],
                                    accounts: [],
                                    waits: [],
                                },
                                active: {
                                    threshold: 1,
                                    keys: [
                                        {
                                            key: active_publicKey,
                                            weight: 1,
                                        },
                                    ],
                                    accounts: [],
                                    waits: [],
                                },
                            },
                        },
                        {
                            account: 'eosio',
                            name: 'buyrambytes',
                            authorization: [
                                {
                                    actor: 'guptaanmol12',
                                    permission: 'active',
                                },
                            ],
                            data: {
                                payer: 'guptaanmol12',
                                receiver: account_name,
                                bytes: 8192,
                            },
                        },
                        {
                            account: 'eosio',
                            name: 'delegatebw',
                            authorization: [
                                {
                                    actor: 'guptaanmol12',
                                    permission: 'active',
                                },
                            ],
                            data: {
                                from: 'guptaanmol12',
                                receiver: account_name,
                                stake_net_quantity: '1.0000 EOS',
                                stake_cpu_quantity: '1.0000 EOS',
                                transfer: false,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );
            console.log('transaction_id is : ', result.transaction_id);
            
            storeKeys(private_key, account_name, password)
            
            return result.transaction_id;
        } catch (err) {
            console.log('error is : ___', err);
        }
    }

    else
        return ('Account cannot be created')

};

// Storing pvt keys to local storage 
export const storeKeys = (pvtKey, username, password) => {

    if (isValidPrivate(pvtKey) === true) {
        var currPvt = CryptoJS.AES.encrypt(pvtKey, password).toString();
        var passwordKey512Bits = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32
        });
        console.log("PBKDF2", passwordKey512Bits.toString(CryptoJS.enc.Hex));
        var cred = [passwordKey512Bits.toString(CryptoJS.enc.Hex), currPvt];
        localStorage.setItem(username, JSON.stringify(cred))
        console.log(localStorage)
    }
    else {
        console.error("WRONG PVT KEY FORMAT")
    }
}



//Logging in to the site
export const login = (username, password) => {
    console.log("salt", salt);
    //Retrieving the credentials from localstorage
    var storedCred = JSON.parse(localStorage.getItem(username));
    let passHash = storedCred[0];
    let pvtHash = storedCred[1];
    var authPasswordKey = CryptoJS.PBKDF2(password, salt, {
        keySize: 512 / 32,
        // iterations: 10000
    });

    console.log("passHash = ", passHash);
    console.log("authPWKEY = ", authPasswordKey.toString(CryptoJS.enc.Hex));

    // Checking validity of the decrypted text with the original
    if (authPasswordKey.toString(CryptoJS.enc.Hex) === passHash) {
        var bytes = CryptoJS.AES.decrypt(pvtHash, password);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        currKey = originalText;
        sessionStorage.setItem("current_user", username);
        console.log(sessionStorage.getItem("current_user"))
    }
    else
        console.error("Bad Password")
}






//LOGOUT!!
export const logout = () => {
    if (sessionStorage.getItem("current_user") != null || sessionStorage.getItem("current_user") !== undefined) {
        sessionStorage.setItem("current_user", null);
        currKey = "";
    }
    console.log("Logged Out Successfully", sessionStorage.getItem("current_user"));
    console.log("Logged Out Successfully", currKey);
}

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


// Signing transactions
export async function uploadCrop(data) {
    // const defaultPrivateKey = login(password)
    console.log("Default Private Key:", currKey)
    const userName = sessionStorage.getItem("current_user")
    console.log(userName)
    // const defaultPrivateKey = localStorage.getItem("privateKey")
    const signatureProvider = new JsSignatureProvider([currKey]);
    const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const result = await api.transact({

        "actions": [
            {
                "account": "sterbon12122",
                "name": "uploadcrop",
                "authorization": [
                    {
                        "actor": userName,
                        "permission": "active"
                    }
                ],
                "data": {
                    "producer": userName,
                    "cropName": data.pname,
                    "cropAmount": data.camount,
                    "home": data.homelocation,
                    "imageHash": "QmImageHash",
                    "price": data.price,
                    "dateOfHarvest": data.harvest,
                    "dateOfSow": data.sow,
                    "fertilizers": data.fertilizer,
                    "uploadDate": data.uploadDate,
                },
            }]
    },
        {
            "blocksBehind": 3,
            "expireSeconds": 30,
        }).then(notifySuccess('Uploading'));
    console.log("Uploading Result: ", result)
    return result
}

export async function buyCrop(productId) {
    const userName = sessionStorage.getItem("current_user")
    const signatureProvider = new JsSignatureProvider([currKey]);
    const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    const result = await api.transact({
        "actions": [
            {
                "account": "sterbon12122",
                "name": "buycrop",
                "authorization": [
                    {
                        "actor": userName,
                        "permission": "active"
                    }
                ],
                "data": {
                    "buyer": userName,
                    "cropPid": productId,
                    "price": "1.0000 JUNGLE",
                    "memo": "Buy crop"
                },
            }]
    },
        {
            "blocksBehind": 3,
            "expireSeconds": 30,
        })
    console.log("Buying Result: ", result)
    return result
}


export async function updateTrackingDetails(cropPid, locData){
    const userName = sessionStorage.getItem("current_user")
    const signatureProvider = new JsSignatureProvider([currKey]);
    const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    
    console.log("Local wallet helper location - ",locData);
    
    const result = await api.transact({
        "actions": [
            {
                "account": "sterbon12122",
                "name": "updateloc",
                "authorization": [
                    {
                        "actor": userName,
                        "permission": "active"
                    }
                ],
                "data": {
                    "buyer": userName,
                    "cropPid": cropPid,
                    "updatedLoc": locData.currLocation,
                    "updatedDate": locData.currDate,
                },
            }]
    },
        {
            "blocksBehind": 3,
            "expireSeconds": 30,
        })
    console.log("Location update Result: ", result)
    return result
}
