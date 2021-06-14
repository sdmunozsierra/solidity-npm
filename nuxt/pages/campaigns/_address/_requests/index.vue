<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <h1>Requests</h1>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title>Requests page information</v-card-title>
          <v-card-text>
            <p>factory address: {{ factoryAddress }}</p>
            <p>campaign address: {{ address }}</p>
            <p>message log: {{ transactionMessage }}</p>
            <p>error log: {{ error }}</p>
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
          button-text="Create Request"
          :button-callback="createRequest"
          :loading="loading"
          :success-message="transactionMessage"
          :error-message="error"
        />
      </v-col>

      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Id</th>
                <th class="text-left">Description</th>
                <th class="text-left">Amount</th>
                <th class="text-left">Recipient</th>
                <th class="text-left">Approval Count</th>
                <th class="text-left">Approve</th>
                <th class="text-left">Finalize</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in requests" :key="index">
                <td>{{ index }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.recipient }}</td>
                <td>{{ item.approvalCount }} / {{ approvers }}</td>
                <td>
                  <v-btn color="success" @click="onApprove(index)"
                    >Approve</v-btn
                  >
                </td>
                <td>
                  <v-btn color="teal" @click="onFinalize(index)"
                    >Finalize</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
      requests: [],
      // Request form Child
      description: '',
      amount: 0,
      recipientAddress: '',
      // Approvers
      approvers: 0,
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
    }),
    ...mapActions({
      getOwnAddress: 'eth/getOwnAddress',
    }),

    // Get Requests
    async getRequests() {
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      // Get total number of requests
      const requestCount = await cc.methods.getRequestsCount().call()
      const approvers = await cc.methods.approversCount().call()
      console.log(requestCount)
      this.approvers = approvers
      console.log(approvers)
      // Here we ask for each individual element
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return cc.methods.requests(index).call()
          })
      )
      this.requests = requests
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
        this.transactionMessage = 'Request success!'
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },

    // Approve
    async onApprove(index) {
      this.loading = true
      this.getOwnAddress()
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      try {
        const r = await cc.methods.approveRequest(index).send({
          from: this.ownAddress,
        })
        console.info(r)
        this.transactionMessage = 'Aprove success!'
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },

    // Finalize
    async onFinalize(index) {
      this.loading = true
      this.getOwnAddress()
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      try {
        const r = await cc.methods.finalizeRequest(index).send({
          from: this.ownAddress,
        })
        console.info(r)
        this.transactionMessage = 'Finalize success!'
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
