
import { defineNuxtPlugin } from '#imports'

import type Ntx from '../types/ntx'
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
    
    focus: (self: any, ref: string): void => {
        (self.$refs[ref] as any)?.doFocus()
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