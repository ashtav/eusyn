<template>
    <form @submit.prevent="handleSubmit">
        <slot />
    </form>
</template>

<script>
export default {
  emits: ["submit"],
  setup(_, { emit }) {
    const disabled = ref(false);
    const onSubmit = () => {
      emit("submit");
    };
    const enterable = (value) => {
      disabled.value = value;
    };
    const handleSubmit = () => {
      if (disabled.value)
        return;
      onSubmit();
    };
    return {
      disabled,
      onSubmit,
      enterable,
      handleSubmit
    };
  }
};
</script>

<style lang="scss" scoped></style>