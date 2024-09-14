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

      <Input label="Your Name" hint="Type your name" />

      <br>

      <Time label="Select Time" prefix="clock" format="h:i" v-model="forms.time" />

      <br>

      <Input label="Select Time" type="time" hint="00:00:00" prefix="clock"/>

      <code>{{ forms }}</code>
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
        time: ''
      }
    }
  },

  methods: {

    onAction() {

    }
  }
}
</script>

<style lang="scss" scoped></style>