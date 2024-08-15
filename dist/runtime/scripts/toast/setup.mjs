import { defineNuxtPlugin } from "#imports";
import Toast from "../../components/overlays/Toast.vue";
import { createComponent } from "../../plugins/helper.mjs";
const Plugin = {
  install: (_, options = {}) => {
    const propsData = Object.assign({}, options);
    createComponent(Toast, propsData, document.body);
  }
};
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.server) {
    nuxtApp.vueApp.use(Plugin);
  }
});
