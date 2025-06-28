interface Theme {
    /**
     * Toggles or sets the theme for the application.
     * 
     * @param {string} [value] - The desired theme mode. Accepts the following:
     * - `"dark"`: Explicitly set the theme to dark mode.
     * - `"light"`: Explicitly set the theme to light mode.
     * - `"system"`: Automatically set the theme based on the system's preference.
     * - `""` or `null`: Toggles the theme between dark and light modes.
     * 
     * @example
     * // Toggle the theme between dark and light
     * theme();
     * 
     * @example
     * // Set the theme to dark mode
     * theme("dark");
     * 
     * @example
     * // Set the theme based on system preference
     * theme("system");
     */
    set: (value?: string) => void,
    get: Ref<string>
}

export default Theme