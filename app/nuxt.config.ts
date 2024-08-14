export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-tabler-ui'
  ],

  compatibilityDate: '2024-07-19',

  components: {
    global: true,
    dirs: [
      '~/components',
    ]
  },

  // ui: {
  //   toast: true,
  //   confirm: true,
  //   // plugins: ['toast', 'confirm', 'cropper']
  // },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.SERVER,
    }
  },
})