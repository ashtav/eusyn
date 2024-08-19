export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],

  compatibilityDate: '2024-07-19',

  components: {
    global: true,
    dirs: [
      '~/components'
    ]
  }
})