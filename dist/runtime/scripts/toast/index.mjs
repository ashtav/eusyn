import { defineNuxtPlugin } from "#imports";
import eventBus from "../../plugins/mitt.mjs";
const show = (message, options = {}, type = "default") => {
  eventBus.emit("__show_toast", {
    message,
    options,
    type
  });
};
const error = (message, options = {}) => show(message, options, "error");
const success = (message, options = {}) => show(message, options, "success");
const warning = (message, options = {}) => show(message, options, "warning");
const auto = (message, value) => show(message, {}, value ? "success" : "error");
const toast = {
  show,
  error,
  success,
  warning,
  auto
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast
    }
  };
});
export { toast };
