import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLogged: false
        }
    },

    actions: {
        login(data: any) {
            return new Promise<any>(async (resolve) => {
                setTimeout(() => {
                    this.isLogged = true
                    resolve(true)
                }, 1000);
            })
        },
    },
})