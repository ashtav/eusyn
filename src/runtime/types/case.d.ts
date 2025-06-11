interface Case {
    /**
     * Converts a string to camelCase.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in camelCase.
     */
    camel(value: string, options?: { mergeAmbiguousCharacters?: boolean }): string;

    /**
     * Converts a string to capital case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in capital case.
     */
    capital(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to constant case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in constant case.
     */
    constant(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to dot case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in dot case.
     */
    dot(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to kebab case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in kebab case.
     */
    kebab(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to no case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in no case.
     */
    no(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to pascal case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in pascal case.
     */
    pascal(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to pascal snake case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in pascal snake case.
     */
    pascalSnake(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to path case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in path case.
     */
    path(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to sentence case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in sentence case.
     */
    sentence(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to snake case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in snake case.
     */
    snake(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to train case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in train case.
     */
    train(value: string, options?: { delimiter?: string, locale?: string }): string;
}

export default Case