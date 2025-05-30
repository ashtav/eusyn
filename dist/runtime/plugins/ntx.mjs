import { defineNuxtPlugin } from "#imports";
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
  focus: (self, ref) => {
    self.$refs[ref]?.doFocus();
  },
  overlay: (message, options) => {
    if (message === false) {
      const overlay2 = document.querySelector(".ntx-overlay");
      if (overlay2) {
        document.body.removeChild(overlay2);
      }
      return;
    }
    const component = (message2) => `<div class="text-center">
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
const e = ntx;
export default defineNuxtPlugin(() => {
  return {
    provide: {
      e
    }
  };
});
