<template>
  <div :class="[{ 'mb-3': !nospace, 'd-inline-block': single }, 'checkbox']">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

    <div v-if="isLoading">
      <label v-for="(_, i) in utils.randInt(2, 5)" :key="i" class="form-check form-check-inline mb-1">
        <input class="form-check-input" type="checkbox" disabled>
        <span class="form-check-label" style="margin-top: 3px;"> <Shimmer :size="[[30, 120]]" /> </span>
      </label>
    </div>

    <div :class="{ 'd-inline-block': single }" v-else>
      <label v-if="options.length == 0" class="form-check form-check-inline m-0">
        <input
          v-model="localValue"
          class="form-check-input"
          type="checkbox"
          :name="inputName"
          :disabled="disabled"
        >
        <span class="form-check-label" v-text="'&nbsp;'" />
      </label>

      <label v-for="(option, i) in localOptions" v-else :key="i" class="form-check form-check-inline">
        <input
          v-model="localValue"
          class="form-check-input"
          type="checkbox"
          :name="inputName"
          :value="textOption(option, true)"
          :disabled="disabled || (option?.disabled ?? false)"
          :required="required"
          @input="onInput($event, option)"
        >
        <span class="form-check-label"> {{ textOption(option) }} </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { utils } from '../../plugins/utils'
import { textOption } from '../../scripts/select'

export default defineComponent({

  inheritAttrs: false,
  emits: ['update:modelValue', 'change'],
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

  setup (props, { emit }) {
    const localValue = ref(props.modelValue)
    const localOptions = ref(props.options)
    const inputName = ref('checkbox-' + utils.randString(5))
    const single = ref(props.options.length == 0)
    const isLoading = ref(false)

    // methods 
    const onInput = (event: any, option: any) => {
      if (props.disabled || (typeof option === 'object' && (option?.disabled ?? false))) return

      const target = event.target
      const value = textOption(option, true)


      if (Array.isArray(props.modelValue)) {
        const values = localValue.value as Array<any>

        localValue.value = target.checked
          ? [...values, value]
          : values.filter((e) => e !== value)

        emit('update:modelValue', localValue.value)
      }
    }

    const setLoading = (loading: boolean) => {
      isLoading.value = loading
    }

    watch(() => localValue.value, (value) => {
      if (typeof value === 'boolean') {
        emit('update:modelValue', value)
      }
    })

    watch(() => props.modelValue, (value) => {
      localValue.value = value
    })

    watch(() => props.options, (value) => {
      localOptions.value = value
    })

    return {
      utils, localValue, localOptions, inputName, single, isLoading, setLoading, onInput, textOption
    }
  }
})
</script>