<template>
    <component v-for="(vnode, index) in filteredModals" :is="vnode" :key="index" />
</template>

<script>
import { computed, defineComponent, nextTick, useSlots } from "vue";
import eventBus from "../../plugins/mitt";
export default defineComponent({
  props: {
    log: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const slots = useSlots();
    const localValue = ref("");
    const ids = [];
    const filteredModals = computed(() => {
      const defaultSlot = slots.default?.() || [];
      const getAttribute = (vnode) => {
        const props2 = vnode.type?.props;
        const id = props2?.id?.default;
        return { id };
      };
      if (props.log) {
        const files = defaultSlot.map((vnode) => {
          return getAttribute(vnode);
        });
        console.log(files);
      }
      return defaultSlot.filter((vnode) => {
        const component = getAttribute(vnode);
        if (!ids.includes(component.id)) {
          ids.push(component.id);
        }
        return component.id === localValue.value;
      });
    });
    const onShow = async (args) => {
      if (ids.includes(args.id)) {
        localValue.value = args.id || "";
        await nextTick();
        eventBus.emit("__show_modal2", { id: args.id, params: args.params || {} });
      }
    };
    onMounted(() => {
      eventBus.on("__show_modal", onShow);
    });
    return {
      filteredModals
    };
  }
});
</script>
