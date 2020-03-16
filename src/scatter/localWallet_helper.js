import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs2/dist/eosjs2-jssig'
const fetch = require('node-fetch');

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
const eos = Eos (network);

//IPFS for generating private and public keys
// https://ipfs.io/ipfs/QmW4XxaEg8cWsYisfjnjqLFi1MbHMYjt7nbCh8ZHwgg9c2

// Create new account on jungle Testnet
export const signup = (name_of_new_account, owner_publicKey, active_publicKey) => {

    return new Promise(async function (resolve, reject) {
        eos.transaction(tr => {
                tr.newaccount({
                    creator: 'sterbon23451',
                    name: name_of_new_account,
                    owner: owner_publicKey,
                    active: active_publicKey,
                });
                tr.buyrambytes({
                    payer: 'sterbon23451',
                    receiver: name_of_new_account,
                    bytes: 3000,
                });
                tr.delegatebw({
                    from: 'sterbon23451',
                    receiver: name_of_new_account,
                    stake_net_quantity: '0.0500 EOS',
                    stake_cpu_quantity: '0.1500 EOS',
                    transfer: 0,
                });
            })
            .then(data => {
                resolve(data.transaction_id);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Storing pvt keys to local storage 
export const storeKeys = (pvtKey, uname) => {

    localStorage.setItem("privateKey", pvtKey)
    localStorage.setItem("username", uname)
    console.log(localStorage.getItem("privateKey"))
}

// Signing transactions
export async function uploadCrop(data) {
    const userName = localStorage.getItem("uname")

    const defaultPrivateKey = localStorage.getItem("privateKey")
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const result = await api.transact({
        "blocksBehind": 3,
        "expireSeconds": 30,
        "actions": [
            {
                "account": "sterbon23451",
                "name": "uploadcrop",
                "data": {
                    "producer": userName,
                    "cropName": data.payload.pname,
                    "cropAmount": data.payload.camount,
                    "imageHash": "QmImageHash",
                    "price": data.payload.price,
                    "dateOfHarvest": data.payload.harvest,
                    "dateOfSow": data.payload.sow,
                    "fertilizers": data.payload.fertilizer
                },
                "authorization": [
                    {
                        "actor": userName,
                        "permission": "active"
                    }
                ]
            }
        ]
    })
    console.log("Result: ", result)
        ();
    // })
}

// Retrieving multi-index data
export const getCropDetailsTable = () => {
    try {
        const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon23451",
            "scope": "sterbon23451",
            "table": "crpdetail",
            "limit": 20,
        });
        console.log(result)

    } catch (err) {
        console.error(err);
    }
}
