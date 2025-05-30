<template>
    <div :style="rowStyle">
        <div v-for="(child, index) in slots" :key="index" :style="childStyle">
            <component :is="child" />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, useSlots } from "vue";
export default defineComponent({
  props: {
    gap: {
      type: [Number, String],
      default: 0
    },
    expanded: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "center"
      // center | start | end
    },
    justify: {
      type: String,
      default: "start"
      // between | around | evenly | start | end | center
    },
    reversed: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { gap, expanded, align, justify, reversed } = toRefs(props);
    const slots = useSlots();
    const defaultSlot = slots.default ? slots.default() : [];
    const justifyMap = {
      "start": "flex-start",
      "end": "flex-end",
      "evenly": "space-evenly",
      "around": "space-around",
      "between": "space-between",
      "center": "center"
    };
    const rowStyle = computed(() => ({
      display: "flex",
      justifyContent: justifyMap[justify.value] ?? "flex-start",
      alignItems: align.value,
      gap: defaultSlot.length == 1 ? "0px" : `${gap.value}px`
    }));
    const childStyle = computed(() => ({
      flex: expanded.value ? 1 : "initial"
    }));
    const slotComponents = computed(() => {
      const defaultSlot2 = slots.default ? slots.default() : [];
      return reversed.value ? defaultSlot2.reverse() : defaultSlot2;
    });
    return {
      rowStyle,
      childStyle,
      slots: slotComponents
    };
  }
});
</script>

<style lang="scss" scoped></style>