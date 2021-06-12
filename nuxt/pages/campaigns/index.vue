<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card min-height="150" class="mx-auto">
          <v-card-text>
            <p class="text-h4">Ethereum Campaign</p>
            <div v-if="contract != null">
              <p>Found Contract!</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Deployed Campaigns -->
      <v-col cols="6">
        <v-card min-height="150" class="mx-auto">
          <v-card-text>
            <p class="text-h4">Deployed Campaigns</p>
            <p>{{ campaigns }}</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="teal" @click="setDeployedCampaigns"
              >Get Campaigns</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- New Campaign -->
      <MyNewCampaign
        :amount.sync="amount"
        :button-callback="createCampaign"
      ></MyNewCampaign>

      <MyContracts
        title="Deployed Campaigns"
        :address="campaigns"
      ></MyContracts>

      <v-col cols="6">
        <v-card min-height="150" class="mx-auto">
          <v-card-text>
            <p class="text-h4">Deploy Factory Contract</p>
            <p>{{ contract }}</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="teal" @click="setDeployedContract"
              >Deploy Contract</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      message: '',
      amount: 0,
    }
  },

  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
      address: (state) => state.campaign.address,
      contract: (state) => state.campaign.contract,
      campaigns: (state) => state.campaign.campaigns,
    }),
  },

  methods: {
    ...mapMutations({
      setDeployedContract: 'campaign/setDeployedContract',
    }),
    ...mapActions({
      setDeployedCampaigns: 'campaign/setDeployedCampaigns',
      createCampaign: 'campaign/createCampaign',
    }),

    async createCampaign() {
      console.info(this.amount)
      const newCampaign = await this.contract.methods
        .createCampaign(this.amount)
        .send({
          to: this.address,
          from: this.ownAddress,
        })
      this.state.campaigns.push(0, newCampaign)
      this.store.commit('setCampaigns', this.state.campaigns)
    },

    async createNewCampaign() {
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
