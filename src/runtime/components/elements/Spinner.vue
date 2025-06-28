<template>
  <div class="d-inline-flex align-items-center">
    <span class="spinner-border" :class="`spinner-border-${size}`" /> <span v-if="label" class="ms-3">{{ label
    }}</span>
  </div>
</template>

<script lang="ts">
export default {

  props: {
    label: {
      type: String,
    },

    size: {
      type: String,
      default: 'sm'
    }
  },
}
</script>

<style lang="scss" scoped>
.spinner-border {
  position: relative;
  bottom: 1px;
}
</style>