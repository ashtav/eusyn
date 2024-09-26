import { ref } from "vue";
const themeValue = ref("system");
const setTheme = (value) => {
  const body = document.body;
  const themeAttribute = "data-bs-theme";
  const currentTheme = body.getAttribute(themeAttribute) || "light";
  if (!value) {
    body.setAttribute(themeAttribute, currentTheme === "dark" ? "light" : "dark");
  } else if (value === "system") {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    body.setAttribute(themeAttribute, prefersDarkScheme ? "dark" : "light");
  } else {
    body.setAttribute(themeAttribute, value);
  }
  themeValue.value = body.getAttribute(themeAttribute) || "light";
};
const theme = {
  set: setTheme,
  get: themeValue
};
export default theme;
