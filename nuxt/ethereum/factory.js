import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x894624C94bf58e82038BdF38d22b0eF6cfd632Db'
)

export default instance
