export const state = () => ({
  address: '0x082adF44cE9a0DE332938c84228D14Ae0e1dd5aA',
  contract: null, // lottery contract
  manager: null,
})

export const getters = {
  address(state) {
    return state.address
  },
  contract(state) {
    return state.contract
  },
  manager(state) {
    return state.manager
  },
}

export const mutations = {
  setAddress(state, address) {
    state.address = address
  },
  setContract(state, contract) {
    state.contract = contract
  },
  deployContract(state) {
    state.contract = this.$ethereumService.getLotteryContract(state.address)
  },
  setManager(state, manager) {
    state.manager = manager
  },
}

export const actions = {
  nuxtServerInit() {},
  async nuxtClientInit({ commit }, _context) {
    if (
      this.$ethereumService.hasWallet &&
      (await this.$ethereumService.walletUnlocked())
    ) {
      const contract = this.$ethereumService.getLotteryContract(state.address)
      console.log('set new contract: ')
      console.log(contract)
      commit('setContract', contract)
    }
  },
}
