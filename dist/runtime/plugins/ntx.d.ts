import type Ntx from '../types/ntx';
declare const _default: any;
export default _default;
declare module '#app' {
    interface NuxtApp {
        $e: Ntx;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $e: Ntx;
    }
}
