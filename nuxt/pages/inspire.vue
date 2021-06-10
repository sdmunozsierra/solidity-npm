<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card min-height="150" class="mx-auto">
          <v-card-text>
            <p class="text-h4">Ethereum Lottery</p>
            <div v-if="balance === 0">Total Prize: 0 Ethereum</div>
            <div v-else>
              <p>
                Total Prize:
                {{ this.$ethereumService.utils.fromWei(balance, 'ether') }}
                Ethereum
              </p>
            </div>
            <!-- <div v-if="players.length"> -->
            <div>
              <p>Players: {{ players }}</p>
            </div>

            <div v-if="manager != null">
              <p>Contract Manager: {{ manager }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Input User Button -->
      <v-col cols="6" class="text-center">
        <v-card min-height="215">
          <v-card-text>
            <h2>Try your luck</h2>
            <p>Amount of ether to enter</p>
            <input v-model="localValue" placeholder="Min ammount of 0.1 eth" />
            <p>Amount to be sent: {{ localValue }}</p>
            <v-btn @click="enterLottery">Enter Lottery</v-btn>
            <h2>{{ transactionMessage }}</h2>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Refresh Data Buttons -->
      <v-col cols="6" class="text-center">
        <v-card min-height="215">
          <v-card-text>
            <h3>Refresh Lottery Data</h3>
            <v-btn @click="getPlayers">Refresh Players</v-btn>
            <v-btn @click="getBalance">Refresh Balance</v-btn>
          </v-card-text>
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
      localValue: 0.0,
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
      // eth.getbalance returns an object must convert from Wei
      const balance = await this.$ethereumService.eth.getBalance(
        this.contract.options.address
      )
      // Update store
      this.setBalance(balance)
    },

    async enterLottery() {
      this.setValue(this.localValue)
      this.transactionMessage = 'waiting on transaction success.. '
      await this.contract.methods.enter().send({
        from: this.ownAddress,
        value: this.$ethereumService.utils.toWei(this.value, 'ether'),
      })
      this.transactionMessage = 'You have entered the lottery!'
      this.getPlayers()
      this.getBalance()
    },
  },
}
</script>
