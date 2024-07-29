<template>
    <div>
        <div class="shimmer" :style="styles">
        </div>
    </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

export default {
    props: {
        size: {
            type: [Array<any>, Number],
            default: [15, 50]
        }
    },

    setup(props) {
        let isNumber = typeof props.size == 'number'

        let width = isNumber ? props.size : (props.size as Array<number>).length == 0 ? 50 : props.size[1]
        let height = isNumber ? props.size : (props.size as Array<number>).length == 0 ? 50 : props.size[0]

        const styles: Ref<Record<string, any>> = ref({
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '5px'
        })

        return { styles }
    }
}
</script>

<style lang="scss" scoped>
@keyframes shimmer {
    0% {
        background-position: -100% 0;
    }

    100% {
        background-position: 100% 0;
    }
}

@mixin shimmer($color: #ddd, $highlight: #edeef1, $duration: 1.5s) {
    background: linear-gradient(to right,
            $color 8%,
            $highlight 28%,
            $color 33%);
    background-size: 200% 100%;
    animation: shimmer $duration linear infinite;
}

.shimmer {
    @include shimmer();
}
</style>