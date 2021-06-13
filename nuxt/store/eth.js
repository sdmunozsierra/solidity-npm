export const state = () => ({
  ownAddress: [],
  // ownProfile: {},
  networkId: 1,
})

export const mutations = {
  setOwnAddress(state, address) {
    state.ownAddress = address
  },
  // setOwnProfile(state, profile) {
  //   state.ownProfile = profile
  // },
  setNetworkId(state, networkId) {
    state.networkId = networkId
  },
}

export const actions = {
  async getOwnAddress({ commit }) {
    const address = await this.$ethereumService.getCurrentAccountAsync()
    commit('setOwnAddress', address)
  },

  nuxtServerInit() {},

  async nuxtClientInit({ commit }, _context) {
    if (
      this.$ethereumService.hasWallet &&
      (await this.$ethereumService.walletUnlocked())
    ) {
      const address = await this.$ethereumService.getCurrentAccountAsync()
      const networkId = await this.$ethereumService.getNetworkIdAsync()
      // const ownProfile = await this.$threeBoxService.getUserProfile(address)
      commit('setOwnAddress', address)
      // commit('setOwnProfile', ownProfile)
      commit('setNetworkId', networkId)
    }
  },
}
