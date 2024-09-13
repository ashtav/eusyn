<template>
  <div class="d-inline-block">
    <span class="spinner-border" :class="`spinner-border-${size}`" /> <span class="ms-2" v-if="label">{{ label }}</span>
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
.spinner-border.fit-button {
  margin-bottom: 2px;
}
</style>