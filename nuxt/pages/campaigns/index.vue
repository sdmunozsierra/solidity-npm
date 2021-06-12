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
      <v-col cols="6">
        <v-card min-height="150" class="mx-auto">
          <v-card-text>
            <p class="text-h4">Create New Campaign</p>
            <MyNewCampaign class="px-6"></MyNewCampaign>
          </v-card-text>
          <v-card-actions class="justify-center">
            <!-- <v-btn color="teal" @click="createCampaign">Create Campaign</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>

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
      //       setDeployedCampaigns: 'campaign/setDeployedCampaigns',
    }),
    ...mapActions({
      setDeployedCampaigns: 'campaign/setDeployedCampaigns',
    }),
  },
}
</script>
