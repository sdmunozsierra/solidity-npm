<script>
// Sample of a mapstate mapgetters, mutations and actions
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      error: '',
    }
  },

  computed: {
    ...mapState({
      campaignContract: (state) => state.campaign.campaignContract,
    }),
  },

  methods: {
    ...mapGetters({
      summary: 'campaign/summary',
    }),
    ...mapMutations({
      setDeployedContract: 'campaign/setDeployedContract',
    }),
    ...mapActions({
      getOwnAddress: 'eth/getOwnAddress',
    }),

    async getSummary() {
      const summary = await this.campaignContract.methods.getSummary().call()
      return summary
    },
  },
}
</script>
