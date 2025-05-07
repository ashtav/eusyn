<template>
  <div class="row">
    <div class="col-lg-5">
      <h1>Nuxt Tabler Extension!</h1>
      <p>Nuxt Tabler Extension is a comprehensive library designed to streamline and accelerate app development with
        Nuxt.
        Leveraging Tabler for its design and components, and Tabler Icons for its iconography, this collection
        provides all the essential UI elements and utilities needed to build robust Nuxt applications efficiently.</p>

      <a href="https://preview.tabler.io" target="_blank">https://preview.tabler.io</a> <br>
      <a href="https://tabler.io/icons" target="_blank">https://tabler.io/icons</a>
      <p class="text-muted mt-5">
        <Icon icon="minus" /> Version. 1.0.0 24.08.19.1-alpha
      </p> <br> <br>
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
      forms: {
        time: '10:15'
      },
    }
  },

  methods: {
    foo(){}
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