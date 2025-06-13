import { defineNuxtPlugin } from "#imports";
import eventBus from "../plugins/mitt.mjs";
const actives = [];
const show = (id, params = {}) => {
  if (actives.length > 0) {
    return console.warn(`For now, only one modal can be active at a time. Please close the current modal before opening a new one.`);
  }
  if (!actives.includes(id)) {
    actives.push(id);
  }
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
