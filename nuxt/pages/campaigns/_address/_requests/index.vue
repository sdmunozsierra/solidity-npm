<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <h1>Requests</h1>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title> Requests</v-card-title>
          <v-card-text>
            <p>factory address: {{ factoryAddress }}</p>
            <p>campaign address: {{ address }}</p>
            <p>error log: {{ error }}</p>
            <p>message log: {{ transactionMessage }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" @click="getRequests">Get Requests</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="6">
        <MyRequestForm
          title="Create a new Request"
          :description.sync="description"
          :amount.sync="amount"
          :recipient-address.sync="recipientAddress"
          currency="wei"
          :minimum-contribution="summary.minimumContribution"
          button-text="Create Request"
          :button-callback="createRequest"
          :loading="loading"
          :success-message="transactionMessage"
          :error-message="error"
        />
      </v-col>

      <v v-for="item in items" :key="item.meta">
        <MySimpleCard
          :header="item.header"
          :meta="item.meta"
          :description="item.description"
        >
        </MySimpleCard>
      </v>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      address: this.$route.params.address,
      items: [],
      loading: false,
      summary: '', // deprecate
      // Request form Child
      description: '',
      amount: 0,
      recipientAddress: '',
      // Notification Strings
      error: '',
      transactionMessage: '',
    }
  },

  computed: {
    ...mapState({
      ownAddress: (state) => state.eth.ownAddress,
      factoryAddress: (state) => state.campaign.address,
      campaignContract: (state) => state.campaign.campaignContract,
    }),
  },

  methods: {
    ...mapMutations({
      setDeployedCampaignContract: 'campaign/setDeployedCampaignContract',
      setSummary: 'campaign/setSummary',
    }),
    ...mapActions({
      getOwnAddress: 'eth/getOwnAddress',
    }),

    // methods
    async getRequests() {
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      // Get total number of requests
      const requestCount = await cc.methods.getRequestsCount().call()
      console.log(requestCount)
      // Here we ask for each individual element
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return cc.methods.requests(index).call()
          })
      )
      console.log(requests)
      return requests
    },

    // Create Request
    async createRequest() {
      this.loading = true
      // Get contract // TODO use store
      this.getOwnAddress()
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      try {
        const r = await cc.methods
          .createRequest(this.description, this.amount, this.recipientAddress)
          .send({
            from: this.ownAddress,
          })
        console.info(r)
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },

    // Contribute
    async contribute() {
      // Get contract // TODO use store
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      // Contribute
      try {
        this.loading = true
        this.getOwnAddress()
        const contribution = await cc.methods.contribute().send({
          from: this.ownAddress,
          value: this.amount,
        })
        console.info(contribution)
        this.transactionMessage = 'Contribution success!'
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },

    summaryDAO(summary) {
      return {
        manager: summary[4],
      }
    },

    setItems(summary) {
      const dao = this.summaryDAO(summary)
      const items = [
        {
          header: dao.manager,
          meta: 'Address of Manager',
          description:
            'The manager created this campaign and can create requests to withdraw money',
        },
      ]
      this.items = items
      return items
    },
  },
}
</script>

<style></style>
