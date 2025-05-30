import type Modal from '../types/modal';
declare module '#app' {
    interface NuxtApp {
        $modal: Modal;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $modal: Modal;
    }
}
declare const modal: Modal;
declare const _default: any;
export default _default;
export { modal };
