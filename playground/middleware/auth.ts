export default defineNuxtRouteMiddleware((to, from) => {
    const nuxt = useNuxtApp();
    const theme = useCookie('theme')

    nuxt.$e.theme.set(theme.value || 'system');
})