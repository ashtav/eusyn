<template>
  <div class="d-inline-flex align-items-center">
    <span class="spinner-border" :class="`spinner-border-${size}`" /> <span v-if="label" class="ms-3">{{ label
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    size: {
      type: String,
      default: "sm"
    }
  }
};
</script>

<style scoped>
.spinner-border {
  position: relative;
  bottom: 1px;
}
</style>