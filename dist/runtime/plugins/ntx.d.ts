import type Ntx from '../types/ntx';
import type Utils from '../types/utils';
declare const _default: any;
export default _default;
declare module '#app' {
    interface NuxtApp {
        $ntx: Ntx;
        $n: Ntx;
        $u: Utils;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $ntx: Ntx;
        $n: Ntx;
        $u: Utils;
    }
}
