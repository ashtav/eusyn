
import { defineNuxtPlugin } from '#imports';
import eventBus from '../../plugins/mitt';

export interface ConfirmationActions {
    abort: Function,
    close: Function,
    submit: Function,
}

export interface ConfirmOptions {
    message?: string,
    icon?: string,
    theme?: string,
    textButton?: string,
    data?: any,
    hint?: string,
    onConfirm?: (actions: ConfirmationActions) => void;
}

const confirm: Confirm = {
    confirm: (title: string, options: ConfirmOptions = {}) => {
        eventBus.emit('__show_confirm', {
            title: title,
            ...options
        })
    }
}

export default defineNuxtPlugin((_) => {
    return {
        provide: {
            confirm
        }
    }
})

interface Confirm {
    confirm(title: string, options?: ConfirmOptions): void;
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