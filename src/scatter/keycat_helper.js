import { Keycat } from 'keycatjs'

const nodes = [
    "https://jungleapi.eossweden.se:443",
      "https://jungle.eosn.io:443",
      "https://eos-jungle.eosblocksmith.io:443",
      "https://jungle.eosphere.io:443"
]

const eosJunglenetKeycat = new Keycat({
    blockchain: {
        name: 'eos-jungle',
        nodes,
    }
})

export async function loginKeycat() {
    try {
      const { accountName, permission, publicKey } = await eosJunglenetKeycat.signin()
    } catch (err) {
        console.log("Sign-in Error: ", err)
    }
}