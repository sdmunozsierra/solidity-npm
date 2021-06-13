<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Ethereum Kickstarter Campaigns</h1>
      </v-col>
      <MyContracts
        title="Deployed Campaigns"
        :address="campaigns"
      ></MyContracts>

      <!-- New Campaign -->
      <v-col class="pa-0 ma-0">
        <MyNewCampaign
          title="Create a new Campaign"
          label="Contribution Ammount"
          currecy="wei"
          :minimum-contribution="100"
          button-text="Create"
          :button-callback="createCampaign"
          :loading="loading"
          :amount.sync="amount"
        />
        <div v-if="error">
          <v-alert
            dismissible
            border="right"
            colored-border
            type="error"
            elevation="2"
          >
            {{ error.message }}
          </v-alert>
        </div>
      </v-col>

      <v-col>
        <!-- Deployed Campaigns -->
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
      <v-col>
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
      loading: false,
      message: '',
      error: '',
      amount: 0,
    }
  },

  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
      contract: (state) => state.campaign.contract,
      campaigns: (state) => state.campaign.campaigns,
    }),
  },

  methods: {
    ...mapMutations({
      setDeployedContract: 'campaign/setDeployedContract',
    }),
    ...mapActions({
      getOwnAddress: 'eth/getOwnAddress',
      setDeployedCampaigns: 'campaign/setDeployedCampaigns',
    }),

    async createCampaign() {
      this.loading = true
      this.message = 'Creating a new campaign takes about 30 secs. Be patient.'
      try {
        this.getOwnAddress()
        console.info(this.amount)
        console.info(this.ownAddress)
        // Creating campaign
        await this.contract.methods
          .createCampaign(this.amount)
          .send({ from: this.ownAddress, gas: 10000000 })
        this.loading = false
      } catch (err) {
        this.error = err
        this.loading = false
        return
      }
      this.message = 'Campaign created'
      console.info('new campaign created')
      this.setDeployedCampaigns()
      console.log(this.campaigns)
    },
  },
}
</script>
