/**
 * get is a function to get value from localStorage
 * @param {string} key - Key of the value.
 * @returns {any}
 */

import type LocalStorage from "../types/storage"

const get = (key: string): any => {
    const data = localStorage.getItem(key) || ''

    try {
        return JSON.parse(data)
    } catch (e) {
        return data
    }
}

/**
 * set is a function to set value to localStorage
 * @param {string} key - Key of the value.
 * @param {any} payload - Value to be stored.
 */

const set = (key: string, payload: any): void => {
    const data = payload instanceof Object ? JSON.stringify(payload) : payload
    localStorage.setItem(key, data)
}

/**
 * remove is a function to remove value from localStorage
 * @param {string} key - Key of the value.
 */

const remove = (key: string): void => {
    localStorage.removeItem(key)
}

const storage: LocalStorage = {
    get: get,
    set: set,
    remove: remove,
}

export default storage
