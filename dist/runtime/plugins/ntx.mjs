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
  }
};
const n = ntx;
export default defineNuxtPlugin(() => {
  return {
    provide: {
      ntx,
      n
    }
  };
});
