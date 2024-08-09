export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '../src/module'
  ],

  components: {
    global: true,
    dirs: [
      '~/components',
    ]
  },

  ui: {
    toast: true,
    confirm: true,
    // plugins: ['toast', 'confirm', 'cropper']
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.SERVER,
    }
  },

  compatibilityDate: '2024-08-09',
})