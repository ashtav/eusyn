interface Case {
    camelCase(value: string, options?: { mergeAmbiguousCharacters?: boolean }): string;
    capitalCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    constantCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    dotCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    kebabCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    noCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    pascalCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    pascalSnakeCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    pathCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    sentenceCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    snakeCase(value: string, options?: { delimiter?: string, locale?: string }): string;
    trainCase(value: string, options?: { delimiter?: string, locale?: string }): string;
}

export default Case