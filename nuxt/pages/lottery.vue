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
      <v-col cols="4" class="text-center">
        <v-card min-height="215">
          <v-card-text>
            <p class="text-h4">Try Your Luck</p>
            <p>Amount of ether to enter</p>
            <input v-model="localValue" placeholder="Min ammount of 0.1 eth" />
            <p>Amount to be sent: {{ localValue }}</p>
            <h2>{{ transactionMessage }}</h2>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="enterLottery">Enter Lottery</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Refresh Data Buttons -->
      <v-col cols="4" class="text-center">
        <v-card min-height="215">
          <v-card-text>
            <p class="text-h4">Refresh Lottery Data</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-row>
              <v-col cols="12">
                <v-btn @click="getPlayers">Refresh Players</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn @click="getBalance">Refresh Balance</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Pick Winner -->
      <v-col cols="4" class="text-center">
        <v-card min-height="215">
          <v-card-text>
            <p class="text-h4">Pick A Winner</p>
            <p>{{ pickWinnerMessage }}</p>
            <p>{{ lastWinner }}</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="pickWinner">pickWinner</v-btn>
          </v-card-actions>
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
      pickWinnerMessage: '',
      lastWinner: '',
    }
  },

  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
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
      this.transactionMessage =
        'Entering Lottery... Waiting on transaction success.. '
      await this.contract.methods.enter().send({
        from: this.ownAddress,
        value: this.$ethereumService.utils.toWei(this.value, 'ether'),
      })
      this.transactionMessage = 'You have entered the lottery!'
      this.getPlayers()
      this.getBalance()
    },

    async pickWinner() {
      this.pickWinnerMessage =
        'Picking Winner... Waiting on transaction success.. '
      await this.contract.methods.pickWinner().send({
        from: this.ownAddress,
      })
      // TODO get winner
      // const winner = await this.contract.methods.lastWinner().call()
      // this.lastWinner = winner
      this.pickWinnerMessage = 'You have picked a lottery winner!'
      this.getPlayers()
      this.getBalance()
    },
  },
}
</script>
