<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto">
            <v-card-text>
              <p class="text-h4">{{ title }}</p>
              <v-text-field
                v-model="amount"
                :rules="numberRules"
                :label="label"
                required
                suffix="wei"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn :disabled="!formIsValid" color="primary" @click="submit">{{
                buttonText
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Form Title' },
    label: { type: String, default: 'Amount' },
    minimumContribution: { type: Number, default: 0.1 },
    buttonText: { type: String, default: 'Button Text' },
    buttonCallback: { type: Function, required: true },
  },
  data: () => ({
    currency: 'Ethereum',
    valid: false,
    amount: '',
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

  computed: {
    formIsValid() {
      return this.valid
    },
  },

  methods: {
    submit() {
      this.$emit('update:amount', this.amount)
      this.buttonCallback()
    },
  },
}
</script>
