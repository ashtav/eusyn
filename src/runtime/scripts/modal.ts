
import { defineNuxtPlugin } from '#imports';
import eventBus from '../plugins/mitt';

const actives = <Array<string>>[];

const show = (id: string, params: any = {}) => {
    actives.push(id)
    eventBus.emit('__show_modal', { id, params })
}

const close = (id?: string) => {
    if (id === null) {
        const removedId = actives.pop();
        eventBus.emit('__close_modal', { id: removedId });
    } else {
        const index = actives.indexOf(id);
        if (index > -1) {
            actives.splice(index, 1);
            eventBus.emit('__close_modal', { id });
        }
    }
}

const methods = {
    show, close
}

export default defineNuxtPlugin((_) => {
    return {
        provide: {
            modal: methods
        }
    }
})


