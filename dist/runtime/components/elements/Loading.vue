<template>
    <div class="_loading">
        <template v-if="$slots.default">
            <slot v-if="show"></slot>
        </template>

        <Spinner v-else-if="type === 'spinner' && show" />
    </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "loading",
  setup() {
    const show = ref(false);
    const setLoading = (value) => {
      show.value = value;
    };
    return { setLoading, show };
  },
  props: {
    type: {
      type: String,
      default: "spinner"
    }
  }
};
</script>

<style lang="scss" scoped></style>