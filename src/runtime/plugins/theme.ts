import { ref, type Ref } from "vue";
import type Theme from "../types/theme";

// Reactive reference for the current theme, defaulting to 'system'
const themeValue: Ref<string> = ref('system');

// Function to set or toggle the theme
const setTheme = (value?: string): void => {
    const body = document.body;
    const themeAttribute = "data-bs-theme";
    const currentTheme = body.getAttribute(themeAttribute) || 'light'; // Default to 'light' if not set

    // Toggle theme if no value is provided or value is empty
    if (!value) {
        body.setAttribute(themeAttribute, currentTheme === "dark" ? "light" : "dark");
    } else if (value === "system") {
        // Set theme based on the system preference
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        body.setAttribute(themeAttribute, prefersDarkScheme ? "dark" : "light");
    } else {
        // Set theme to the provided value
        body.setAttribute(themeAttribute, value);
    }

    // Update the reactive themeValue
    themeValue.value = body.getAttribute(themeAttribute) || 'light';
};

// Define theme interface with set and get properties
const theme: Theme = {
    set: setTheme,
    get: themeValue
};

export default theme;
