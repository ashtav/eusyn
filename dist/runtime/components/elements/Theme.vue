<template>
    <div class="d-inline-block">
        <div class="theme" :class="{ 'active': active, 'visible': visible }"></div>
        <slot :theme="changeTheme" />
    </div>
</template>

<script>
import { useNuxtApp } from "#app";
import { ref, watch } from "vue";
export default {
  setup() {
    const visible = ref(false);
    const active = ref(false);
    const changeTheme = () => {
      active.value = !active.value;
    };
    watch(() => active.value, (value) => {
      visible.value = true;
      setTimeout(() => {
        const nuxt = useNuxtApp();
        nuxt.$ntx.theme.set(value ? "light" : "dark");
        visible.value = false;
      }, 210);
    });
    return { visible, active, changeTheme };
  }
};
</script>

<style scoped>
.theme {
  position: fixed;
  width: 100vw;
  height: 100vw;
  background-color: #f6f8fb;
  transition: 0.4s ease-in-out;
  pointer-events: none;
  z-index: 999999;
  mix-blend-mode: difference;
  border-radius: 50%;
  left: 0;
  bottom: 0px;
  right: 0;
  top: 20vw;
  opacity: 0;
  transform: scale(0);
}
.theme.active {
  transform: scale(2);
}
.theme.visible {
  opacity: 1;
}
</style>