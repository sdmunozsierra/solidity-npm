<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="numberRules"
            label="Campaign Contribution"
            required
          ></v-text-field>
        </v-col>

        <!-- <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
          ></v-text-field>
        </v-col> -->
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    minimumContribution: { type: Number, default: 0.1 },
  },
  data: () => ({
    currency: 'Ethereum',
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    numberRules: [
      (v) => !!v || 'Contribution is required',
      (v) => !isNaN(v) || 'Contribution must be a number',
      (v) => v > 0.01 || 'Minimum Contribution must be ' + '0.01',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
}
</script>
