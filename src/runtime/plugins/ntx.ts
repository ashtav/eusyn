
import { defineNuxtPlugin } from '#imports'

import type Ntx from '../types/ntx'
import changeCase from './case'
import { faker } from './faker'
import { image } from './image'
import storage from './storage'
import theme from './theme'
import { utils } from './utils'

const ntx: Ntx = {
    utils: utils, // $n.utils.ucwords('hello')
    faker: faker, // $n.faker.name()
    image: image, // $n.image.resize()
    theme: theme, // $n.theme.set()
    storage: storage, // $n.storage.set()
    case: changeCase,

    focus: (self: any, ref: string, delay: number = 0): void => {
        setTimeout(() => {
            (self.$refs[ref] as any)?.doFocus()
        }, delay);
    },

    overlay: (message?: string | Boolean, options?: { closeAfter?: Number }): void => {
        // if message is false, remove the overlay
        if (message === false) {
            const overlay = document.querySelector('.ntx-overlay')
            if (overlay) {
                document.body.removeChild(overlay)
            }
            return
        }

        const component = (message: string) => `<div class="text-center">
    <div class="spinner-border" class="xl"></div> <div class="mt-2"> ${message} </div>
  </div>`

        const overlay = document.createElement('div')
        overlay.className = 'ntx-overlay'

        // if message is null, set empty string
        overlay.innerHTML = component(typeof message === 'string' ? message : '')
        document.body.appendChild(overlay)

        // if after 30 seconds the overlay is still there, remove it
        if (options?.closeAfter) {
            setTimeout(() => {
                const overlay = document.querySelector('.ntx-overlay')
                if (overlay) {
                    document.body.removeChild(overlay)
                }
            }, (Number(options.closeAfter) ?? 30) * 1000)
        }
    }
}

const e: Ntx = ntx

export default defineNuxtPlugin(() => {
    return {
        provide: {
            e
        }
    }
})

declare module '#app' {
    interface NuxtApp {
        $e: Ntx;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $e: Ntx;
    }
}