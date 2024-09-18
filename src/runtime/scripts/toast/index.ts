
import { defineNuxtPlugin } from '#imports';
import eventBus from '../../plugins/mitt';

const show = (message: string, options: ToastOptions = {}, type = 'default') => {
    eventBus.emit('__show_toast', {
        message: message,
        options: options,
        type: type
    })
}

const error = (message: string, options: ToastOptions = {}) => show(message, options, 'error')
const success = (message: string, options: ToastOptions = {}) => show(message, options, 'success')
const warning = (message: string, options: ToastOptions = {}) => show(message, options, 'warning')
const auto = (message: string, value: boolean) => show(message, {}, value ? 'success' : 'error')

const toast: Toast = {
    show, error, success, warning, auto
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            toast
        }
    }
})

export { toast };

declare module '#app' {
    interface NuxtApp {
        $toast: Toast;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $toast: Toast;
    }
}