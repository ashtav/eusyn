interface Modal {
    show(id: string, params?: any): void;
    close(id?: string): void;
    setTitle(title: string): void;
    callback(data: any): void;
}

export default Modal