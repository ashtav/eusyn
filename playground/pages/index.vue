<template>
  <div class="row">
    <div class="col-lg-5">
      <h1>Nuxt Tabler Extension!</h1>
      <p>Nuxt Tabler Extension is a comprehensive library designed to streamline and accelerate app development with
        Nuxt.
        Leveraging Tabler for its design and components, and Tabler Icons for its iconography, this collection
        provides all the essential UI elements and utilities needed to build robust Nuxt applications efficiently.</p>

      <p class="text-muted">
        <Ti icon="minus" /> Version. 1.0.0 24.08.19.1-alpha
      </p>

      <Input hint="Test" class="x" />

      <PlainInput hint="Type your name" class="custom" formatters="numeric" />
      
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