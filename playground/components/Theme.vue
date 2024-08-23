<template>
    <div ref="theme">
        <div class="theme" :class="{ 'active': active }"></div>
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },

    setup() {
        const theme: Ref<HTMLDivElement | null> = ref(null)
        const position = ref([0, 0]); // left and top

        onMounted(() => {
            // get element position
            const el = theme.value as HTMLDivElement

            if (el) {
                const rect = el.getBoundingClientRect();

            }
        })

        return { theme, position }
    }
}
</script>

<style lang="scss" scoped>
.theme {
    position: fixed;
    width: 100vw;
    height: 100vw;
    background-color: #fff;
    transition: .5s ease-in-out;
    pointer-events: none;
    z-index: 999999;
    mix-blend-mode: difference;
    border-radius: 50%;
    left: 0;
    bottom: 0;
    right: 0;
    top: 50px;
    transform: scale(0);

    &.active {
        transform: scale(2);


    }
}
</style>