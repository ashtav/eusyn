<template>
    <div :class="{ 'mb-3': !nospace }">
        <label :class="['form-label', utils.on(required, 'required')]" v-if="label"> {{ label }} </label>

        <div>
            <label class="form-check form-check-inline" v-for="(option, i) in localOptions" :key="i">
                <input class="form-check-input" type="checkbox" :name="inputName" :value="textOption(option, true)"
                    v-model="localValue" :disabled="disabled || (option?.disabled ?? false)"
                    :required="required && localValue.length == 0" @input="onInput($event, option)" />
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
            type: Array<any>,
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
        const selected = ref(null)

        const inputName = ref('checkbox-' + utils.randString(5))


        // methods
        const onInput = (event: any, option: any) => {
            if (props.disabled || (typeof option === 'object' && (option?.disabled ?? false))) return;

            const target = event.target;
            const value = textOption(option)

            console.log(target.checked)

            localValue.value = target.checked
                ? [...localValue.value, value]
                : localValue.value.filter((e) => e !== value);

            emit("update:modelValue", localValue.value);
        };

        const initOption = (value: Array<any>) => {

            if (props.options.length == 0) {
                localOptions.value.push({ label: '', value: value.length == 0 ? false : value[0] })
            }


            // // get option by value
            // let option = props.options.find((o) => {
            //     return textOption(o, true).toLowerCase() == `${value}`.toLowerCase();
            // });

            // selected.value = option;
            // localValue.value = option?.label ?? option?.value ?? value;

            // emit("update:modelValue", value);
        }

        watch(() => props.modelValue, (value) => {

        })

        // watch(() => localValue.value, (value) => {
        //     // emit("update:modelValue", value);
        //     console.log(value, props.options.length)

        //     // if (props.options.length == 0) {


        //     //     localValue.value = [value]
        //     //     emit("update:modelValue", localValue.value);
        //     // }
        // });



        // mounted
        onMounted(() => {
            initOption(localValue.value)
        });

        return {
            utils, localValue, localOptions, selected, inputName, onInput, textOption
        }
    }
})
</script>