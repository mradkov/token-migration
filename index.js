const Web3 = require('web3');
const Crypto = require('@aeternity/aepp-sdk/es/utils/crypto')

var web3 = new Web3();

let eth_private_key = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

let aeternity_account = Crypto.generateKeyPairFromSecret(Buffer.from('db895ee8b41d68792313b75f3289fc8a47dca5b6cdb29ca380c878960766f7aa9c58e49748ae72034e10331d83aa532151130a46b006894e327387b8be105b22', 'hex'));
console.log(aeternity_account);

let signed_message = web3.eth.accounts.sign(aeternity_account.publicKey, eth_private_key)
console.log(signed_message)


// get public key eth

let public_key = web3.eth.accounts.privateKeyToAccount(eth_private_key);
console.log(public_key)
console.log(public_key.address)