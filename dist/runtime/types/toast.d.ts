interface ToastOptions {
    align?: string
}

interface Toast {
    show(message: string, options?: ToastOptions, type?: string): void;
    error(message: string, options?: ToastOptions): void;
    success(message: string, options?: ToastOptions): void;
    warning(message: string, options?: ToastOptions): void;
    auto(message: string, value: boolean): void;
}

export default Toast