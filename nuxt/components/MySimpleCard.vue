<template>
  <v-card class="mx-auto">
    <v-card-text>
      <p class="text-h4 text--primary">{{ header }}</p>
      <p>{{ meta }}</p>
      <div class="text--primary">
        {{ description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    header: { type: String, default: 'header' },
    meta: { type: String, default: 'meta' },
    description: { type: String, default: 'description' },
  },
  data: () => ({}),
  methods: {},
}
</script>

<style></style>
