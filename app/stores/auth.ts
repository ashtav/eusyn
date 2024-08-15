import { defineStore } from 'pinia'
// import { toast } from 'nuxt-tabler-ui/runtime/scripts/toast'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLogged: false
        }
    },

    actions: {
        async login (payload: Record<string, any>) {
            const nuxt = useNuxtApp()

            return api.post('login', payload).then(res => {
                this.isLogged = res.status

                if (!res.status) {
                    nuxt.$toast.error(res.message)
                } else {
                    const cookie = useCookie('token')
                    cookie.value = res.access_token
                }

                return res.status
            })
        }
    }
})