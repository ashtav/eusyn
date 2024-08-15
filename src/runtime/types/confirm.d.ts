interface Confirm {
    confirm(title: string, options?: ConfirmOptions): void;
}

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

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $confirm: Confirm;
    }
}

export default Confirm