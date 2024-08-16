
import { defineNuxtPlugin } from '#imports'
import type Ntx from '../types/ntx'
import { faker } from './faker'
import { image } from './image'
import { utils } from './utils'

const ntx: Ntx = {
    utils: utils,
    faker: faker,
    image: image
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            ntx
        }
    }
})

declare module '#app' {
    interface NuxtApp {
        $ntx: Ntx;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $ntx: Ntx;
    }
}