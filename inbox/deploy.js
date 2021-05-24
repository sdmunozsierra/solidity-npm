const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
require('dotenv').config()

const mnemonic = process.env.MNEMONIC
const rinkeby_infura = process.env.RINKEBY_INFURA

const provider = new HDWalletProvider(mnemonic, rinkeby_infura)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contractract deployed to ', result.options.address)
}

deploy()
