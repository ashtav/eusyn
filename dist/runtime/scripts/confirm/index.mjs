import { defineNuxtPlugin } from "#imports";
import eventBus from "../../plugins/mitt.mjs";
const confirm = (title, options = {}) => {
  eventBus.emit("__show_confirm", {
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
