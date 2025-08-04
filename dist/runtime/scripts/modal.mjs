import { defineNuxtPlugin } from "#imports";
import eventBus from "../plugins/mitt.mjs";
let actives = [];
let dataStored = {};
const show = (id, params = {}) => {
  actives = [id];
  dataStored = params?.data || {};
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
  const id = actives.length == 0 ? null : actives[0];
  eventBus.emit("__set_modal_title", { title, id });
};
const data = () => dataStored;
const callback = (data2) => {
  const id = actives.length == 0 ? null : actives[0];
  eventBus.emit("__callback_modal", { data: data2, id });
};
const modal = {
  show,
  close,
  setTitle,
  callback,
  data
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      modal
    }
  };
});
export { modal };
