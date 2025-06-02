import { defineNuxtPlugin } from "#imports";
import eventBus from "../../plugins/mitt.mjs";
const confirm = (title, options = {}) => {
  eventBus.emit("__show_confirm", {
    show: true,
    title,
    ...options
  });
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      confirm
    }
  };
});
