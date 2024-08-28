declare module '#app' {
    interface NuxtApp {
        $toast: Toast;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $toast: Toast;
    }
}
declare const toast: Toast;
declare const _default: any;
export default _default;
export { toast };
