
import { defineNuxtPlugin } from '#imports'
import type { Ref } from 'vue'
import { ref } from 'vue'


import type Ntx from '../types/ntx'
import { el } from './el'
import { faker } from './faker'
import { image } from './image'
import { utils } from './utils'

const themeValue: Ref<string> = ref('system')

const theme = (value?: string): void => {
    const body = document.body;
    const themeAttribute = "data-bs-theme";
    const currentTheme = body.getAttribute(themeAttribute);

    if (!value || value === "") {
        // toggle theme if value is null or empty
        if (currentTheme === "dark") {
            body.setAttribute(themeAttribute, "light");
        } else {
            body.setAttribute(themeAttribute, "dark");
        }
    } else if (value === "system") {
        // get the system theme and apply it
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDarkScheme) {
            body.setAttribute(themeAttribute, "dark");
        } else {
            body.setAttribute(themeAttribute, "light");
        }
    } else {
        // set theme directly if a specific value is provided
        body.setAttribute(themeAttribute, value);
    }

    themeValue.value = body.getAttribute(themeAttribute)
}

const ntx: Ntx = {
    utils: utils,
    faker: faker,
    image: image,
    el: el,
    theme: {
        set: theme,
        get: themeValue
    }
}

const n = {
    ...ntx, focus: (self: any, ref: string) => {
        (self.$refs[ref] as any)?.doFocus()
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            ntx, n
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