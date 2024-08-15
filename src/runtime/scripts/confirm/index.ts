
import { defineNuxtPlugin } from '#imports'
import eventBus from '../../plugins/mitt'
import type { Confirm, ConfirmOptions } from '../../types/confirm'

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