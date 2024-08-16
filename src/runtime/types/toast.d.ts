interface Toast {
    show(message: string, options?: any, type?: string): void;
    error(message: string, options?: any): void;
    success(message: string, options?: any): void;
    warning(message: string, options?: any): void;
    auto(message: string, value: boolean): void;
}

export default Toast