<template>
    <div class="accordion" ref="accordion">
        <div class="accordion-item" v-for="(item, i) in items" :key="i">
            <h4 class="accordion-header">
                <button :class="['accordion-button', { collapsed: !isOpen(i) }]" type="button">
                    {{ item.label }}
                </button>
            </h4>
            <div class="accordion-collapse">
                <div class="accordion-body pt-0">
                    {{ item.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref, type Ref } from 'vue';

export default {
    props: {
        items: {
            type: Array as () => Array<{ label: string, content: string }>,
            default: () => []
        },

        multiple: {
            type: Boolean,
            default: false
        },

        open: {
            type: Array as () => number[],
            default: () => []
        }
    },

    setup(props) {
        const accordion: Ref<HTMLDivElement | null> = ref(null);

        const isOpen = (index: number) => props.open.includes(index);
        const isDefaultOpen = (index: number) => props.open.includes(index) && !props.open.includes(index);

        const handleClick = (header: Element, index: number) => {
            const currentItem = header.parentElement as HTMLElement;
            const content = currentItem.querySelector('.accordion-collapse') as HTMLElement;
            const button = header.querySelector('button');

            if (!props.multiple) {
                // Collapse all items if multiple is false
                const items = accordion.value?.querySelectorAll('.accordion-item') || [];
                items.forEach((item: Element) => {
                    const otherButton = item.querySelector('button');
                    const otherContent = item.querySelector('.accordion-collapse') as HTMLElement;
                    if (item !== currentItem) {
                        item.classList.remove('active');
                        otherContent.style.maxHeight = null;
                        otherButton?.classList.add('collapsed');
                    }
                });
            }

            // Toggle current item
            currentItem.classList.toggle('active');
            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                button?.classList.remove('collapsed');
            } else {
                content.style.maxHeight = null;
                button?.classList.add('collapsed');
            }
        };

        onMounted(() => {
            const els = accordion.value;

            if (els) {
                const headers = els.querySelectorAll('.accordion-header');
                headers.forEach((header: Element, index: number) => {
                    const button = header.querySelector('button');
                    button?.addEventListener('click', () => handleClick(header, index));

                    const currentItem = header.parentElement as HTMLElement;
                    const content = currentItem.querySelector('.accordion-collapse') as HTMLElement;

                    // Initialize open state based on props.open
                    if (isOpen(index)) {
                        currentItem.classList.add('active');
                        content.style.transition = 'max-height 0s ease';
                        content.style.maxHeight = content.scrollHeight + 'px';
                        button?.classList.remove('collapsed');
                    }

                    setTimeout(() => {
                        content.style.transition = 'max-height 0.2s ease';
                    }, 0);
                });
            }
        });

        return { accordion, isOpen, isDefaultOpen };
    }
}
</script>

<style lang="scss" scoped>
.accordion-collapse {
    max-height: 0;
    overflow: hidden;
}
</style>