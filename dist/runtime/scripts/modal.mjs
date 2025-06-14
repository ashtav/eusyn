import { defineNuxtPlugin } from "#imports";
import eventBus from "../plugins/mitt.mjs";
let actives = [];
const show = (id, params = {}) => {
  actives = [id];
  eventBus.emit("__show_modal", { id, params });
};
const close = (id) => {
  if (!id) {
    const removedId = actives.pop();
    eventBus.emit("__close_modal", { id: removedId });
  } else {
    const index = actives.indexOf(id);
    if (index > -1) {
      actives.splice(index, 1);
      eventBus.emit("__close_modal", { id });
    }
  }
};
const setTitle = (title) => {
  eventBus.emit("__set_modal_title", { title });
};
const callback = (data) => {
  eventBus.emit("__callback_modal", { data });
};
const modal = {
  show,
  close,
  setTitle,
  callback
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      modal
    }
  };
});
export { modal };
