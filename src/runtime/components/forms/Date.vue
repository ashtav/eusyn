<template>
    <div :class="['date', utils.on(disabled, 'disabled'), { 'mb-3': !nospace }]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group">
            <div @wheel="onWheel">
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                {{ localValue }}
            </div>

            <div class="controls">
                <span v-for="(icon, i) in ['hgi-arrow-down-01', 'hgi-arrow-up-01']" @click="onControl(i)">
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
    inheritAttrs: false,
    emits: ['update:modelValue'],

    setup(props, { emit }) {

        // make sure the value is date formatted, if not, set it to current date
        const value = props.modelValue ? new Date(props.modelValue) : new Date();
        const localValue = ref(utils.dateFormat(value, 'Y-m-d'));

        // watch v-model
        watch(() => props.modelValue, (value) => {
            localValue.value = value
        })

        const onControl = (i: number) => {
            const date = new Date(localValue.value);
            const minDate = props.minDate ? new Date(props.minDate) : null;
            const maxDate = props.maxDate ? new Date(props.maxDate) : null;

            if (i === 0) {
                date.setDate(date.getDate() - 1);
            } else {
                date.setDate(date.getDate() + 1);
            }

            // Check min and max date
            if (minDate && date < minDate) {
                date.setTime(minDate.getTime());
            }
            if (maxDate && date > maxDate) {
                date.setTime(maxDate.getTime());
            }
            localValue.value = utils.dateFormat(date, 'Y-m-d');
            emit('update:modelValue', localValue.value);
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
        },

        nospace: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.date {
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
    .date {
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