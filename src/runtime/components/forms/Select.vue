<template>
    <div :class="['select', utils.on(disabled || busy, 'disabled')]">
        <label :class="['form-label', utils.on(required, 'required')]" v-if="label"> {{ label }} </label>
        <div class="input-icon" :class="{ 'mb-3': !nospace }">
            <!-- prefix -->
            <span class="input-icon-addon" v-if="prefix">
                <Ti :icon="prefix" size="input-prefix" />
            </span>

            <!-- input -->
            <input :value="localValue" :class="['form-control', utils.on(isFocus, 'has-focus')]" :placeholder="hint"
                :maxlength="255" :required="required" :disabled="disabled || busy" :autofocus="autofocus" name="select"
                autocomplete="off" ref="refSelect" @input="onInput" @focus="onFocus" @blur="onBlur"
                @keypress="onKeyPress">

            <!-- suffixs -->
            <div class="suffixs">
                <span @click="onSuffix">
                    <i class="spinner-border spinner-border-sm" v-if="busy"></i>
                    <Ti :icon="selected ? 'ti-x' : suffix ?? 'ti-chevron-down'" v-else />
                </span>
            </div>

            <!-- options -->
            <div class="options" v-if="isFocus">
                <ul ref="refOption">
                    <li v-for="(option, i) in localOptions" @mousedown="onSelect(option)"
                        :class="{ 'selected': option == selected }">
                        <span>{{ textOption(option) }}</span>
                    </li>
                    <li v-if="localOptions.length == 0" class="text-muted pe-none">Not found.</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { textOption } from '../../scripts/select';
import { utils } from '../../utils';

export default defineComponent({
    emits: ["update:modelValue", "enter", 'change'],

    inheritAttrs: false,
    props: {
        modelValue: {
            default: '',
        },

        label: {
            type: String,
            default: null
        },

        hint: {
            type: String,
            default: null
        },

        disabled: {
            type: Boolean,
            default: false
        },

        required: {
            type: Boolean,
            default: false
        },

        autofocus: {
            type: Boolean,
            default: false,
        },

        busy: {
            type: Boolean,
            default: false,
        },

        prefix: {
            type: String,
            default: null
        },

        suffix: {
            type: String,
            default: null
        },

        options: {
            type: Array<any>,
            default: () => []
        },

        nospace: {
            type: Boolean,
            default: false
        }
    },

    setup(props, { emit }) {
        const instance = getCurrentInstance();
        const localValue = ref(props.modelValue);
        const localOptions = ref(props.options)
        const selected = ref(null);

        const isFocus = ref(false);
        const refSelect = ref(null);
        const refOption = ref(null);

        // methods
        const onInput = (event: any) => {
            localValue.value = event.target.value;

            // do search
            localOptions.value = props.options.filter((o) => {
                return textOption(o).toLowerCase().includes(localValue.value.toLowerCase());
            });

            if (!isFocus.value) {
                isFocus.value = true
            }

        };

        const onFocus = (event: any) => {
            isFocus.value = true;

            // focus to selected option
            setTimeout(() => {
                const selectedElm = document.querySelector(
                    '.select .options li.selected'
                );

                // scroll
                if (selectedElm) {
                    selectedElm.scrollIntoView({ block: "center" });
                }
            }, 1);
        }

        const onBlur = (_: any) => {
            localValue.value = textOption(selected.value)

            setTimeout(() => {
                isFocus.value = false;
                localOptions.value = props.options
            }, 1);
        }

        const onSelect = (option: any) => {
            localValue.value = textOption(option)
            selected.value = option

            // set real value for v-model
            emit("update:modelValue", textOption(option, true));

            // trigger @change event
            emit('change', option);
        }

        const onKeyPress = (event: any) => {
            if (event.keyCode == 13 && instance?.vnode?.props?.onEnter) {
                const options = localOptions.value

                // if enter, get top option
                if (localValue.value != textOption(selected.value) && options.length != 0 && localValue.value != '') {
                    onSelect(options[0])
                    
                    const elm = (refSelect.value as HTMLInputElement)
                    elm.blur()
                }

                emit("enter", localValue.value);
                isFocus.value = false;
            }
        }

        const onSuffix = () => {
            if (!selected.value) {
                const elm = (refSelect.value as HTMLInputElement);
                return elm.focus()
            }

            selected.value = null;
            localValue.value = '';
            emit("update:modelValue", '');
            emit('change', null);
        }

        const initOption = (value: any) => {
            // get option by value
            let option = props.options.find((o) => {
                return `${textOption(o, true)}`.toLowerCase() == `${value}`.toLowerCase();
            });

            selected.value = option;
            localValue.value = option?.label ?? option?.value ?? value;

            emit("update:modelValue", value);
        }

        watch(() => props.modelValue, (value) => {
            initOption(value)

            if (value == '') {
                localValue.value = value
            }
        })

        watch(() => localValue.value, (value) => {
            emit("update:modelValue", value);
        });



        // mounted
        onMounted(() => {
            initOption(localValue.value)
        });

        return {
            utils, localValue, localOptions, selected, isFocus, refSelect, refOption, onInput, onFocus, onBlur, onSelect, onKeyPress, onSuffix, textOption
        }
    }
})
</script>

<style scoped lang="scss">
.select {

    input.has-focus {
        border-radius: 4px 4px 4px 0;
    }

    &.disabled {
        pointer-events: none;

        .suffixs {
            opacity: .6;

            span {
                &.disabled {
                    opacity: 1;
                }
            }
        }
    }

    .suffixs {
        position: absolute;
        right: 5px;
        top: 0;

        span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            padding: 0 7px;
            padding-top: 1px;
            cursor: pointer;
            text-wrap: nowrap;
            user-select: none;

            span {
                font-size: 12.5px;
                letter-spacing: .5px;
            }

            &.disabled {
                pointer-events: none;
                opacity: .6;
            }

            i {
                opacity: .6;
            }

            &:hover {
                i {
                    opacity: 1;
                }
            }

            &:active {
                i {
                    opacity: .6;
                }
            }
        }
    }

    .options {
        position: absolute;
        z-index: 10;
        width: 50%;
        left: 1px;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 250px;
            min-width: 50%;
            max-width: 100%;
            overflow: auto;
            scrollbar-width: thin;
            background-color: white;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 0.5rem 2rem rgba(var(--tblr-body-color-rgb), 0.1);

            li {
                padding: 10px 13px;

                &:hover {
                    cursor: pointer;
                    background-color: #f6f8fb;
                }

                &.selected {
                    background-color: #f6f8fb;
                    font-weight: 500;
                }
            }
        }
    }

    @media only screen and (max-width: 480px) {
        .options {
            width: calc(100% - 37px);
        }
    }
}
</style>