<template>
    <div class="time-picker" :class="{ 'has-prefix': prefix != null }">
        <label class="form-label" v-if="label">{{ label }}</label>

        <div class="input d-flex align-items-center justify-content-between">
            <Ti v-if="prefix" :icon="prefix" style="margin: 0 10px; color: #999" />
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
        }
    },

    setup(props, { emit }) {
        const localValue = ref(props.modelValue)

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
            onChange(event.deltaY < 0 ? 'up' : 'down', index);
        };

        onMounted(() => setTime());

        watch(() => props.format, () => {
            times.value = initialTimes();
            setTime()
        })

        return { times, onChange, onWheel }
    }
}
</script>

<style lang="scss" scoped>
.time-picker {
    // display: inline-block;

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
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
        width: 100%;

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

        &:hover {
            li {
                padding: 10px 25px;

                &:not(:first-child) {
                    border-color: #ddd;
                }
            }

            &::after {
                opacity: 1;
            }
        }
    }
}

// .time-picker {
//     display: inline-block;

//     ul {
//         list-style: none;
//         margin: 0;
//         padding: 0;
//         border: 1px #ddd solid;
//         border-radius: 4px;
//         overflow: hidden;
//         background-color: white;

//         &:hover {
//             li {
//                 color: #ccc;
//             }
//         }

//         li {
//             padding: 13px 20px;
//             display: inline-block;
//             font-size: 18px;
//             font-weight: bold;
//             color: #555;
//             user-select: none;
//             position: relative;
//             transition: .2s;

//             &:hover {
//                 color: #222;
//             }

//             &:not(:first-child) {

//                 &::before,
//                 &::after {
//                     content: '';
//                     position: absolute;
//                     left: 0;
//                     background-color: #888;
//                     width: 3px;
//                     height: 3px;
//                     border-radius: 50%;
//                     transition: .2s;
//                     z-index: 2;
//                 }

//                 &::before {
//                     top: 47%;
//                 }

//                 &::after {
//                     bottom: 47%;
//                 }
//             }

//             span {

//                 &.time {
//                     position: relative;
//                     z-index: 1;
//                     pointer-events: none;
//                 }

//                 &.up,
//                 &.down {
//                     position: absolute;
//                     left: 0;
//                     width: 100%;
//                     height: calc(100% / 2);
//                     transition: .2s;

//                     &:hover {
//                         background-color: #f5f5f5;
//                         cursor: pointer;
//                     }

//                     &:active {
//                         background-color: #ddd;
//                         cursor: pointer;
//                     }
//                 }

//                 &.up {
//                     top: 0;
//                 }

//                 &.down {
//                     bottom: 0
//                 }
//             }
//         }
//     }
// }

// [data-bs-theme=dark] {
//     .time-picker {
//         ul {
//             background-color: #151f2c;
//             border-color: #2d3d50;

//             li {
//                 color: #ccc;

//                 &:hover {
//                     color: white;
//                 }

//                 span {

//                     &.time {
//                         position: relative;
//                         z-index: 1;
//                         pointer-events: none;
//                     }

//                     &.up,
//                     &.down {
//                         &:hover {
//                             background-color: #2d3d50;
//                         }

//                         &:active {
//                             background-color: #243141;
//                         }
//                     }
//                 }
//             }

//         }
//     }
// }</style>