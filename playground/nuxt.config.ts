export default defineNuxtConfig({
  target: "static",
  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true, // Biar semua link di halaman ikut ke-generate
      routes: ["/"], // Pastikan halaman utama digenerate
    }
  },

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

  compatibilityDate: '2025-03-18',

  components: {
    global: true,
    dirs: [
      '~/components'
    ]
  },

})