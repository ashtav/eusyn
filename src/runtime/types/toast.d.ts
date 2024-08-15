interface Toast {
    show(message: string, options?: any, type?: string): void;
    error(message: string, options?: any): void;
    success(message: string, options?: any): void;
    warning(message: string, options?: any): void;
    auto(message: string, value: boolean): void;
}

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

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $toast: Toast;
    }
}

export default Toast