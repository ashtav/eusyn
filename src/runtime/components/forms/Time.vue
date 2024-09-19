<template>
    <div class="time-picker" :class="[shape, { 'has-prefix': prefix != null, 'mb-3': !nospace }]">
        <label class="form-label" v-if="label">{{ label }}</label>

        <div class="input" :class="{ 'focus': hasFocus }" tabindex="0" @focus="onFocus" @blur="onBlur">
            <Ti v-if="prefix && shape == 'form'" :icon="prefix" style="margin: 0 10px; color: #999" />
            <ul>
                <li v-for="(time, i) in times" :key="i" @wheel="onWheel($event, i)">
                    <span class="up" @click="onChange('up', i)"></span>
                    <span class="down" @click="onChange('down', i)"></span>
                    <span class="time"> {{ time }} </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { handleChanges } from '../../scripts/time';

export default {
    inheritAttrs: false,
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            default: '',
            type: String
        },

        label: {
            type: String
        },

        prefix: {
            type: String
        },

        time: {
            type: Array as () => Array<string>,
            default: () => []
        },

        format: {
            type: String,
            default: 'h:i' // support h:i and h:i:s
        },

        nospace: {
            type: Boolean,
            default: false
        },

        shape: {
            type: String,
            default: 'form' // form, component
        }
    },

    setup(props, { emit }) {
        const localValue = ref(props.modelValue)
        const hasFocus = ref(false)

        const initialTimes = () => {
            if (props.format == 'h:i') {
                return ['00', '00'];
            } else if (props.format == 'h:i:s') {
                return ['00', '00', '00'];
            }
            return ['00', '00'];
        };

        const times = ref(initialTimes());

        const padTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);

        const setTime = () => {
            if (props.time.length === 2 && props.format === 'h:i') {
                times.value = props.time.map(t => padTime(parseInt(t)));
            } else if (props.time.length === 3 && props.format === 'h:i:s') {
                times.value = props.time.map(t => padTime(parseInt(t)));
            } else {
                const currentDate = new Date();
                times.value = props.format === 'h:i'
                    ? [padTime(currentDate.getHours()), padTime(currentDate.getMinutes())]
                    : [padTime(currentDate.getHours()), padTime(currentDate.getMinutes()), padTime(currentDate.getSeconds())];
            }
        };

        const onChange = (type: string, index: number) => {
            const result = handleChanges(times.value, props.format, type, index)
            times.value[index] = padTime(result);

            emit('update:modelValue', times.value.join(':'))
        };

        const onWheel = (event: WheelEvent, index: number) => {
            event.preventDefault();
            onChange(event.deltaY < 0 ? 'up' : 'down', index);
        };

        const onFocus = (e: any) => {
            hasFocus.value = true
        }

        const onBlur = (e: any) => {
            hasFocus.value = false
        }

        onMounted(() => setTime());

        watch(() => props.format, () => {
            times.value = initialTimes();
            setTime()
        })

        return { times, hasFocus, onChange, onWheel, onFocus, onBlur }
    }
}
</script>

