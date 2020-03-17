import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import ecc from 'eosjs-ecc'

const ipfsClient = require('ipfs')
const nodeFetch = require('node-fetch');

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
// const eos = Eos(network);


// Retrieving multi-index data
export async function getCropDetailsTable() {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon23451",
            "scope": "sterbon23451",
            "table": "crpdetail",
            "limit": 20,
        });
        // const result = await rpc.get_account('sterbon23451')
        return (result)
    } catch (err) {
        console.error(err);
    }
}

export async function getAccount() {
    try {
        const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
        const result = await rpc.get_table_rows({
            "json": true,
            "code": "sterbon23451",
            "scope": "sterbon23451",
            "table": "crpdetail",
            "limit": 20,
        });
        // const result = await rpc.get_account('sterbon23451')
        return (result)
    } catch (err) {
        console.error(err);
    }
}

//IPFS for generating private and public keys
// https://ipfs.io/ipfs/QmW4XxaEg8cWsYisfjnjqLFi1MbHMYjt7nbCh8ZHwgg9c2
export async function generateKeys() {

    ecc.randomKey().then(x => {
        var private_key = x;
        var public_key = ecc.privateToPublic(private_key);
        console.log(private_key, public_key)
    })
}

// Create new account on jungle Testnet
export const createNewAccount = async (account_name, owner_publicKey, active_publicKey) => {
    account_name = 'hellokittu14';
    owner_publicKey = 'EOS66RWJB8EGP2gNXEUJ4BoFA7n5DNeQdcBrbjpQTWywGYjFFgTXd';
    active_publicKey = 'EOS66RWJB8EGP2gNXEUJ4BoFA7n5DNeQdcBrbjpQTWywGYjFFgTXd';

    const signatureProvider = new JsSignatureProvider(['5JdPutdYAYWcjZFsYudKMuLUY8xtnvSBvFg8Cgnbdaxg5rC3h2v']);
    const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    try {
        const result = await api.transact(
            {
                actions: [
                    {
                        account: 'eosio',
                        name: 'newaccount',
                        authorization: [
                            {
                                actor: 'sterbon23451',
                                permission: 'active',
                            },
                        ],
                        data: {
                            creator: 'sterbon23451',
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
                                actor: 'sterbon23451',
                                permission: 'active',
                            },
                        ],
                        data: {
                            payer: 'sterbon23451',
                            receiver: account_name,
                            bytes: 8192,
                        },
                    },
                    {
                        account: 'eosio',
                        name: 'delegatebw',
                        authorization: [
                            {
                                actor: 'sterbon23451',
                                permission: 'active',
                            },
                        ],
                        data: {
                            from: 'sterbon23451',
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
        return result.transaction_id;
    } catch (err) {
        console.log('error is : ___', err);
    }
};

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
    const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { nodeFetch });
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
}
