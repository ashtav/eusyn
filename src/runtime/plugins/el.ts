
import { defineNuxtPlugin } from '#imports';

interface El {
    focus: (ref: string) => void
}

const el: El = {
    focus: function(ref: string) {
        console.log(this)
    }
}

export { el };

export default defineNuxtPlugin(() => {
    return {
        provide: {
            el
        }
    }
})