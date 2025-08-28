import type Ntx from '../types/ntx';
import type Utils from '../types/utils';
declare const _default: any;
export default _default;
declare module '#app' {
    interface NuxtApp {
        $u: Utils;
        $e: Ntx;
        /**
         * Sets the loading state of the component.
         * This method can be used with various components like buttons or select elements.
         *
         * Add ref="el" to the component to use this method.
         * @example
         * this.$loading(true) // to set loading state
         * this.$loading(false) // to remove loading state
         */
        $loading: (value?: boolean, key?: string) => void;
        $form: (active?: boolean) => void;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $u: Utils;
        $e: Ntx;
        /**
         * Sets the loading state of the component.
         * This method can be used with various components like buttons or select elements.
         *
         * Add ref="el" to the component to use this method.
         * @example
         * this.$loading(true) // to set loading state
         * this.$loading(false) // to remove loading state
         */
        $loading: (value?: boolean, key?: string) => void;
        $form: (active?: boolean) => void;
    }
}
