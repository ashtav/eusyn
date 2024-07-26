import { createApp, h } from 'vue';
import ToastComponent from '../components/overlays/Toast.vue';

export function injectToast(
    props: Record<string, any> = {},
    parentContainer: HTMLElement,
    slots: Record<string, any> = {}
) {
    const container = document.createElement('div');
    parentContainer.appendChild(container);

    const app = createApp({
        render() {
            return h(ToastComponent, props, slots);
        }
    });

    app.mount(container);
}