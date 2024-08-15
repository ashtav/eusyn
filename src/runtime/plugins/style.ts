
import { defineNuxtPlugin } from '#imports'
import type Style from '../types/style'

/**
 * Generates a random image URL.
 *
 * @param type - The type of image, can be 'avatar', 'food', or null.
 * @returns A random image URL as a string.
 */
const image = (path?: string): string => {
    const github = 'https://raw.githubusercontent.com/ashtav/assets/master'

    // for avatar is 1 - 16 (.jpg)
    // for food is 1 - 12 (.jpg)

    if (path == null) {
        return `background-image: url('${github}/avatar/${Math.floor(Math.random() * 16) + 1}.jpg')`
    }

    return `background-image: url(${path})`
}


const style: Style = {
    image
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            style
        }
    }
})