const textOption = (option: any, prioritizeValue: boolean = false) => {
    return `${(typeof option === 'string' ? option : prioritizeValue ? (option?.value ?? option?.label) : (option?.label ?? option?.value)) ?? ''}`;
}

export { textOption };

