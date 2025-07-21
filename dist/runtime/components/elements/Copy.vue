<template>
    <span class="cursor-pointer" @click="onCopy">
        <Icon :icon="copied ? 'hgi-tick-02' : 'hgi-copy-02'" />
    </span>
</template>

<script>
export default {
  setup(props) {
    let interval = null;
    const copied = ref(false);
    const nuxt = useNuxtApp();
    const onCopy = () => {
      if (props.value === "") {
        return;
      }
      navigator.clipboard.writeText(props.value);
      copied.value = true;
      clearInterval(interval);
      interval = setInterval(() => {
        copied.value = false;
      }, 2e3);
      if (props.message) {
        nuxt.$toast.success(props.message);
      }
    };
    return { copied, onCopy };
  },
  props: {
    icon: {
      type: String,
      default: "hgi-copy-02"
    },
    value: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.actions ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2px;
}
.actions ul li {
  display: inline-block;
}
.actions ul li span.action {
  cursor: pointer;
  background-color: var(--background-color);
  padding: 10px 13px;
  height: 35px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}
.actions ul li span.action:hover {
  opacity: 0.7;
}
.actions ul li span.action:active {
  opacity: 1;
}
</style>