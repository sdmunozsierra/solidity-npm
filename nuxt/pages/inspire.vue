<template>
  <v-row>
    <v-col class="text-center">
      <v-card>
        <h1>Ethereum Lottery</h1>
        <v-card min-height="20px">
          <span>Manager: {{ manager }}</span>
        </v-card>
        <v-card min-height="20px">
          <span>Total Balance: {{ balance }}</span>
        </v-card>
        <!-- <v-card min-height="20px">
          <span
            >Total Balance In Eth:
            {{ this.$ethereumService.utils.fromWei(balance, 'ether') }}</span
          >
        </v-card> -->
        <v-card min-height="100px">
          <span>Players: </span>
          <span>{{ players }}</span>
        </v-card>

        <!-- Input user form -->
        <form>
          <h4>Try your luck:</h4>
          <div>
            <label>Amount of ether to enter</label>
          </div>
          <input />
        </form>
      </v-card>

      <v-card>
        <h4>Refresh Data</h4>
        <v-btn @click="getPlayers">Refresh Players</v-btn>
        <v-btn @click="getBalance">Refresh Balance</v-btn>
      </v-card>
    </v-col>
  </v-row>
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
      players: (state) => state.lottery.players,
      balance: (state) => state.lottery.balance,
    }),
  },
  methods: {
    ...mapMutations({
      setPlayers: 'lottery/setPlayers',
      setBalance: 'lottery/setBalance',
    }),

    async getPlayers() {
      const players = await this.contract.methods.getPlayers().call()
      // this.$store.commit('lottery/setPlayers', players)
      this.setPlayers(players)
      // this.players = players
    },
    async getBalance() {
      const balance = await this.$ethereumService.eth.getBalance(
        this.contract.options.address
      )
      this.setBalance(balance)
      // this.$store.commit('lottery/setBalance', balance)
      // this.balance = balance
    },
  },
}
</script>
