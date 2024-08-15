import { defineNuxtPlugin } from '#imports'
import type { App } from 'vue'
import Toast from '../../components/overlays/Toast.vue'
import { createComponent } from '../../plugins/helper'

const Plugin = {
    install: (_: App, options: Record<string, any> = {}) => {
        const propsData = Object.assign({}, options)
        createComponent(Toast, propsData, document.body)
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.server) {
        nuxtApp.vueApp.use(Plugin)
    }
})