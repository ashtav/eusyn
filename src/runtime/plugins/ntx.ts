
import { defineNuxtPlugin } from '#imports';

import type { ComponentPublicInstance } from 'vue';
import eventBus from '../plugins/mitt';
import type Ntx from '../types/ntx';
import type Utils from '../types/utils';
import changeCase from './case';
import { faker } from './faker';
import { image } from './image';
import storage from './storage';
import theme from './theme';
import { utils } from './utils';

const ntx: Ntx = {
    utils: utils, // $n.utils.ucwords('hello')
    faker: faker, // $n.faker.name()
    image: image, // $n.image.resize()
    theme: theme, // $n.theme.set()
    storage: storage, // $n.storage.set()
    case: changeCase,

    focus: (self: any, ref: string, delay: number = 0): void => {
        setTimeout(() => {
            const el = self.$refs[ref] as any

            // this is select option
            if (el?.options) {
                el.$refs.refSelect?.focus()
                return
            }

            el?.doFocus()
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

        const component = (message: string) => `<div class="text-center text-white">
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

const utilities: Utils = { ...utils }

const e: Ntx = ntx
let activeLoadingKey = null

export default defineNuxtPlugin((nuxtApp: any) => {
    nuxtApp.vueApp.config.globalProperties.$loading = function (value: boolean = true, key: string = 'el') {
        const self = this as ComponentPublicInstance;
        const el = self.$refs[value ? key : activeLoadingKey ?? key] as any;
        activeLoadingKey = key

        const type = el?.$el.classList;

        // for select components
        if (type.contains('select')) {
            el.setLoading(value);
        }

        // for button components
        else if (type.contains('btn')) {
            const events = el?.events || {};
            value ? events.submit() : events.abort();
        }

        // for radio components
        else if (type.contains('radio')) {
            el.setLoading(value);
        }

        // for checkbox components
        else if (type.contains('checkbox')) {
            el.setLoading(value);
        }
    }

    nuxtApp.vueApp.config.globalProperties.$form = function (active: boolean = true) {
        eventBus.emit('__form', active)
    }

    return {
        provide: {
            e,
            u: utilities
        }
    }
})

declare module '#app' {
    interface NuxtApp {
        $u: Utils;
        $e: Ntx;

        /**
         * Sets the loading state of the component.
         * This method can be used with various components like buttons or select elements.
         * 
         * Add ref="el" to the component to use this method.
         * @example
         * this.$loading(true) // to set loading state
         * this.$loading(false) // to remove loading state
         */
        $loading: (value?: boolean, key?: string) => void;

        $form: (active?: boolean) => void;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $u: Utils;
        $e: Ntx;

        /**
         * Sets the loading state of the component.
         * This method can be used with various components like buttons or select elements.
         * 
         * Add ref="el" to the component to use this method.
         * @example
         * this.$loading(true) // to set loading state
         * this.$loading(false) // to remove loading state
         */
        $loading: (value?: boolean, key?: string) => void;

        $form: (active?: boolean) => void;
    }
}