
import { defineNuxtPlugin } from '#imports';
import eventBus from '../plugins/mitt';
import type Modal from '../types/modal';

declare module '#app' {
    interface NuxtApp {
        $modal: Modal;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $modal: Modal;
    }
}

// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $modal: Modal;
//     }
// }

const actives = <Array<string>>[]

const show = (id: string, params: any = {}) => {
    if(actives.length > 0) {
        return console.warn(`For now, only one modal can be active at a time. Please close the current modal before opening a new one.`)
    }

    if (!actives.includes(id)) {
        actives.push(id)
    }
    
    eventBus.emit('__show_modal', { id, params})
}

const close = (id?: string) => {
    if (!id) {
        const removedId = actives.pop()
        eventBus.emit('__close_modal', { id: removedId })
    } else {
        const index = actives.indexOf(id)
        if (index > -1) {
            actives.splice(index, 1)
            eventBus.emit('__close_modal', { id: id })
        }
    }
}

const setTitle = (title: string) => {
    eventBus.emit('__set_modal_title', { title: title })
}

const callback = (data: any) => {
    eventBus.emit('__callback_modal', { data: data })
}

const modal: Modal = {
    show, close, setTitle, callback
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            modal
        }
    }
})

export { modal };

