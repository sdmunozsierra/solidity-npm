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
      this.summary = this.summaryDAO(summary)
      this.setSummary(this.summary)
      console.log(this.summary)
    },

    summaryDAO(summary) {
      return {
        minimumBalance: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      }
    },
  },
}
</script>

<style></style>
