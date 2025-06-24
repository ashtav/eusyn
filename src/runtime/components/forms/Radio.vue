<template>
  <div :class="[{ 'mb-3': !nospace }, 'radio']">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

    <div v-if="isLoading">
      <label v-for="(_, i) in utils.randInt(2, 5)" :key="i" class="form-check form-check-inline mb-1">
        <input class="form-check-input" type="radio" disabled>
        <span class="form-check-label" style="margin-top: 3px;"> <Shimmer :size="[[30, 120]]" /> </span>
      </label>
    </div>

    <div v-else>
      <label v-for="(option, i) in options" :key="i" class="form-check form-check-inline">
        <input v-model="localValue" class="form-check-input" type="radio" :name="inputName"
          :value="textOption(option, true)" :disabled="disabled || (option?.disabled ?? false)" :required="required"
          @input="onInput(option)">
        <span class="form-check-label"> {{ textOption(option) }} </span>
      </label>

      <div class="text-secondary mb-2" v-if="options.length == 0">{{ emptyMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">

// description:
// This component renders a group of radio buttons with customizable options and behavior.

// It provides the following features:
// - Displays an optional label above the radio button group if the `label` prop is provided. The label is also marked as required if the `required` prop is true.
// - Renders each radio button from the `options` prop, where each option can optionally have a `disabled` property.
// - Handles radio button selection with v-model, emitting the selected value through the `update:modelValue` event and the selected option through the `change` event.
// - Validates the `options` prop on component mount to ensure it follows the expected format.
// - The `nospace` prop controls the bottom margin of the container to adjust spacing if needed.
// - Radio buttons can be disabled globally using the `disabled` prop or individually based on the `disabled` property within each option.

// Rules for the `options` prop:
// - Each item in the `options` array should be an object or string. Typically, each object should include a `label` property and optionally a `value` property.
// - Ensure that the `value` properties, if used, are unique within the `options` array to avoid conflicts.
// - The `textOption` function is used to format and display the text of each option.
// - If an option has a `disabled` property, it will override the global `disabled` prop for that specific radio button.

import { defineComponent, onMounted, ref, watch } from 'vue'
import { utils } from '../../plugins/utils'
import { hasValueProperty, textOption, validateOptions } from '../../scripts/select'

export default defineComponent({

  inheritAttrs: false,
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      default: ''
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
    },

    emptyMessage: {
      type: String,
      default: 'No data available'
    }
  },

  setup(props, { emit }) {
    const localValue = ref(props.modelValue)
    const inputName = ref('radio-' + utils.randString(5))
    const isLoading = ref(false)

    // methods
    const onInput = (option: any) => {
      localValue.value = textOption(option, hasValueProperty(props.options))
      emit('update:modelValue', localValue.value)
      emit('change', option)
    }

    watch(() => props.modelValue, (value) => {
      const hasValue = hasValueProperty(props.options)

      // get option by value
      const option = props.options.find((o) => {
        const text = textOption(o, hasValue)
        const isString = typeof text === 'string'

        return (isString ? text.toLowerCase() : text) == `${value}`.toLowerCase()
      })

      localValue.value = textOption(option, hasValue)
      emit('update:modelValue', value)
    })

    const setLoading = (loading: boolean) => {
      isLoading.value = loading
    }

    // mounted
    onMounted(() => {
      validateOptions(props.options)
    })

    return {
      utils, localValue, inputName, isLoading, setLoading, onInput, textOption
    }
  }
})
</script>