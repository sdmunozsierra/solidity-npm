const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000',
  })
  ;[campaignAddress] = await factory.methods.getDeployedCampaigns().call()
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  )
})

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('marks caller as the campaign manager', async () => {
    // manager is automatically created for us
    const manager = await campaign.methods.manager().call()
    // Compare with accounts[0]
    assert.equal(accounts[0], manager)
  })

  // Donate some money to the campaign and see if the account is marked as approved
  it('allows people to comtribute money and marks them as aprovers', async () => {
    await campaign.methods.contribute().send({
      value: 101,
      from: accounts[1],
    })
    // We need to access the mapping, or rather one single value in the mapping
    // There is no single value approvers!
    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  // Verify that a minimum value
  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: 99,
        from: accounts[1],
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      })
    const request = await campaign.methods.requests(0).call()

    assert.equal('Buy batteries', request.description)
  })

  // End to end test
  it('processes requests', async () => {
    // Contribute to campaign
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    })

    // Send money to the request
    await campaign.methods
      .createRequest('description', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      })

    // Vote
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    })

    // Finalize
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    })

    // Retreive the balance
    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)

    // What happens to ganache between each test?
    // The ganache money does not get resseted between tests
    assert(balance > 104)
  })
})
