import type { Confirm } from '../../types/confirm';
declare module '#app' {
    interface NuxtApp {
        $confirm: Confirm;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $confirm: Confirm;
    }
}
declare const _default: any;
export default _default;
