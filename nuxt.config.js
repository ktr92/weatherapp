export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'weather-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    theme: {}
  },

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {},

  build: {
  }
}
