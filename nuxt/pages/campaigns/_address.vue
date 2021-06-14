<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> {{ address }}</v-card-title>
          <p>
            {{ error }}
          </p>
          <P>{{ factoryAddress }}</P>
          <P>{{ summary }}</P>
          <v-card-actions>
            <v-btn color="info" @click="getSummary">Get Summary</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-for="item in items" :key="item.meta">
        <MySimpleCard
          :header="item.header"
          :meta="item.meta"
          :description="item.description"
        >
        </MySimpleCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      error: '',
      address: this.$route.params.address,
      summary: '',
      items: [],
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
      getOwnAddress: 'eth/getOwnAddress',
      setDeployedCampaignContract: 'campaign/setDeployedCampaignContract',
      setSummary: 'campaign/setSummary',
    }),
    ...mapActions({}),
    // methods
    async getSummary() {
      const cc = await this.$ethereumService.getCampaignContract(
        this.address // route address
      )
      const summary = await cc.methods.getSummary().call()
      this.setItems(summary)
      this.setSummary(this.items)
      console.log(this.summary)
    },

    summaryDAO(summary) {
      return {
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
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
        {
          header: dao.minimumContribution,
          meta: 'Minimum Contribution (wei)',
          description:
            'You must contribute at least this much wei to become an approver',
        },
        {
          header: dao.requestsCount,
          meta: 'Number of Requests',
          description:
            'A request tries to withdraw money from the contract. Requests must be approved by approvers',
        },
        {
          header: dao.approversCount,
          meta: 'Number of Approvers',
          description:
            'Number of people who have already donated to this campaign',
        },
        {
          header: this.$ethereumService.utils.fromWei(dao.balance, 'ether'),
          meta: 'Campaign Balance (ether)',
          description:
            'The balance is how much money this campaign has left to spend.',
        },
      ]
      this.items = items
      return items
    },
  },
}
</script>

<style></style>
