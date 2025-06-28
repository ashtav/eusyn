import { ref } from "vue";
const themeValue = ref("system");
const setTheme = (value) => {
  themeValue.value = value || "system";
  const current = document.documentElement.getAttribute("data-bs-theme") || "light";
  const resolveTheme = () => {
    if (value === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (!value) {
      return current === "dark" ? "light" : "dark";
    }
    return value;
  };
  const resolved = resolveTheme();
  useHead({
    htmlAttrs: { "data-bs-theme": resolved }
  });
  themeValue.value = resolved;
};
const theme = {
  set: setTheme,
  get: themeValue
};
export default theme;
