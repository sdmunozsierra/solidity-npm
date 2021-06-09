<template>
  <section>
    <h1>Metamask statuses</h1>
    <h1>Has wallet: {{ hasWallet() }}</h1>
    <h1>Has ownaddress: {{ ownAddress }}</h1>
    <h1>Has networkid: {{ networkId }}</h1>

    <h1>Enable metamask wallet {{ account }}</h1>
    <v-btn @click="handleAccountBtnClick">Enable Account</v-btn>

    <h1>Get manager from contract: {{ manager }}</h1>
    <v-btn @click="getManager">Get Manager</v-btn>

    <h1>Contract: {{ contract }}</h1>
    <v-btn @click="deployContract">Deploy Contract</v-btn>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return { account: '' }
  },
  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
      networkId: (state) => state.eth.networkId,
      contract: (state) => state.lottery.contract,
      manager: (state) => state.lottery.manager,
    }),
  },
  methods: {
    ...mapMutations({
      deployContract: 'lottery/deployContract',
      setManager: 'lottery/setManager',
    }),

    async getManager() {
      const manager = await this.contract.methods.manager().call()
      this.setManager(manager)
      return manager
    },

    async beforeMount() {
      await this.loadAccount()
    },
    hasWallet() {
      return this.$ethereumService.hasWallet
    },
    isMainnet() {
      return this.networkId === 1
    },
    isRinkeby() {
      return this.networkId === 4
    },
    isUnsupportedNet() {
      return !(this.isMainnet || this.isRinkeby)
    },
    handleAccountBtnClick() {
      if (this.account.length) {
        window.alert('send to profile')
      }
      return this.enableWallet()
    },
    sendToMetamask() {
      return window.open('https://metamask.io/')
    },
    async loadAccount() {
      this.account = await this.$ethereumService.getCurrentAccountAsync()
    },
    async enableWallet() {
      await this.$ethereumService.unlockWallet()
      this.loadAccount()
    },
  },
}
</script>

<style lang="scss" scoped></style>
