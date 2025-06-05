<template>
    <slot :counter="counter">{{ counter }}</slot>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';

export default {
    setup(props) {
        const { value, duration } = props
        const counter = ref(0)
        const interval = ref(null)

        // count from min to max
        const increment = () => {
            if (interval.value) clearInterval(interval.value)

            // count from 0 to value with duration
            const step = value / (duration / 100)
            let current = 0
            interval.value = setInterval(() => {
                current += step
                if (current >= value) {
                    current = value
                    clearInterval(interval.value)
                }
                counter.value = Math.floor(current)
            }, 100)
        }

        // Initialize the counter
        onMounted(() => {
            increment()
        })

        // Watch for changes in value and re-initialize the counter
        watch(() => props.value, (newValue) => {
            increment()
        })

        // watch duration
        watch(() => props.duration, (newDuration) => {
            increment()
        })

        return { counter, increment }
    },

    props: {
        value: {
            type: Number,
            default: 0
        },

        duration: {
            type: Number,
            default: 1000 // duration in milliseconds
        }
    },
}
</script>

<style lang="scss" scoped></style>