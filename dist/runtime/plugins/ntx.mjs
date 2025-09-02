import { defineNuxtPlugin } from "#imports";
import eventBus from "../plugins/mitt.mjs";
import changeCase from "./case.mjs";
import { faker } from "./faker.mjs";
import { image } from "./image.mjs";
import storage from "./storage.mjs";
import theme from "./theme.mjs";
import { utils } from "./utils.mjs";
const ntx = {
  utils,
  // $n.utils.ucwords('hello')
  faker,
  // $n.faker.name()
  image,
  // $n.image.resize()
  theme,
  // $n.theme.set()
  storage,
  // $n.storage.set()
  case: changeCase,
  focus: (self, ref, delay = 0) => {
    setTimeout(() => {
      const el = self.$refs[ref];
      if (el?.options) {
        el.$refs.refSelect?.focus();
        return;
      }
      el?.doFocus();
    }, delay);
  },
  overlay: (message, options) => {
    if (message === false) {
      const overlay2 = document.querySelector(".ntx-overlay");
      if (overlay2) {
        document.body.removeChild(overlay2);
      }
      return;
    }
    const component = (message2) => `<div class="text-center text-white">
    <div class="spinner-border" class="xl"></div> <div class="mt-2"> ${message2} </div>
  </div>`;
    const overlay = document.createElement("div");
    overlay.className = "ntx-overlay";
    overlay.innerHTML = component(typeof message === "string" ? message : "");
    document.body.appendChild(overlay);
    if (options?.closeAfter) {
      setTimeout(() => {
        const overlay2 = document.querySelector(".ntx-overlay");
        if (overlay2) {
          document.body.removeChild(overlay2);
        }
      }, (Number(options.closeAfter) ?? 30) * 1e3);
    }
  }
};
const utilities = { ...utils };
const e = ntx;
let activeLoadingKey = null;
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$loading = function(value = true, key = "el") {
    const self = this;
    const el = self.$refs[value ? key : activeLoadingKey ?? key];
    activeLoadingKey = key;
    const type = el?.$el.classList;
    if (type.contains("select")) {
      el.setLoading(value);
    } else if (type.contains("btn")) {
      const events = el?.events || {};
      value ? events.submit() : events.abort();
    } else if (type.contains("radio")) {
      el.setLoading(value);
    } else if (type.contains("checkbox")) {
      el.setLoading(value);
    } else if (type.contains("_loading")) {
      el.setLoading(value);
    } else if (type.contains("list-group")) {
      el.setLoading(value);
    }
  };
  nuxtApp.vueApp.config.globalProperties.$form = function(active = true) {
    eventBus.emit("__form", active);
  };
  return {
    provide: {
      e,
      u: utilities
    }
  };
});
