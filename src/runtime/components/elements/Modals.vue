<template>
    <component v-for="(vnode, index) in filteredModals" :is="vnode" :key="index" />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, useSlots } from "vue";
import eventBus from '../../plugins/mitt';


export default defineComponent({
    name: 'Modals',

    setup(_) {
        const slots = useSlots();
        const localValue = ref('');
        const ids = []

        const filteredModals = computed(() => {
            const defaultSlot = slots.default?.() || [];

            const getAttribute = (vnode: any) => {
                const props = (vnode.type as any)?.props;
                const id = props?.id?.default

                return { id };
            };

            const result = defaultSlot.filter((vnode) => {
                const component = getAttribute(vnode)

                if (!ids.includes(component.id)) {
                    ids.push(component.id);
                }

                if (localValue.value === '') {
                    return false
                }

                return component.id === localValue.value;
            });

            return result
        });

        const onShow = async (args: any) => {
            if (ids.includes(args.id)) {
                localValue.value = args.id || '';

                await nextTick()
                eventBus.emit('__show_modal2', { id: args.id, params: args.params || {} })
            }
        }

        const onClose = async () => {
            setTimeout(() => {
                localValue.value = '';
            }, 250)
        }

        onMounted(() => {
            eventBus.on('__show_modal', onShow)
            eventBus.on('__close_modal', onClose)
        })

        return {
            filteredModals
        };
    },
});
</script>
