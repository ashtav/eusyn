<template>
  <div class="row">
    <div class="col-lg-5">
      <h1>Eusyn</h1>
      <p>Eusyn is a comprehensive library designed to streamline and accelerate app development with
        Nuxt.
        Leveraging Tabler and HugeIcons for its design system and iconography, this collection provides all the
        essential UI components and utilities needed to build robust and efficient Nuxt applications.</p>

      <a href="https://preview.tabler.io" target="_blank">https://preview.tabler.io</a> <br>
      <a href="https://tabler.io/icons" target="_blank">https://tabler.io/icons</a> <br>
      <a href="https://hugeicons.com/icons?style=Stroke&type=Rounded">https://hugeicons.com/icons?style=Stroke&type=Rounded</a>
      <p class="text-muted mt-5">
        <Icon icon="minus" /> Version. 0.0.1 25.05.30.1-alpha
      </p> <br> <br>

      <Switch />
    </div>
  </div>
</template>

<script lang="ts">
import Switch from '#ui/components/forms/Switch.vue';

export default {
  setup() {
    return {}
  },

  data() {
    return {
      forms: {
        time: '10:15'
      },
    }
  },

  methods: {
    foo() { }
  }
}
</script>

<style lang="scss" scoped>
.custom {
  padding: 25px 35px;
  background-color: #151f2c;
  outline: none;
  border: 1px #2d3d50 solid;
  border-radius: 4px;
}
</style>