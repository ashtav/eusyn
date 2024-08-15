import { defineNuxtPlugin } from "#imports";
import eventBus from "../../plugins/mitt.mjs";
const show = (message, options = {}, type = "default") => {
  eventBus.emit("__show_toast", {
    message,
    options,
    type
  });
};
const toast = {
  show,
  error: (message, options = {}) => show(message, options, "error"),
  success: (message, options = {}) => show(message, options, "success"),
  warning: (message, options = {}) => show(message, options, "warning"),
  auto: (message, value) => show(message, {}, value ? "success" : "error")
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast
    }
  };
});
export { toast };
