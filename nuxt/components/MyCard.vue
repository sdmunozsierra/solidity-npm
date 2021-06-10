<template>
  <v-card min-height="275" class="mx-auto">
    <v-card-text>
      <p class="text-h4 text--accent">{{ title1 }}</p>
      <div class="text--primary">
        {{ content1 }}
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="teal accent-4" @click="handleButton1()">
        {{ button1 }}
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--secondary">{{ title2 }}</p>
          <div class="text--primary">
            {{ content2 }}
          </div>
        </v-card-text>
        <v-card-actions class="pt-0">
          <div v-if="!disableReturn">
            <v-btn text color="teal accent-4" @click="reveal = false">
              {{ button2 }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    title1: { type: String, default: 'title1' },
    content1: { type: String, default: 'content1' },
    button1: { type: String, default: 'reveal' },
    title2: { type: String, default: 'title2' },
    content2: { type: Array, default: null },
    button2: { type: String, default: 'close' },
    disableReturn: { type: Boolean, default: false },
    // eslint-disable-next-line vue/require-default-prop
    buttonAction1: { type: Function, required: false },
  },
  data: () => ({
    reveal: false,
  }),
  methods: {
    handleButton1() {
      this.buttonAction1()
      this.reveal = true
    },
  },
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
