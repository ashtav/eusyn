interface ConfirmOptions {
    message?: string,
    icon?: string,
    theme?: string,
    textButton?: string,
    data?: any,
    hint?: string,
    onConfirm?: (actions: ConfirmationActions) => void;
}

interface ConfirmationActions {
    abort: Function,
    close: Function,
    submit: Function,
}

interface Confirm {
    (title: string, options?: ConfirmOptions): void;
}

export { Confirm, ConfirmOptions, ConfirmationActions };

