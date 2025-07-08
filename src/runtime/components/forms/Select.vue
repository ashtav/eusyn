<template>
  <div :class="['select', utils.on(disabled || isLoading, 'disabled')]">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>
    <div class="input-icon">
      <!-- prefix -->
      <span v-if="prefix" class="input-icon-addon">
        <Icon :icon="prefix" size="input-prefix" />
      </span>

      <!-- input -->
      <input ref="refSelect" :value="localValue" :class="['form-control', utils.on(isFocus, 'has-focus')]"
        :placeholder="hint" :maxlength="255" :required="required" :disabled="disabled || isLoading"
        :autofocus="autofocus" name="select" autocomplete="off" @input="onInput" @focus="onFocus" @blur="onBlur"
        @keypress="onKeyPress">

      <!-- suffix -->
      <div class="suffix">
        <span @click="onSuffix">
          <i v-if="isLoading" class="spinner-border spinner-border-sm" />
          <Icon v-else :icon="selected ? iconX : suffix ?? iconChevron" />
        </span>
      </div>

      <!-- options -->
      <div v-if="isFocus" class="options">
        <ul ref="refOption">
          <li v-for="(option, i) in localOptions" :key="i" :class="{ 'selected': option == selected }"
            @mousedown="onSelect(option)">
            <span>{{ textOption(option) }}</span>
          </li>
          <li v-if="localOptions.length == 0" class="text-muted pe-none">
            Not found.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRuntimeConfig } from '#imports';
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';
import { textOption } from '../../scripts/select';

export default defineComponent({
  inheritAttrs: false,
  emits: ['update:modelValue', 'enter', 'change', 'focus'],
  props: {
    modelValue: {
      default: '',
      type: [Number, String]
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
      default: false
    },

    busy: {
      type: Boolean,
      default: false
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
    }
  },

  setup(props, { emit, attrs }) {
    const config = useRuntimeConfig()
    const icon = config.public.ui?.icon
    const isTabler = icon == 'tabler';

    const iconX = isTabler ? 'ti-x' : 'hgi-cancel-01';
    const iconChevron = isTabler ? 'ti-chevron-down' : 'hgi-arrow-down-01';

    const instance = getCurrentInstance()
    const localValue = ref(props.modelValue)
    const localOptions = ref(props.options)
    const selected = ref(null)

    const isLoading = ref(props.busy)
    const isFocus = ref(false)
    const refSelect = ref(null)
    const refOption = ref(null)

    // this variable is used for options changes
    const originValue = ref(props.modelValue)

    // methods
    const onInput = (event: any) => {
      localValue.value = event.target.value

      // do search
      localOptions.value = props.options.filter((o) => {
        return textOption(o).toLowerCase().includes(localValue.value.toString().toLowerCase())
      })

      if (!isFocus.value) {
        isFocus.value = true
      }
    }

    const onFocus = (event: any) => {
      isFocus.value = true
      emit('focus', true)

      // focus to selected option
      setTimeout(() => {
        const selectedElm = document.querySelector(
          '.select .options li.selected'
        )

        // scroll
        if (selectedElm) {
          selectedElm.scrollIntoView({ block: 'center' })
        }
      }, 1)
    }

    const onBlur = () => {
      localValue.value = textOption(selected.value)
      emit('focus', false)

      setTimeout(() => {
        isFocus.value = false
        localOptions.value = props.options
      }, 1)
    }

    const onSelect = (option: any) => {
      localValue.value = textOption(option)
      selected.value = option

      // set real value for v-model
      emit('update:modelValue', textOption(option, true))

      // trigger @change event
      emit('change', option)
    }

    const onKeyPress = (event: any) => {
      if (event.keyCode == 13 && instance?.vnode?.props?.onEnter) {
        const options = localOptions.value

        setTimeout(() => {
          if (localValue.value != textOption(selected.value) && options.length != 0 && localValue.value != '') {
            onSelect(options[0])

            const elm = (refSelect.value as HTMLInputElement)
            elm.blur()
          }
        }, 10);

        emit('enter', localValue.value)
        isFocus.value = false
      }
    }

    const onSuffix = () => {
      if (!selected.value) {
        const elm = (refSelect.value as HTMLInputElement)
        return elm.focus()
      }

      selected.value = null
      localValue.value = ''
      emit('update:modelValue', '')
      emit('change', null)
    }

    const initOption = (value: any) => {
      if (props.options.length == 0) {
        emit('update:modelValue', '')
        localValue.value = ''

        return
      }

      // get option by value
      const option = props.options.find((o) => {
        return `${textOption(o, true)}`.toLowerCase() == `${value}`.toLowerCase()
      })

      selected.value = option
      localValue.value = option?.label ?? option?.value ?? value

      // emit('update:modelValue', value)
    }

    const doFocus = () => {
      if (refSelect.value) {
        setTimeout(() => {
          (refSelect.value as HTMLElement).focus()
        }, 10);
      }
    }

    // watch v-model to handle if user change data from input
    watch(() => props.modelValue, (value) => {
      initOption(value)

      if (value == '') {
        localValue.value = value
      }
    })

    // watch(() => localValue.value, (value) => {
    //   emit('update:modelValue', value)
    // })

    watch(() => props.options, (value) => {
      localOptions.value = value
      setTimeout(() => initOption(originValue.value), 0);
    })

    watch(() => props.busy, (value) => {
      isLoading.value = value
    })

    // mounted
    onMounted(() => {
      initOption(localValue.value)

      if (props.autofocus) {
        doFocus()
      }
    })

    const setLoading = (value: boolean) => {
      isLoading.value = value
    }

    return {
      utils, localValue, localOptions, selected, isFocus, refSelect, refOption, isLoading, iconX, iconChevron,
      onInput, onFocus, onBlur, onSelect, onKeyPress, onSuffix, textOption, doFocus, setLoading
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

    .suffix {
      opacity: .6;

      span {
        &.disabled {
          opacity: 1;
        }
      }
    }
  }

  .suffix {
    position: absolute;
    right: 5px;
    top: 0;

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 34px;
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

[data-bs-theme=dark] {

  .options {
    ul {
      background-color: #151f2c;
      box-shadow: 0 0.5rem 2rem #101822;
      color: #cacaca;

      li {
        padding: 10px 13px;

        &:hover {
          background-color: #1f2d3d;
        }

        &.selected {
          background-color: #1f2d3d;
          color: white;
        }
      }
    }
  }
}
</style>