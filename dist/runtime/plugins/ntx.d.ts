import type Ntx from '../types/ntx';
declare const _default: any;
export default _default;
declare module '#app' {
    interface NuxtApp {
        $ntx: Ntx;
        $n: Ntx;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $ntx: Ntx;
        $n: Ntx;
    }
}
