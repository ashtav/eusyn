<template>
    <component v-for="(vnode, index) in filteredModals" :is="vnode" :key="index" />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, useSlots } from "vue";
import eventBus from '../../plugins/mitt';

export default defineComponent({
    props: {
        log: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const slots = useSlots();
        const localValue = ref('');
        const ids = []

        const filteredModals = computed(() => {
            const defaultSlot = slots.default?.() || [];

            const getAttribute = (vnode: any) => {
                const filePath = (vnode.type as any)?.__file as string | undefined;
                const fileName = filePath.split("/").pop()?.replace(".vue", "").toLowerCase();
                const componentPath = filePath.split("components/")[1];
                const modalId = componentPath.replace(".vue", "")
                    .replace(/\//g, "-")
                    .replace(/([a-z])([A-Z])/g, "$1-$2")
                    .toLowerCase().replaceAll('modals-', '');

                return {
                    filePath,
                    fileName,
                    component: vnode.type,
                    componentPath,
                    modalId
                };
            };

            if (props.log) {
                const files = defaultSlot.map((vnode) => {
                    return getAttribute(vnode);
                });

                console.log(files);
            }

            return defaultSlot.filter((vnode) => {
                const component = getAttribute(vnode)

                if(!ids.includes(component.modalId)) {
                    ids.push(component.modalId);
                }

                return component.modalId === localValue.value;
            });
        });

        const onShow = async (args: any) => {
            if (ids.includes(args.id)) {

                const id = (args.id ?? '').toLowerCase();
                localValue.value = id;

                await nextTick()

                eventBus.emit('__show_modal2', { id: args.id, params: args.params || {} })
            }
        }

        onMounted(() => {
            eventBus.on('__show_modal', onShow)
        })

        return {
            filteredModals
        };
    },
});
</script>