<style lang="scss" scoped>
.time-picker {
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &.form {
        &.has-prefix {
            ul li:first-child {
                padding-left: 0px;
            }
        }

        .input {
            border: 1px #ddd solid;
            border-radius: 4px;
            overflow: hidden;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &.focus {
                box-shadow: 0 0 0 0.25rem rgba(var(--tblr-primary-rgb), 0.25);
                border-color: #80aad3;

                ul {
                    pointer-events: all;

                    li {
                        padding: 10px 20px !important;

                        &:not(:first-child) {
                            border-color: #ddd;

                            &::before,
                            &::after {
                                content: '';
                                width: 2px;
                                height: 2px;
                                left: 0;
                                position: absolute;
                                background-color: transparent !important;
                            }

                            &::before {
                                top: 41%;
                            }

                            &::after {
                                bottom: 41%;
                            }
                        }
                    }

                    &::after {
                        opacity: 1;
                    }
                }
            }
        }

        ul {
            position: relative;
            width: 100%;
            pointer-events: none;

            &::after {
                content: 'Scroll';
                position: absolute;
                right: 14px;
                color: #888;
                top: 50%;
                transform: translate(0, -50%);
                transition: .2s;
                opacity: 0;
            }

            li {
                display: inline-block;
                padding: 10px 0px;
                transition: .2s;
                border-left: 1px transparent solid;
                user-select: none;
                position: relative;

                &:not(:first-child) {
                    padding-left: 3px;

                    &::before,
                    &::after {
                        content: '';
                        width: 2px;
                        height: 2px;
                        left: 0;
                        position: absolute;
                        background-color: #888;
                    }

                    &::before {
                        top: 41%;
                    }

                    &::after {
                        bottom: 41%;
                    }
                }

                &:first-child {
                    padding-left: 10px;
                }

                span.time {
                    pointer-events: none;
                    position: relative;
                    z-index: 3;
                }

                span.up,
                span.down {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: calc(100% / 2);
                    transition: .2s;

                    &:hover {
                        background-color: #f5f5f5;
                        cursor: pointer;
                    }

                    &:active {
                        background-color: #ddd;
                        cursor: pointer;
                    }
                }

                span.up {
                    top: 0;
                }

                span.down {
                    bottom: 0;
                }
            }
        }
    }

    // block shape
    &.block {
        .input {
            border: 1px #ddd solid;
            display: inline-block;
            background-color: white;
            border-radius: 4px;

            ul {
                li {
                    position: relative;
                    display: inline-block;
                    font-size: 30px;
                    padding: 15px 30px;
                    cursor: default;
                    color: #333;
                    font-weight: bold;
                    transition: .2s;
                    user-select: none;
                    -webkit-text-stroke: 1px #333;

                    &:not(:first-child) {
                        border-left: 1px #ddd solid;
                    }

                    span.time {
                        pointer-events: none;
                        position: relative;
                        z-index: 3;
                    }

                    span.up,
                    span.down {
                        position: absolute;
                        left: 0;
                        width: 100%;
                        height: calc(100% / 2);
                        transition: .2s;

                        &:hover {
                            background-color: #f5f5f5;
                            cursor: pointer;
                        }

                        &:active {
                            background-color: #ddd;
                            cursor: pointer;
                        }
                    }

                    span.up {
                        top: 0;
                    }

                    span.down {
                        bottom: 0;
                    }
                }

                &:hover {
                    li {
                        color: #888;
                        -webkit-text-stroke: 1px #888;

                        &:hover {
                            color: #333;
                            -webkit-text-stroke: 1px #333;
                        }
                    }
                }
            }
        }
    }
}

[data-bs-theme=dark] {

    .time-picker {

        &.form {
            .input {
                background-color: #151f2c;
                border-color: #2d3d50;

                &.focus {
                    border-color: #80aad3;

                    ul li:not(:first-child) {
                        border-left: 1px #2d3d50 solid !important;

                    }
                }
            }

            ul {
                li {
                    &:not(:first-child) {
                        border-color: #2d3d50 !important;
                        border-left: 1px transparent solid !important;
                    }
                }

                li {
                    &:not(:first-child) {
                        padding-left: 3px;

                        &::before {
                            content: '';
                            width: 2px;
                            height: 2px;
                            background-color: #888;
                            position: absolute;
                            left: 0;
                            top: 41%;
                        }

                        &::after {
                            content: '';
                            width: 2px;
                            height: 2px;
                            background-color: #777;
                            position: absolute;
                            left: 0;
                            bottom: 41%;
                        }
                    }

                    span.up,
                    span.down {
                        &:hover {
                            background-color: #2d3d50;
                        }

                        &:active {
                            background-color: #2d3d50;
                        }
                    }
                }

                &:hover {
                    li {
                        &:not(:first-child) {
                            border-color: #2d3d50;
                        }
                    }
                }
            }
        }

        &.block {
            .input {
                border: 1px #ddd solid;
                background-color: #151f2c;
                border-color: #2d3d50;

                ul {
                    li {
                        color: #fff;
                        -webkit-text-stroke: 1px #fff;
                        border-color: #2d3d50;

                        span.up,
                        span.down {
                            &:hover {
                                background-color: #2d3d50;
                            }
                        }
                    }

                    &:hover {
                        li {
                            color: #999;
                            -webkit-text-stroke: 1px #999;

                            &:hover {
                                color: #fff;
                                -webkit-text-stroke: 1px #fff;
                            }
                        }
                    }
                }
            }
        }
    }

}
</style>