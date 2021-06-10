<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="text-center">
        <h1>ETHEREUM LOTTERY</h1>
      </v-col>

      <!-- Stats -->
      <v-col cols="5" class="text-center">
        <v-card min-width="350">
          <h2>LOTTERY STATS</h2>
          <p>Manager: {{ manager }}</p>
          <p>Total Balance: {{ balance }}</p>
          <p>Players:</p>
        </v-card>
      </v-col>

      <!-- Input User Button -->
      <v-col cols="7" class="px-4 text-center">
        <v-card min-width="350">
          <h2>Try your luck</h2>
          <p>Amount of ether to enter</p>
          <input v-model="message" placeholder="Enter amount of ether" />
          <p>Amount selected: {{ message }}</p>
          <v-btn @click="localSetValue(message)">Submit Eth</v-btn>
          <h2>{{ transactionMessage }}</h2>
        </v-card>
      </v-col>

      <v-col cols="5" class="text-center">
        <!-- Refresh Data Buttons -->
        <v-card min-width="350" min-height="100">
          <h3>Refresh Lottery Data</h3>
          <v-btn @click="getPlayers">Refresh Players</v-btn>
          <v-btn @click="getBalance">Refresh Balance</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      message: this.message,
      transactionMessage: '',
    }
  },

  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
      networkId: (state) => state.eth.networkId,
      contract: (state) => state.lottery.contract,
      manager: (state) => state.lottery.manager,
      players: (state) => state.lottery.players,
      balance: (state) => state.lottery.balance,
      value: (state) => state.lottery.value,
    }),
  },

  methods: {
    ...mapMutations({
      setPlayers: 'lottery/setPlayers',
      setBalance: 'lottery/setBalance',
      setValue: 'lottery/setValue',
    }),

    async getPlayers() {
      const players = await this.contract.methods.getPlayers().call()
      // Update store
      this.setPlayers(players)
    },

    async getBalance() {
      // eth.getbalance returns an object must convert to Wei
      const balance = await this.$ethereumService.eth.getBalance(
        this.contract.options.address
      )

      // eth.getbalance returns an object must convert to Wei
      // {{ this.$ethereumService.utils.fromWei(balance, 'ether') }}</span

      // Update store
      this.setBalance(balance)
    },

    async enterLottery() {
      this.transactionMessage = 'waiting on transaction success.. '
      await this.contract.methos.enter().send({
        from: this.ownAddress,
        value: this.$ethereumService.utils.toWei(this.value, 'ether'),
      })
      this.transactionMessage = 'You have entered the lottery!'
    },

    localSetValue(value) {
      this.setValue(value)
      this.value = value
    },
  },
}
</script>
