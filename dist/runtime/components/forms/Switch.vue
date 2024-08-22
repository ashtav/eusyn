<template>
    <div :class="{ 'mb-3': !nospace, 'd-inline-block': inline }">
        <label :class="['form-label']" v-if="label"> {{ label }} </label>

        <div :class="{ 'd-inline-block': inline }">
            <label class="form-check form-switch d-inline-block m-0">
                <input class="form-check-input" type="checkbox" :name="inputName" v-model="localValue"
                    :disabled="disabled">
                <span class="form-check-label"> &nbsp; {{ textCaption }}</span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';

export default defineComponent({
    emits: ["update:modelValue", 'change'],

    inheritAttrs: false,
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },

        label: {
            type: String,
            default: null
        },

        caption: {
            type: String,
            default: null
        },

        disabled: {
            type: Boolean,
            default: false
        },

        nospace: {
            type: Boolean,
            default: false
        },

        inline: {
            type: Boolean,
            default: false
        },
    },

    setup(props, { emit }) {
        const localValue = ref(props.modelValue)
        const inputName = ref('switch-' + utils.randString(5))
        const textCaption = ref('')

        let captions = <Array<string>>[]

        const generateCaptions = () => {
            if (props.caption) {
                const splitted = props.caption.split('|')

                if (splitted.length == 2) {
                    captions = [splitted[0], splitted[1]]
                } else {
                    captions = [splitted[0], splitted[0]]
                }

                textCaption.value = captions[localValue.value ? 1 : 0]
            }
        }

        watch(() => localValue.value, (value) => {
            emit("update:modelValue", value)
            emit('change', value)
        })

        watch(() => props.modelValue, (value) => {
            localValue.value = value
            textCaption.value = captions[value ? 1 : 0]
        })

        watch(() => props.caption, (_) => {
            generateCaptions()
        })

        onMounted(() => {
            generateCaptions()
        })

        return {
            utils, localValue, inputName, textCaption
        }
    }
})
</script>