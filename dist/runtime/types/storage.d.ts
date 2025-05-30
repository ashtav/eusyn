interface LocalStorage {
    /**
     * Get value from localStorage
     * @param key - Key of the value.
     * @returns Parsed value or raw string from localStorage
     */
    get(key: string): any;

    /**
     * Set value to localStorage
     * @param key - Key of the value.
     * @param payload - Value to be stored, can be any type.
     */
    set(key: string, payload: any): void;

    /**
     * Remove value from localStorage
     * @param key - Key of the value.
     */
    remove(key: string): void;
}

export default LocalStorage