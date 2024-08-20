import { defineNuxtPlugin } from '#imports'
import type { App } from 'vue'
import Confirm from '../../components/overlays/Confirm.vue'
import { createComponent } from '../../plugins/helper'

const Plugin = {
    install: (_: App, options: Record<string, any> = {}) => {
        const propsData = Object.assign({}, options)
        createComponent(Confirm, propsData, document.body)
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.server) {
        nuxtApp.vueApp.use(Plugin)
    }
})