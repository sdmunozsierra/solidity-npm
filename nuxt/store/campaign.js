export const state = () => ({
  address: '0x894624C94bf58e82038BdF38d22b0eF6cfd632Db',
  contract: null,
  campaigns: [],
})

export const getters = {
  address(state) {
    return state.address
  },
  contract(state) {
    return state.contract
  },
  campaigns(state) {
    return state.campaigns
  },
}

export const mutations = {
  setContract(state, contract) {
    state.contract = contract
  },
  setCampaigns(state, campaigns) {
    state.campaigns = campaigns
  },
  setDeployedContract(state) {
    state.contract = this.$ethereumService.getFactoryContract(state.address)
  },
}

export const actions = {
  async setDeployedCampaigns({ commit, state }, _context) {
    const campaigns = await state.contract.methods.getDeployedCampaigns().call()
    commit('setCampaigns', campaigns)
  },

  async createCampaign({ commit, state }, from, amount) {
    const campaign = await state.contract.methods
      .createCampaign(amount)
      .send({ from })
    console.log(campaign)
  },

  nuxtServerInit() {},
  async nuxtClientInit({ commit }, _context) {
    if (
      this.$ethereumService.hasWallet &&
      (await this.$ethereumService.walletUnlocked())
    ) {
      const contract = this.$ethereumService.getFactoryContract(state.address)
      console.log('set new contract: ')
      console.log(contract)
      commit('setContract', contract)
    }
  },
}
