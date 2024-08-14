import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLogged: false
        }
    },

    actions: {
        login(payload: Record<string, any>) {
            return api.post('login', payload).then(res => {
                this.isLogged = res.status

                const cookie = useCookie('token')
                cookie.value = `Bearer ${res.access_token}`
            })
        },
    },
})