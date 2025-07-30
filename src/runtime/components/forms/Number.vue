<template>
    <div :class="['number', utils.on(disabled, 'disabled')]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div class="w-100">
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                <input class="form-control" :value="localValue" @input="onInput" @keypress="onPress"
                    @change="onChange" />
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
        const value = parseInt(props.modelValue.toString()) || 0;
        const localValue = ref<number>(value);

        // watch v-model
        watch(() => props.modelValue, (value) => {
            localValue.value = parseInt(value.toString()) || 0;
        })

        const onControl = (i: number) => {
            if (props.disabled || props.readonly) return;

            localValue.value = i === 0
                ? Math.max((localValue.value || 0) - 1, props.min ?? 0)
                : Math.min((localValue.value || 0) + 1, props.max ?? Number.MAX_SAFE_INTEGER);

            emit('update:modelValue', localValue.value.toString());
        }

        const onInput = (e: any) => {
            if (props.disabled || props.readonly) return;

            // support contenteditable dan input biasa
            const raw = e.target.innerText || e.target.value || '';
            const cleaned = raw.replace(/[^0-9-]/g, '');
            const min = props.min ?? 0;
            const max = props.max ?? Number.MAX_SAFE_INTEGER;
            let parsed = parseInt(cleaned, 10);

            if (isNaN(parsed)) {
                return
            }

            // clamp value
            parsed = Math.min(Math.max(parsed, min), max);

            // update internal model
            localValue.value = parsed;

            // update tampilan (prevent input tampak di luar range)
            if (e.target.isContentEditable) {
                e.target.innerText = parsed.toString();
            } else {
                e.target.value = parsed.toString();
            }

            emit('update:modelValue', parsed.toString());
        };

        const onPress = (e: any) => {
            const key = e.key;
            const value = e.target.value;

            const min = props.min ?? 0;

            // Allow navigation keys, backspace, delete, tab, etc.
            if (
                key === 'Backspace' ||
                key === 'Delete' ||
                key === 'Tab' ||
                key === 'ArrowLeft' ||
                key === 'ArrowRight' ||
                key === 'Home' ||
                key === 'End'
            ) {
                return;
            }

            // Allow only one '-' at the start
            if (key === '-') {
                if (value.length !== 0 || value.includes('-') || min == 0) {
                    e.preventDefault();
                }
                return;
            }

            // Prevent multiple leading zeros
            if (key === '0' && value === '0') {
                e.preventDefault();
                return;
            }
            if (key === '0' && /^-?0$/.test(value)) {
                e.preventDefault();
                return;
            }
            if (/^0\d/.test(value + key) || /^-0\d/.test(value + key)) {
                e.preventDefault();
                return;
            }

            // Allow only digits
            if (!/^[0-9]$/.test(key)) {
                e.preventDefault();
            }
        }

        const onChange = (e: any) => {
            const value = e.target.value;

            if (value.trim() == '' || value.trim() == '-') {
                e.target.value = 0
                localValue.value = 0
                emit('update:modelValue', 0);
            }
        }

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            onControl(e.deltaY < 0 ? 1 : 0);
        }


        return { utils, localValue, onControl, onWheel, onInput, onPress, onChange }
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
        }
    }
}
</script>

<style lang="scss" scoped>
.number {
    overflow: hidden;

    &.disabled {
        pointer-events: none;

        div {
            opacity: .5;
        }
    }

    .input-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.75rem;
        padding-right: 0;
        background-color: var(--input-bg-color);
        border-radius: 6px;
        border: 1px solid var(--input-br-color);
        height: 36px;

        div {
            display: flex;
            align-items: center;
        }

        input {
            width: 100%;
            border: none;
            padding-left: 0;
        }

        .controls {
            position: absolute;
            right: 0;

            span {
                padding: .55rem 0.75rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                &:not(:first-child) {
                    border-left: 1px solid var(--input-br-color);
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
</style>