<template>
    <div>
        <div class="range-slider" ref="slider">
            <div class="bar" :style="{ width: localValue + '%' }"></div>
            <div :class="['thumb', { 'active': mousedown }]" ref="thumb"
                :style="{ left: (localValue <= 2 ? 0 : (localValue - 3)) + '%' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';

export default {
    inheritAttrs: false,
    emits: ['update:modelValue'],

    props: {
        modelValue: {
            default: 0,
            type: Number
        },

        range: {
            type: Array<number>,
            default: () => [0, 100]
        },

        step: {
            type: Number,
            default: 1
        }
    },

    setup(props, { emit }) {
        const localValue: Ref<number> = ref(props.modelValue)
        const thumb = ref(null)
        const slider = ref(null)
        const mousedown: Ref<boolean> = ref(false)


        watch(() => props.modelValue, (value) => {
            localValue.value = value
        })

        const updateValue = (event: MouseEvent) => {
            if (mousedown.value && slider.value) {
                const rect = slider.value.getBoundingClientRect()
                const offsetX = (event.clientX - rect.left) + 5
                const percent = Math.min(Math.max(offsetX / rect.width, 0), 1)

                const min = props.range.length == 0 ? 0 : props.range[0]
                const max = props.range.length == 1 ? 100 : props.range[1]

                // Menghitung nilai berdasarkan persentase dan langkah
                localValue.value = Math.round(percent * (max - min) + min)
                localValue.value = Math.round(localValue.value / props.step) * props.step;

                emit('update:modelValue', localValue.value)
            }
        }

        const onMouseMove = (event: MouseEvent) => {
            updateValue(event)
        }

        const onMouseUp = () => {
            mousedown.value = false
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        onMounted(() => {
            thumb.value?.addEventListener('mousedown', () => {
                mousedown.value = true
                window.addEventListener('mousemove', onMouseMove)
                window.addEventListener('mouseup', onMouseUp)
            })
        })

        return { localValue, thumb, slider, mousedown }
    }
}
</script>

<style lang="scss" scoped>
.range-slider {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;

    .bar {
        height: .24rem;
        width: 100%;
        border-radius: 15px;
        background: #0054a6;

        &::before {
            content: '';
            position: absolute;
            height: .24rem;
            width: 100%;
            border-radius: 15px;
            background: #dadfe5;
            z-index: -1;
            cursor: pointer;
        }
    }

    .thumb {
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #0054a6;
        border: .2rem #fff solid;
        cursor: pointer;
        left: 10%;
        // transition: .1s;

        &.active {
            box-shadow: 0 0px 0px 3px rgba(1, 89, 177, 0.3)
        }

        &:hover {
            box-shadow: 0 0px 0px 3px rgba(1, 89, 177, 0.3)
        }

        &:active {
            background-color: #8c99a5;
        }
    }
}
</style>