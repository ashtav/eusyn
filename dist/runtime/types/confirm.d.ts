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

declare module '#app' {
    interface NuxtApp {
        $confirm: Confirm;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $confirm: Confirm;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $confirm: Confirm;
    }
}

export { Confirm, ConfirmOptions, ConfirmationActions }

