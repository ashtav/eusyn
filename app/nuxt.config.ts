// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  app: {
    head: {
      title: 'Moneytory',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-tabler-ui'
  ],

  components: {
    global: true,
    dirs: [
      '~/components'
    ]
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.SERVER
    }
  }
})
