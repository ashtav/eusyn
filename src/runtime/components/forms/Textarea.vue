<template>
    <div :class="['select', utils.on(disabled || busy, 'disabled')]">
        <label :class="['form-label', utils.on(required, 'required')]" v-if="label"> {{ label }} </label>
        <div class="input-icon" :class="{ 'mb-3': !nospace }">

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
            utils, localValue
        }
    }
})
</script>