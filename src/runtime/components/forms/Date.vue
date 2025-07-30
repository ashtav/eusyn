<template>
    <div :class="['date', utils.on(disabled, 'disabled')]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div>
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                <div class="d-flex">
                    <template v-for="(key, i) in ['y', 'm', 'd']" :key="i">
                        <span @click="onFocus(i)"
                            :class="['date-part', { 'focused': focused === i, 'blur': focused != -1 && focused != i }]">{{
                                date()[key] }}</span>
                        <span v-if="i < 2" :class="{ 'blur': focused != -1 }">/</span>
                    </template>
                </div>
            </div>

            <div class="controls">
                <span v-for="(icon, i) in ['hgi-arrow-down-01', 'hgi-arrow-up-01']" @click="onControl(i)">
                    <Icon :icon="`${icon} fix`" />
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';

export default {
    inheritAttrs: false,
    emits: ['update:modelValue'],

    setup(props, { emit }) {

        // make sure the value is date formatted, if not, set it to current date
        const value = props.modelValue ? new Date(props.modelValue) : new Date();
        const localValue = ref(utils.dateFormat(value, 'Y-m-d'));
        const focused = ref(-1)

        const date = (): { d: string, m: string, y: string } => {
            const date = new Date(localValue.value)

            const d = date.getDate().toString().padStart(2, '0')
            const m = (date.getMonth() + 1).toString().padStart(2, '0')
            const y = date.getFullYear().toString()
            return { y, m, d }
        }

        const onFocus = (index: number) => {
            if (focused.value == index) {
                return focused.value = -1
            }

            focused.value = index
        }

        // watch v-model
        watch(() => props.modelValue, (value) => {
            localValue.value = value
        })

        const onControl = (i: number) => {
            const dateObj = new Date(localValue.value);
            const minDate = props.minDate ? new Date(props.minDate) : null;
            const maxDate = props.maxDate ? new Date(props.maxDate) : null;

            // 0 = decrement, 1 = increment
            const delta = i === 0 ? -1 : 1;

            // focused: 0 = year, 1 = month, 2 = day
            if (focused.value === 0) {
                dateObj.setFullYear(dateObj.getFullYear() + delta);
            } else if (focused.value === 1) {
                dateObj.setMonth(dateObj.getMonth() + delta);
            } else {
                dateObj.setDate(dateObj.getDate() + delta);
            }

            // Check min and max date
            if (minDate && dateObj < minDate) {
                dateObj.setTime(minDate.getTime());
            }
            if (maxDate && dateObj > maxDate) {
                dateObj.setTime(maxDate.getTime());
            }
            localValue.value = utils.dateFormat(dateObj, 'Y-m-d');
            emit('update:modelValue', localValue.value);
        }

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            onControl(e.deltaY < 0 ? 1 : 0);
        }

        onMounted(() => {
            document.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.input-group')) {
                    focused.value = -1
                }
            })
        })


        return { utils, focused, date, onControl, onWheel, onFocus }
    },

    props: {
        modelValue: {
            default: '',
            type: String
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

        minDate: {
            type: String,
            default: null
        },

        maxDate: {
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
.date {
    &.disabled {
        pointer-events: none;

        .input-group div {
            border-color: var(--input-br-color);
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
        user-select: none;

        div {
            display: flex;
            align-items: center;
            position: relative;
            bottom: 1px;

            span {
                cursor: pointer;
                transition: .2s;

                &.blur {
                    opacity: .5;
                }

                &.focused {}
            }
        }

        .controls {
            span {
                padding: .45rem .75rem;
                cursor: pointer;

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