interface Case {
    /**
     * Converts a string to camelCase.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in camelCase.
     * @example
     * 'hello world' => 'helloWorld'
     */
    camel(value: string, options?: { mergeAmbiguousCharacters?: boolean }): string;

    /**
     * Converts a string to capital case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in capital case.
     * @example
     * 'hello world' => 'Hello World'
     */
    capital(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to constant case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in constant case.
     * @example
     * 'hello world' => 'HELLO_WORLD'
     */
    constant(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to dot case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in dot case.
     * @example
     * 'hello world' => 'hello.world'
     */
    dot(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to kebab case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in kebab case.
     * @example
     * 'hello world' => 'hello-world'
     */
    kebab(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to no case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in no case.
     * @example
     * 'hello world' => 'hello world'
     */
    no(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to pascal case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in pascal case.
     * @example
     * 'hello world' => 'HelloWorld'
     */
    pascal(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to pascal snake case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in pascal snake case.
     * @example
     * 'hello world' => 'Hello_World'
     */
    pascalSnake(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to path case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in path case.
     * @example
     * 'hello world' => 'hello/world'
     */
    path(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to sentence case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in sentence case.
     * @example
     * 'hello world' => 'Hello world'
     */
    sentence(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to snake case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in snake case.
     * @example
     * 'hello world' => 'hello_world'
     */
    snake(value: string, options?: { delimiter?: string, locale?: string }): string;

    /**
     * Converts a string to train case.
     * @param value - The string to convert.
     * @param options - Options for conversion.
     * @returns The converted string in train case.
     * @example
     * 'hello world' => 'hello-world'
     */
    train(value: string, options?: { delimiter?: string, locale?: string }): string;
}

export default Case