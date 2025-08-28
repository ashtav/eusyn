<template>
    <form @submit.prevent="onSubmit">
        <div v-if="debug" class="p-4">
            <span>Enterable: {{ !disabled }}</span>
        </div>

        <slot />
    </form>
</template>


<script>
import { onMounted, ref } from "vue";
import eventBus from "../../plugins/mitt";
export default {
  inheritAttrs: false,
  emits: ["submit"],
  setup(_, { emit }) {
    const disabled = ref(false);
    const onSubmit = (e) => {
      const submitEvent = e;
      const submitter = submitEvent.submitter;
      if (disabled.value && !submitter) {
        return;
      }
      emit("submit");
    };
    onMounted(() => {
      eventBus.on("__form", (value) => disabled.value = value);
    });
    return {
      disabled,
      onSubmit
    };
  },
  props: {
    debug: {
      type: Boolean,
      default: false
    }
  }
};
</script>