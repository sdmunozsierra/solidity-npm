<template>
  <!-- TODO FIX PREVENT ENTER CLICK https://stackoverflow.com/questions/1563062/prevent-form-submission-with-enter-key/12123196#12123196 -->
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto">
            <v-card-text>
              <!-- Form Title-->

              <p class="text-h4 text--primary">{{ title }}</p>

              <!-- Messages -->
              <!-- Success -->
              <v-row>
                <v-col cols="12" align="center" justify="center">
                  <div v-if="successMessage">
                    <v-alert
                      dismissible
                      border="right"
                      colored-border
                      type="success"
                      elevation="2"
                    >
                      {{ successMessage }}
                    </v-alert>
                  </div>
                </v-col>
                <!-- Error -->
                <v-col>
                  <div v-if="error">
                    <v-alert
                      dismissible
                      border="right"
                      colored-border
                      type="error"
                      elevation="2"
                    >
                      {{ error }}
                    </v-alert>
                  </div>
                </v-col>
              </v-row>

              <!-- Description -->
              <v-text-field
                v-model="description"
                label="Description of the Request"
                required
              ></v-text-field>

              <!-- Form label currency-->
              <v-text-field
                v-model="amount"
                :rules="numberRules"
                :label="label"
                required
                :suffix="currency"
              ></v-text-field>

              <!-- Recipient -->
              <v-text-field
                v-model="recipientAddress"
                label="Address of the Recipient"
                :rules="addressRules"
                required
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <!-- Submit Button -->
                <v-col cols="12" align="center" justify="center">
                  <v-btn
                    :disabled="!formIsValid"
                    color="primary"
                    @click="submit"
                    >{{ buttonText }}</v-btn
                  >
                </v-col>

                <!-- Loading Ticker -->
                <v-col cols="12" align="center" justify="center">
                  <div v-if="valid && loading">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </div>
                </v-col>
              </v-row>
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
    currency: { type: String, default: 'wei' },
    minimumContribution: { type: Number, default: 100 },
    buttonText: { type: String, default: 'Button Text' },
    loading: { type: Boolean, default: false },
    buttonCallback: { type: Function, required: true },
    error: { type: String, default: '' },
    successMessage: { type: String, default: '' },
  },

  data: () => ({
    valid: false,
    description: '',
    amount: 0,
    recipientAddress: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    numberRules: [
      (v) => !!v || 'Number is required',
      (v) => !isNaN(v) || 'Input must be a number',
      (v) => v > 99 || 'Minimum number be 100',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    address: '',
    addressRules: [
      (v) => !!v || 'Address is required',
      (v) => /0x.+/.test(v) || 'Address must start with 0x',
    ],
  }),

  computed: {
    formIsValid() {
      return this.valid && !this.loading
    },
  },

  methods: {
    submit() {
      this.$emit('update:amount', this.amount)
      this.$emit('update:description', this.description)
      this.$emit('update:recipientAddress', this.recipientAddress)
      this.buttonCallback()
    },
  },
}
</script>
