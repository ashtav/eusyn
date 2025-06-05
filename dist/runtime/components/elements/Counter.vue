<template>
    <slot :counter="counter">{{ counter }}</slot>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  setup(props) {
    const { value, duration } = props;
    const counter = ref(0);
    const interval = ref(null);
    const increment = () => {
      if (interval.value)
        clearInterval(interval.value);
      const step = value / (duration / 100);
      let current = 0;
      interval.value = setInterval(() => {
        current += step;
        if (current >= value) {
          current = value;
          clearInterval(interval.value);
        }
        counter.value = Math.floor(current);
      }, 100);
    };
    onMounted(() => {
      increment();
    });
    watch(() => props.value, (newValue) => {
      increment();
    });
    watch(() => props.duration, (newDuration) => {
      increment();
    });
    return { counter, increment };
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1e3
      // duration in milliseconds
    }
  }
};
</script>

<style lang="scss" scoped></style>