import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - Ethereum Lottery Nuxt',
    title: 'Ethereum Lottery Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Ethereum Lottery Solidity Nuxt App',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [{ src: '@/plugins/ethereum' }],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', 'vue-scrollto/nuxt', 'cookie-universal-nuxt'],

  axios: {
    common: {
      'Content-Type': 'application/json',
    },
  },

  i18n: {
    locales: ['en', 'es', 'ja'],
    defaultLocale: 'en',
    vueI18nLoader: true,
    parsePages: false,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
