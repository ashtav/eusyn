import { defineNuxtPlugin } from "#imports";
import { faker } from "./faker.mjs";
import { image } from "./image.mjs";
import { utils } from "./utils.mjs";
const ntx = {
  utils,
  faker,
  image
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      ntx
    }
  };
});
