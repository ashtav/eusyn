<template>
    <div :class="['number', utils.on(disabled, 'disabled'), { 'mb-3': !nospace }]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div>
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                {{ localValue }}
            </div>

            <div class="controls">
                <span v-for="(icon, i) in ['hgi-minus-sign', 'hgi-plus-sign']" @click="onControl(i)">
                    <Icon :icon="icon" />
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { utils } from '../../plugins/utils';

export default {
    name: 'Number',
    inheritAttrs: false,
    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const value =  parseInt(props.modelValue) || 0;
        const localValue = ref<number>(value);

        // watch v-model
        watch(() => props.modelValue, (value) => {
            localValue.value = parseInt(value) || 0;
        })

        const onControl = (i: number) => {
            if (props.disabled || props.readonly) return;

            localValue.value = i === 0
                ? Math.max((localValue.value || 0) - 1, props.min || 0)
                : Math.min((localValue.value || 0) + 1, props.max || Number.MAX_SAFE_INTEGER);

            emit('update:modelValue', localValue.value.toString());
        }

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            onControl(e.deltaY < 0 ? 1 : 0);
        }


        return { utils, localValue, onControl, onWheel }
    },

    props: {
        modelValue: {
            default: '',
            type: [String, Number]
        },
        label: {
            type: String,
            default: null
        },

        prefix: {
            type: String,
            default: null
        },

        disabled: {
            type: Boolean,
            default: false
        },

        readonly: {
            type: Boolean,
            default: false
        },

        required: {
            type: Boolean,
            default: false
        },

        min: {
            type: Number,
            default: null
        },

        max: {
            type: Number,
            default: null
        },

        nospace: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.number {
    &.disabled {
        pointer-events: none;

        .input-group {
            background-color: #f6f8fb;

            div {
                opacity: .3;
            }
        }

        .controls {
            opacity: .3;
        }
    }

    .input-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.75rem;
        padding-right: 0;
        background-color: #f9f9f9;
        border-radius: 0.25rem;
        border: 1px #dadfe5 solid;
        height: 40px;

        div {
            display: flex;
            align-items: center;
        }

        .controls {
            span {
                padding: 3px 0.75rem;
                cursor: pointer;

                &:not(:first-child) {
                    border-left: 1px solid #dadfe5;
                }

                &:hover {
                    opacity: 0.7;
                }

                &:active {
                    opacity: 1;
                }
            }
        }
    }
}

[data-bs-theme=dark] {
    .number {
        .input-group {
            background-color: #151f2c;
            color: #fff;
            border-color: #1f2e41;

            .controls span {
                border-color: #1f2e41;
            }
        }

        &.disabled {
            .input-group {
                background-color: #1b293a;
            }
        }
    }
}
</style>