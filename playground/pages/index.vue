<template>
  <div class="row">
    <div class="col-lg-6 col-xl-5">
      <h1>Eusyn</h1>
      <p>Eusyn is a comprehensive library designed to streamline and accelerate app development with
        Nuxt.
        Leveraging Tabler and HugeIcons for its design system and iconography, this collection provides all the
        essential UI components and utilities needed to build robust and efficient Nuxt applications.</p>

      <p class="my-5">
        Created by: <a href="https://github.com/ashtav" target="_blank">@ashtav</a>
      </p>

      <p>Credit:</p>
      <a href="https://preview.tabler.io" target="_blank">https://preview.tabler.io</a> <br>
      <a href="https://tabler.io/icons" target="_blank">https://tabler.io/icons</a> <br>
      <a
        href="https://hugeicons.com/icons?style=Stroke&type=Rounded">https://hugeicons.com/icons?style=Stroke&type=Rounded</a>
      <p class="text-secondary mt-5">
        <Icon icon="minus" /> Version. 0.0.24 25.08.14.1-alpha
      </p> <br> <br>
      <hr>

    </div>
  </div>
</template>

<script lang="ts">

export default {
  setup() {
    return {}
  },

  data() {
    return {
      dates: ['2025-07-01', '2025-07-31'],
      date: '1994-12-10'
    }
  },

  methods: {
    onClick(e: any) {
      console.log('Action clicked:', e);
    }
  },
}
</script>

<style lang="scss" scoped></style>