const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')
require('dotenv').config()

const mnemonic = process.env.MNEMONIC
const rinkeby_infura = process.env.RINKEBY_INFURA

const provider = new HDWalletProvider(mnemonic, rinkeby_infura)

const web3 = new Web3(provider)

// Deploy only the ContractFactory as that will deploy Campaign contracts
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  // We are not parsing interface, only the compiledFactory.interface
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}
deploy()
