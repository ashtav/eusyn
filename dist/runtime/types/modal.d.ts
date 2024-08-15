interface Modal {
    show(id: string, params?: any): void;
    close(id?: string): void;
    setTitle(title: string): void;
    callback(data: any): void;
}

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

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $modal: Modal;
    }
}

export default Modal