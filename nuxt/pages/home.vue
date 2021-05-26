<template>
  <section>
    <h1>hi there</h1>
    <h1>User has wallet?</h1>
    <h1>{{ hasWallet() }}</h1>
    <h1>{{ ownAddress }}</h1>
    <h1>{{ networkId }}</h1>
    <v-btn @click="enableWallet">Enable Account</v-btn>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      account: '',
    }
  },
  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
      networkId: (state) => state.eth.networkId,
    }),
  },

  methods: {
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
