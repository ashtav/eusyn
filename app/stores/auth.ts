import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLogged: false
        }
    },

    actions: {
        login(data: any) {
            return api.post('login', data)
        },
    },
})