export default defineNuxtConfig({
  app: {
    head: {
      title: 'NTX - Playgorund',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      ],
    },
  },

  modules: [
    '../src/module'
  ],

  compatibilityDate: '2025-05-07',

  components: {
    global: true,
    dirs: [
      '~/components'
    ]
  },

  ui: {
    icon: 'huge'
  }
})