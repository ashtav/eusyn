<template>
  <div :class="['textarea', utils.on(disabled, 'disabled')]">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>
    <div class="input-icon">
      <!-- prefix -->
      <span v-if="prefix" class="input-icon-addon">
        <Icon :icon="prefix" size="input-prefix" />
      </span>

      <!-- input -->
      <textarea :value="localValue" :class="['form-control']" :placeholder="hint" :maxlength="maxLength"
        :required="required" :disabled="disabled" :autofocus="autofocus" name="input" autocomplete="off"
        :style="{ maxHeight: `${maxHeight}px` }" @input="onInput" @focus="onFocus" @blur="onBlur" @keypress="onKeyPress"
        ref="textarea" />

      <!-- suffix -->
      <div v-if="inputSuffixs.length != 0" class="suffix">
        <span v-for="(suffix, i) in inputSuffixs" :key="i"
          :class="['suffix-item', utils.on(suffix.disabled, 'disabled')]" @click="onSuffix(suffix)">

          <!-- if kbd and has text -->
          <kbd v-if="suffix?.kbd && suffix?.text">{{ suffix.text }}</kbd>

          <!-- if text -->
          <span v-else-if="suffix?.text" :class="suffix?.class"> {{ suffix.text }} </span>

          <!-- if icon -->
          <Icon v-else-if="suffix?.icon && !suffix?.text" :icon="suffix?.icon" />

          <span class="tooltip" v-if="suffix.tooltip">{{ suffix.tooltip }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';
import { formatting, handleKeyPress } from '../../scripts/input';

export default defineComponent({
  inheritAttrs: false,
  emits: ['update:modelValue', 'enter', 'suffix', 'focus'],
  props: {
    modelValue: {
      default: '',
      type: String
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

    maxLength: {
      type: Number,
      default: 500
    },

    maxHeight: {
      type: Number,
      default: 150
    },

    prefix: {
      type: String,
      default: null
    },

    suffix: {
      type: Array<any>,
      default: () => []
    },

    formatters: {
      type: String,
      default: '' // "ucwords|ucfirst|lower|upper|trim|numeric|currency|alpha|alphanumeric|date|address|hashtag|decimal"
    }
  },

  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const localValue = ref(props.modelValue)
    const inputSuffixs = ref(props.suffix)
    const textarea = ref(null)

    // methods
    const onInput = (event: any) => {
      localValue.value = event.target.value
    }

    const onSuffix = (data: any) => {
      emit('suffix', data)
    }

    const onKeyPress = (event: any) => {
      handleKeyPress(instance, emit, props, event, localValue.value, props.formatters.split('|'))
    }

    const onFocus = (event: any) => emit('focus', true)
    const onBlur = (event: any) => emit('focus', false)

    // watch

    watch(() => props.suffix, (value) => {
      inputSuffixs.value = value
    }, { immediate: true })

    watch(() => props.modelValue, (value) => {
      localValue.value = value
    })

    watch(() => localValue.value, (value) => {
      formatting(props.formatters.split('|'), emit, value, '', (value: string) => {
        localValue.value = value
        emit('update:modelValue', value)
      })
    })

    // mounted
    onMounted(() => {
      if (props.autofocus) {
        setTimeout(() => {
          (textarea.value as HTMLElement).focus()
        }, 10);
      }
    })

    return {
      utils, localValue, inputSuffixs, textarea, onInput, onSuffix, onKeyPress, onFocus, onBlur
    }
  }
})
</script>

<style lang="scss" scoped>
.textarea {

  textarea {
    background-color: var(--input-bg-color) !important;
    border-color: var(--input-br-color);
    scrollbar-width: thin;
  }

  &.disabled {
    pointer-events: none;

    textarea,
    .suffix {
      opacity: .5;
    }
  }

  .suffix {
    position: absolute;
    right: 5px;
    top: 0;

    span.tooltip {
      position: absolute;
      top: -25px;
      padding: 5px 10px;
      background: var(--tooltip-background);
      color: white;
      border-radius: 4px;
      pointer-events: none;
      transition: .2s ease-in-out;
      opacity: 0;
      font-size: 13px !important;
      z-index: 10;
      text-wrap: nowrap;

      // arrow
      &::after {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid var(--tooltip-background);
      }
    }

    span.suffix-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0 7px;
      padding-bottom: 5px;
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

        span.tooltip {
          opacity: 1;
          top: -35px;
        }
      }

      &:active {
        i {
          opacity: .6;
        }
      }
    }
  }

  .input-icon-addon {
    align-items: unset !important;
    top: 9px
  }
}
</style>