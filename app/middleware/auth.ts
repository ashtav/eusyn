import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    const { isClient, isServer } = useNuxtApp();

    // console.log('middleware ia active', import.meta.client, import.meta.server, `logged: ${auth.isLogged}`)

    // skip middleware on server
    // if (import.meta.server) return
    if (isServer) return;

    // skip middleware on client side entirely
    // if (import.meta.client) return

    if (!auth.isLogged) {
        return navigateTo('/');
    }
});