import { defineNuxtPlugin } from "#imports";
import { ref } from "vue";
import { faker } from "./faker.mjs";
import { image } from "./image.mjs";
import { utils } from "./utils.mjs";
const themeValue = ref("system");
const theme = (value) => {
  const body = document.body;
  const themeAttribute = "data-bs-theme";
  const currentTheme = body.getAttribute(themeAttribute);
  if (!value || value === "") {
    if (currentTheme === "dark") {
      body.setAttribute(themeAttribute, "light");
    } else {
      body.setAttribute(themeAttribute, "dark");
    }
  } else if (value === "system") {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkScheme) {
      body.setAttribute(themeAttribute, "dark");
    } else {
      body.setAttribute(themeAttribute, "light");
    }
  } else {
    body.setAttribute(themeAttribute, value);
  }
  themeValue.value = body.getAttribute(themeAttribute);
};
const ntx = {
  utils,
  faker,
  image,
  theme: {
    set: theme,
    get: themeValue
  }
};
const n = {
  utils,
  faker,
  image,
  theme: {
    set: theme,
    get: themeValue
  }
};
const u = utils;
export default defineNuxtPlugin(() => {
  return {
    provide: {
      ntx,
      n,
      u
    }
  };
});
