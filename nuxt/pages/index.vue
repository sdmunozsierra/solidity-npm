<template>
  <section>
    <v-container>
      <v-row class="text-center" justify="center">
        <v-col cols="12">
          <v-card min-height="150" class="mx-auto">
            <v-card-text>
              <p class="text-h4">Metamask Status</p>
              <div v-if="hasWallet() === true">
                <div v-if="!ownAddress.length">
                  <p>Connect your Metamask Wallet using the steps below.</p>
                </div>
                <div v-else>
                  <h2>networkid: {{ networkId }}</h2>
                  <h2>Address Account: {{ ownAddress }}</h2>
                </div>
              </div>
              <div v-else>
                <p>
                  Please download the Free Metamask Extension to use this
                  service.
                </p>
              </div>
              <div v-if="manager != null">
                <h2>Contract Manager: {{ manager }}</h2>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <MyCard
            title1="1. Enable Metamask Wallet"
            title2="Metamask Wallet Enabled"
            content1="Your account will appear here"
            :content2="[ownAddress]"
            button1="Enable Account"
            :disable-return="true"
            :button-action1="handleAccountBtnClick"
          ></MyCard>
        </v-col>

        <v-col cols="4">
          <v-card min-height="275" class="mx-auto">
            <div v-if="contract == null">
              <v-card-text>
                <p class="text-h4">2. Deploy Contract</p>
                Contract will appear here
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="teal accent-4" @click="deployContract">
                  Deploy Contract</v-btn
                >
              </v-card-actions>
            </div>
            <div v-else>
              <v-card-text>
                <p class="text-h4">Contract Deployed</p>
                <p>{{ contract }}</p>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="teal accent-4" @click="deployContract">
                  Re-Deploy Contract</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>

        <v-col cols="4">
          <MyCard
            title1="3. Get Contract Manager"
            title2="Contract Manager obtained"
            content1="Your contracT Manager will appear here"
            :content2="[manager]"
            button1="Get Manager"
            :disable-return="true"
            :button-action1="getManager"
          ></MyCard>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
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
      setOwnAddress: 'eth/setOwnAddress',
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
      if (this.ownAddress.length > 0) {
        window.alert('Already enabled. Go to lottery')
        // this.sendToLottery() // Do not redirect use nuxt instead
        return
      }
      return this.enableWallet()
    },
    sendToMetamask() {
      return window.open('https://metamask.io/')
    },
    sendToLottery() {
      return window.location.replace('/lottery')
    },
    async loadAccount() {
      const address = await this.$ethereumService.getCurrentAccountAsync()
      this.setOwnAddress(address)
    },
    async enableWallet() {
      await this.$ethereumService.unlockWallet()
      this.loadAccount()
    },
  },
}
</script>

<style lang="scss" scoped></style>
