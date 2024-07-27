
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

export default defineNuxtPlugin((_) => {
    return {
        provide: {
            confirm: (title: string, options: ConfirmOptions = {}) => {
                eventBus.emit('__show_confirm', {
                    title: title,
                    ...options
                })
            }
        }
    }
})

