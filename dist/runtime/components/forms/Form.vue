<template>
    <form @submit.prevent="handleSubmit" @keydown.enter="disabled ? $event.preventDefault() : null">
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
    const onSubmit = () => {
      emit("submit");
    };
    const handleSubmit = () => {
      if (disabled.value)
        return;
      onSubmit();
    };
    onMounted(() => {
      eventBus.on("__form", (value) => disabled.value = value);
    });
    return {
      disabled,
      onSubmit,
      handleSubmit
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