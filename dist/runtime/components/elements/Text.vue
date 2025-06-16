<template>
    <div class="d-inline">
        <Icon v-if="icon" :icon="`${icon} fix me-2`" />
        <span :class="{ 'strong': strong }">{{ value }}</span>
    </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ""
    },
    strong: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped></style>