const textOption = (option: any, prioritizeValue: boolean = false) => {
    const value = (['string', 'boolean'].includes(typeof option) ? option : prioritizeValue ? (option?.value ?? option?.label) : (option?.label ?? option?.value)) ?? '';
    return value
}

const hasValueProperty = (options: Array<any>): boolean => options.some((o: any) => typeof o === 'string' ? false : o.hasOwnProperty('value'));

const validateOptions = (arr: Array<any>) => {
    const withValue = arr.filter(item => item.hasOwnProperty('value'));
    const withoutValue = arr.filter(item => !item.hasOwnProperty('value'));

    if (withValue.length > 0 && withoutValue.length > 0) {
        console.warn(`Format options is invalid: ${withValue.length} items have 'value' property while ${withoutValue.length} items do not.`);
    }
};

export { hasValueProperty, textOption, validateOptions };

