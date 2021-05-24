const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require('../compile')

let accounts
let inbox

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['initialMessage'] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'initialMessage')
  })

  it('can change a message', async () => {
    // send change
    await inbox.methods.setMessage('newMessage').send({ from: accounts[0] })
    // get change
    const message = await inbox.methods.message().call()
    assert.equal(message, 'newMessage')
  })

  it('has a values', async () => {
    console.log(accounts)
    console.log(inbox)
  })
})
