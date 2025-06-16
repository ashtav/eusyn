interface Modal {

    /**
     * Show a modal dialog.
     * @param id - The ID of the modal dialog.
     * @param params - Optional parameters to pass to the modal.
     * @example
     * this.$modal.show('myModal');
     * this.$modal.show('myModal', 'Title of Modal');
     * this.$modal.show('myModal', { title: 'My Modal', data: { key: 'value' } });
     **/

    show(id: string, params?: any): void;
    close(id?: string): void;
    setTitle(title: string): void;
    callback(data: any): void;
    data(): any;
}

export default Modal