<template>
  <div :class="[{ 'd-inline-block': single }, 'checkbox']">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

    <div v-if="isLoading">
      <label v-for="(_, i) in utils.randInt(2, 5)" :key="i" class="form-check mb-1"
        :class="{ 'form-check-inline': inline }">
        <input class="form-check-input" type="checkbox" disabled>
        <span class="form-check-label" style="margin-top: 3px;">
          <Shimmer :size="[[30, 120]]" />
        </span>
      </label>
    </div>

    <div :class="{ 'd-inline-block': single }" v-else>
      <input v-if="options.length == 0 && !label" class="form-check-input m-0" v-model="localValue" type="checkbox"
        :disabled="disabled" :value="value" @input="onInput($event, value, true)">

      <label v-for="(option, i) in localOptions" v-else :key="i" class="form-check"
        :class="{ 'form-check-inline': inline }">
        <input v-model="localValue" class="form-check-input" type="checkbox" :name="inputName"
          :value="textOption(option, true)"
          :disabled="disabled || ((typeof option == 'object' && option?.disabled) ?? false)"
          :required="Array.isArray(localValue) && localValue.length == 0 && required" @input="onInput($event, option)">
        <span class="form-check-label"
          :class="{ 'text-decoration-line-through': typeof option == 'object' && option?.crossed }"> {{
            capitalize ? changeCase.capital(textOption(option)) : textOption(option)
          }} </span>
      </label>

      <div class="text-secondary mb-2" v-if="options.length == 0 && label">{{ emptyMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import changeCase from '../../plugins/case'
import { utils } from '../../plugins/utils'
import { textOption } from '../../scripts/select'

interface CheckboxOption {
  label?: string
  value?: string | number
  disabled?: boolean
  crossed?: boolean
}

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

    value: {
      type: [String, Number, Boolean],
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
      type: Array<CheckboxOption | string | number>,
      default: () => []
    },

    emptyMessage: {
      type: String,
      default: 'No data available'
    },

    inline: {
      type: Boolean,
      default: true
    },

    min: {
      type: Number,
      default: null
    },

    capitalize: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const localValue = ref(props.modelValue)
    const localOptions = ref(props.options)
    const inputName = ref('checkbox-' + utils.randString(5))
    const single = ref(props.options.length == 0)
    const isLoading = ref(false)

    // methods 
    const onInput = (event: any, option: any, single: boolean = false) => {
      if (props.disabled || (typeof option === 'object' && (option?.disabled ?? false))) return

      if (single && props.value !== null) {
        const value = option
        const values = Array.isArray(localValue.value) ? localValue.value : []

        if (values.includes(value)) {
          localValue.value = values.filter((e) => e !== value)
        } else {
          localValue.value = [...values, value]
        }

        emit('update:modelValue', localValue.value)
        emit('change', localValue.value)
        return
      }

      else if (single && props.value == null) {
        localValue.value = event.target.checked
        emit('update:modelValue', localValue.value)
        emit('change', localValue.value)
        return
      }

      const target = event.target
      const value = textOption(option, true)


      if (Array.isArray(props.modelValue)) {
        const values = localValue.value as Array<any>

        localValue.value = target.checked
          ? [...values, value]
          : values.filter((e) => e !== value)

        if (props.min != null) {
          if (localValue.value.length < props.min && !target.checked) {
            target.checked = true
            localValue.value = [...values]
            return
          }
        }

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
      utils, changeCase, localValue, localOptions, inputName, single, isLoading, setLoading, onInput, textOption
    }
  }
})
</script>