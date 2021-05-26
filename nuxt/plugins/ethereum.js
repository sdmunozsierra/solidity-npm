import EthereumService from '~/services/EthereumService'

export default ({ isDev, store }, inject) => {
  let ethereumservice
  if (process.browser && window.ethereum) {
    ethereumservice = new EthereumService(window.ethereum, store, {
      dev: isDev,
    })
    ethereumservice.init()
  } else if (process.browser && window.web3) {
    ethereumservice = new EthereumService(window.web3.currentProvider, store, {
      dev: isDev,
    })
  } else {
    ethereumservice = new EthereumService(null, store, { dev: isDev })
  }
  inject('ethereumService', ethereumservice)
}
