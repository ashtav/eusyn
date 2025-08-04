
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

let actives = <Array<string>>[]
let dataStored = <any>{}

const show = (id: string, params: any = {}) => {
    actives = [id]
    dataStored = params?.data || {}
    eventBus.emit('__show_modal', { id, params })
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
    const id = actives.length == 0 ? null : actives[0]
    eventBus.emit('__set_modal_title', { title: title, id })
}

const data = () => dataStored

const callback = (data: any) => {
    const id = actives.length == 0 ? null : actives[0]
    eventBus.emit('__callback_modal', { data: data, id })
}

const modal: Modal = {
    show, close, setTitle, callback, data
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            modal
        }
    }
})

export { modal };

