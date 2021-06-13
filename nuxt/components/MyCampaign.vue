<template>
  <v-list-item>
    <!-- Avatar -->
    <v-list-item-avatar>
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>

    <!-- Content -->
    <v-list-item-content>
      <!-- Title -->
      <v-list-item-title>
        <NuxtLink :to="'/campaigns/' + subtitle">
          {{ title }}
        </NuxtLink>
      </v-list-item-title>
      <!-- Subtitle -->
      <v-list-item-subtitle class="text--primary">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    },
    title: { type: String, default: 'Brunch this weekend?' },
    subtitle: {
      type: String,
      default: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    },
  },
}
</script>

<style></style>
