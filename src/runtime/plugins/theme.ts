import { ref, type Ref } from "vue";
import type Theme from "../types/theme";

// Reactive reference for the current theme, defaulting to 'system'
const themeValue: Ref<string> = ref('system');

// Function to set or toggle the theme
const setTheme = (value?: string): void => {
    themeValue.value = value || 'system';

    const current = document.documentElement.getAttribute('data-bs-theme') || 'light';

    const resolveTheme = (): string => {
        if (value === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        if (!value) {
            return current === 'dark' ? 'light' : 'dark';
        }
        return value;
    };

    const resolved = resolveTheme();

    useHead({
        htmlAttrs: { 'data-bs-theme': resolved }
    });

    themeValue.value = resolved;
};


// Define theme interface with set and get properties
const theme: Theme = {
    set: setTheme,
    get: themeValue
};

export default theme;
