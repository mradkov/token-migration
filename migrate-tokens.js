import Ae, { Universal } from '@aeternity/aepp-sdk/es/ae/universal'
import Node from '@aeternity/aepp-sdk/es/node'
import * as HDWallet from '@aeternity/aepp-sdk/es/utils/hd-wallet'
import * as Crypto from '@aeternity/aepp-sdk/es/utils/crypto'

export const TOKEN_REGISTRY_CONTRACT = 
`contract Token =
  record meta_info =
    { name : string
    , symbol : string
    , decimals : int }
    
  entrypoint meta_info : () => meta_info
  entrypoint total_supply : () => int
  entrypoint owner : () => address
  entrypoint balances : () => map(address, int)
  entrypoint balance : (address) => option(int)
  entrypoint transfer : (address, int) => ()
contract TokenRegistry =
  record state = { tokens: map(Token, Token.meta_info) }
  stateful entrypoint init() = { tokens = {} }
  stateful entrypoint add_token(token : Token) : () =
    put(state{ tokens[token] = token.meta_info() })
  entrypoint get_all_tokens() : map(Token, Token.meta_info) = state.tokens
  entrypoint get_token_meta_info(token : Token) : Token.meta_info = token.meta_info()
  entrypoint get_token_balances(token : Token) : map(address, int) = token.balances()
  entrypoint get_token_balance(token : Token, account: address) : option(int) = token.balance(account)
  entrypoint get_token_owner(token : Token) : address = token.owner()
  entrypoint get_token_total_supply(token : Token) : int = token.total_supply()`

const ga = async () => {

const keypair = { publicKey: 'ak_2RUVa9bvHUD8wYSrvixRjy9LonA9L29wRvwDfQ4y37ysMKjgdQ',
secretKey:
 '5277f449a5319b744710fc48af8edb5ed6e73218d35647eb7d4d6162ddc88225bb446fc1b78a37c69ffc1e2a61b2a9a10182d3673af2eb1490b3580c46897480' }

const client = await Universal({
    url: 'https://sdk-testnet.aepps.com',
    internalUrl: 'https://sdk-testnet.aepps.com',
    compilerUrl: 'https://compiler.aepps.com',
    keypair: keypair
})

console.log(client);

const contractInstance = await client.getContractInstance(TOKEN_REGISTRY_CONTRACT, { contractAddress: 'ct_UAzV9RcXEMsFcUCmrPN4iphbZroM7EHk3wvdidDYgZGGBo3hV', backend: 'aevm'})
console.log(contractInstance)

let result = await contractInstance.methods.get_all_tokens({ backend: 'aevm' });
console.log(result)

}

ga();