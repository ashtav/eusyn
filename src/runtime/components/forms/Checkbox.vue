<template>
    <div :class="{ 'mb-3': !nospace }">
        <label :class="['form-label', utils.on(required, 'required')]" v-if="label"> {{ label }} </label>

        <div>
            <label class="form-check form-check-inline" v-if="options.length == 0">
                <input class="form-check-input" type="checkbox" :name="inputName" :value="single" v-model="localValue"
                    :disabled="disabled" />
                <span class="form-check-label" />
            </label>

            <label class="form-check form-check-inline" v-for="(option, i) in localOptions" :key="i" v-else>
                <input class="form-check-input" type="checkbox" :name="inputName" :value="textOption(option, true)"
                    v-model="localValue" :disabled="disabled || (option?.disabled ?? false)" :required="required"
                    @input="onInput($event, option)" />
                <span class="form-check-label"> {{ textOption(option) }} </span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';
import { textOption } from '../../scripts/select';

export default defineComponent({
    emits: ["update:modelValue", 'change'],

    inheritAttrs: false,
    props: {
        modelValue: {
            type: [Array<any>, Boolean],
            default: []
        },

        label: {
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
        const localValue = ref(props.modelValue)
        const localOptions = ref(props.options)
        const inputName = ref('checkbox-' + utils.randString(5))
        const single = ref(false)


        // methods
        const onInput = (event: any, option: any) => {
            if (props.disabled || (typeof option === 'object' && (option?.disabled ?? false))) return;

            const target = event.target;
            const value = textOption(option)

            if (Array.isArray(props.modelValue)) {
                const values = localValue.value as Array<any>

                localValue.value = target.checked
                    ? [...values, value]
                    : values.filter((e) => e !== value);

                emit("update:modelValue", localValue.value);
            }
        };

        const initOption = (value: Array<any>) => {

        }

        watch(() => localValue.value, (value) => {
            if (typeof value === 'boolean') {
                emit("update:modelValue", value)
            }
        })

        watch(() => props.options, (value) => {
           localOptions.value = value
        })

        // mounted
        onMounted(() => {
            // initOption(localValue.value)
        });

        return {
            utils, localValue, localOptions, inputName, single, onInput, textOption
        }
    }
})
</script>