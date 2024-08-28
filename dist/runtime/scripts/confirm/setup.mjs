import { defineNuxtPlugin } from "#imports";
import Confirm from "../../components/overlays/Confirm.vue";
import { createComponent } from "../../plugins/helper.mjs";
const Plugin = {
  install: (_, options = {}) => {
    const propsData = Object.assign({}, options);
    createComponent(Confirm, propsData, document.body);
  }
};
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.server) {
    nuxtApp.vueApp.use(Plugin);
  }
});
