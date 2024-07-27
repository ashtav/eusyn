import type { Component, ComponentPublicInstance, Slots, VNode, VNodeProps } from 'vue';
import { h, render } from 'vue';

export function removeElement(el: Element): void {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}

export function createComponent(
    component: Component,
    props: VNodeProps | null,
    parentContainer: HTMLElement,
    slots: Slots = {}
): ComponentPublicInstance | null {
    const vNode: VNode = h(component, props, slots);
    const container: HTMLElement = document.createElement('div');
    parentContainer.appendChild(container);
    render(vNode, container);

    return vNode.component?.proxy ?? null;
}