
import { defineNuxtPlugin } from '#imports';
import eventBus from '../../plugins/mitt';
import type { Confirm, ConfirmOptions } from '../../types/confirm';

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

const confirm: Confirm = (title: string, options: ConfirmOptions = {}) => {
    eventBus.emit('__show_confirm', {
        title: title,
        ...options
    })
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            confirm
        }
    }
})
