<template>

  <div :class="['input', utils.on(disabled, 'disabled')]">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>
    <div class="input-icon">
      <!-- prefix -->
      <span v-if="prefix" class="input-icon-addon">
        <Icon :icon="prefix" size="input-prefix" />
      </span>

      <!-- date input placeholder -->
      <div v-if="['date'].includes(inputType) && (localValue == '' || localValue == null)"
        :class="['date-input-placeholders', utils.on(!['', null].includes(prefix), 'has-prefix'), utils.on(disabled, 'disabled')]">
        ----/--/--
      </div>

      <!-- input -->
      <input :value="localValue" :type="inputType" :class="['form-control']" :placeholder="hint" :maxlength="maxLength"
        :required="required" :disabled="disabled" :readonly="readonly" :min="minDate" :max="maxDate"
        :autofocus="autofocus" name="input" autocomplete="off" @focus="onFocus" @blur="onBlur" @input="onInput"
        @keypress="onKeyPress" @mousedown="onMouseDown" ref="input" :icon="isTabler ? 'tabler' : 'huge'">

      <!-- suffix -->
      <div v-if="inputSuffix.length != 0 && !['date'].includes(type)" class="suffix">
        <span v-for="(suffix, i) in inputSuffix" :key="i"
          :class="['suffix-item', utils.on(suffix.disabled, 'disabled')]" @click="onSuffix(suffix)">

          <!-- if kbd and has text -->
          <kbd v-if="suffix?.kbd && suffix?.text">{{ suffix.text }}</kbd>

          <!-- if text -->
          <span v-else-if="suffix?.text" :class="suffix?.class"> {{ suffix.text }} </span>

          <!-- if icon -->
          <Icon v-else-if="suffix?.icon && !suffix?.text" :icon="suffix?.icon" />

          <span class="t-tip" v-if="suffix.tooltip">{{ suffix.tooltip }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRuntimeConfig } from '#imports';
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';
import { formatting, handleKeyPress } from '../../scripts/input';

export default defineComponent({
  inheritAttrs: false,
  emits: ['update:modelValue', 'enter', 'focus', 'suffix', 'event'],
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

    type: {
      type: String,
      default: 'text'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
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
      default: null
    },

    prefix: {
      type: String,
      default: null
    },

    suffix: {
      type: Array<any>,
      default: () => []
    },

    password: {
      type: Boolean,
      default: false
    },

    minDate: {
      type: String,
      default: null
    },

    maxDate: {
      type: String,
      default: null
    },

    formatters: {
      type: String,
      default: '' // "ucwords|ucfirst|lower|upper|trim|numeric|currency|alpha|alphanumeric|date|address|hashtag|decimal|phone|email|url"
    },

    mask: {
      type: String,
      default: null // "date:y/m/d"
    }
  },

  setup(props, { emit }) {
    const getType = (): string => {
      return props.password ? 'password' : ['range'].includes(props.type) ? 'text' : props.type
    }

    const config = useRuntimeConfig()
    const icon = config.public.ui?.icon
    const isTabler = icon == 'tabler';

    const eye = isTabler ? 'ti-eye' : 'hgi-view'
    const eyeOff = isTabler ? 'ti-eye-off' : 'hgi-view-off'

    const instance = getCurrentInstance()
    const input = ref(null)

    const localValue = ref(props.modelValue)
    const inputType = ref(getType())
    const inputSuffix = ref(props.suffix)
    const obsecure = ref(true)

    let inputEvent: HTMLInputElement = null

    // methods
    const onInput = (event: any) => {
      localValue.value = event.target.value
    }

    const moveCursor = () => {
      let value = localValue.value.toString().split('/')

      // Flatten the array and join it into a single string
      let joinedValue = value.join('/');

      // Find the index of the first '_'
      let firstUnderscoreIndex = joinedValue.indexOf('_');

      if (firstUnderscoreIndex !== -1) {
        setTimeout(() => {
          inputEvent.setSelectionRange(firstUnderscoreIndex, firstUnderscoreIndex);
        }, 1);
      }
    }

    const onMouseDown = (event: any) => {
      if (props.mask && props.mask.split(':')[0] == 'date') {
        moveCursor()
      }
    }

    const onFocus = (event: any) => {
      inputEvent = event.target as HTMLInputElement;
      emit('focus', true)

      if (props.mask) {
        moveCursor()
      }
    }

    const onBlur = (event: any) => {
      if (!instance || instance.isUnmounted) return
      emit('focus', false)
    }

    const onSuffix = (data: any) => {
      if (data?._toggle) {
        const index = inputSuffix.value.findIndex((e: any) => e._toggle)
        obsecure.value = !obsecure.value

        inputSuffix.value[index] = { icon: obsecure.value ? eye : eyeOff, _toggle: true }
      }

      emit('suffix', data)
    }

    const checkPassword = (value: boolean) => {
      const suffix = inputSuffix.value
      inputType.value = value ? 'password' : props.type
      obsecure.value = value

      if (value) {
        const index = suffix.findIndex((e) => e._toggle)
        if (index == -1) {
          inputSuffix.value.push({
            icon: eye, _toggle: true
          })
        }
        return
      }

      // do remove
      inputSuffix.value = suffix.filter((e: any) => !e._toggle)
    }

    const onKeyPress = (event: any) => {
      handleKeyPress(instance, emit, props, event, localValue.value, props.formatters.split('|'))
    }

    const getDateMaskFormat = (): string => {
      const masks = props.mask.split(':')

      let format = 'y/m/d'
      let value: Record<any, string> = { y: '____', d: '__', m: '__' }

      if (masks.length > 1) {
        let f = masks[1];
        const hasD = f.includes('d');
        const hasM = f.includes('m');
        const hasY = f.includes('y');

        if (hasD && hasM && hasY) {
          format = masks[1]
        }
      }

      const result = format.split('/').map((e) => value[e]).join('/')
      return result
    }

    const validateDate = (date: string, format: string) => {
      const dateParts = date.split('/');
      const formatParts = format.split('/');

      let day = parseInt(dateParts[formatParts.indexOf('d')], 10);
      let month = parseInt(dateParts[formatParts.indexOf('m')], 10);
      const year = parseInt(dateParts[formatParts.indexOf('y')], 10);

      // Clamp month between 1 and 12
      month = Math.min(Math.max(month, 1), 12);

      // Get the maximum day in the month
      const daysInMonth = new Date(year, month, 0).getDate();

      // Clamp day between 1 and the maximum day of the month
      day = Math.min(Math.max(day, 1), daysInMonth);

      // Format the corrected date based on the original format
      const formattedDate = formatParts.map(part => {
        if (part === 'd') return day.toString().padStart(2, '0');
        if (part === 'm') return month.toString().padStart(2, '0');
        if (part === 'y') return year.toString();
      }).join('/');

      return formattedDate;
    };

    // handle mask input
    const onMask = () => {
      if (props.mask) {
        const masks = props.mask.split(':')

        if (masks[0] == 'date') {
          localValue.value = getDateMaskFormat()
        }
      }
    }

    const doFocus = () => {
      if (input.value) {
        setTimeout(() => {
          (input.value as HTMLElement).focus()
        }, 10);
      }
    }

    // watch input type
    watch(() => props.type, () => {
      inputType.value = getType()
    })

    // watch input password
    watch(() => props.password, (value) => {
      checkPassword(value)
    })

    // watch suffix icons
    watch(() => props.suffix, (value) => {
      inputSuffix.value = value
      checkPassword(props.password)
    }, { immediate: true })

    // watch v-model
    watch(() => props.modelValue, (value) => {
      localValue.value = value
    })

    // watch obsecure value
    watch(() => obsecure.value, (value) => {
      inputType.value = value ? 'password' : 'text'
    })

    // watch local value
    watch(() => localValue.value, (value) => {
      if (props.mask) {
        let values = getDateMaskFormat().split('');

        // Assuming utils.numeric(value) extracts only the digits from the input value
        let number = utils.numeric(value.toString()).toString();

        // Track the position in the numeric input
        let numIndex = 0;
        let cursorPosition = number.length;

        for (let i = 0; i < cursorPosition; i++) {
          if (values[i] === '/') {
            cursorPosition++;
          }
        }

        // Replace placeholders in the mask with user input, skipping over '/'
        for (let i = 0; i < values.length && numIndex < number.length; i++) {
          if (values[i] === '_') {
            values[i] = number[numIndex];
            numIndex++;
          }
        }

        localValue.value = values.join('')

        setTimeout(() => {
          inputEvent?.setSelectionRange(cursorPosition, cursorPosition);
        }, 5);

        if (!values.includes('_')) {
          const masks = props.mask.split(':')
          let format = masks.length > 1 ? masks[1] : 'y/m/d'

          emit('update:modelValue', validateDate(localValue.value, format))
        }

        return
      }

      formatting(props.formatters.split('|'), emit, value.toString(), props.type, (value: string) => {
        emit('update:modelValue', value) // this will trigger `watch(() => props.modelValue`
      })
    })

    // watch mask props
    watch(() => props.mask, () => onMask())

    // watch input focus
    watch(() => props.autofocus, () => {
      if (props.autofocus) doFocus()
    })

    // mounted
    onMounted(() => {
      checkPassword(props.password)
      onMask()
      inputType.value = getType()

      if (props.autofocus) doFocus()
    })

    return {
      utils, localValue, inputType, inputSuffix, input, onInput, onFocus, onBlur, onMouseDown, onSuffix, onKeyPress, doFocus, isTabler
    }
  }
})
</script>

<style scoped lang="scss">
.input {

  &.disabled {
    pointer-events: none;

    .date-input-placeholders {
      background-color: #f6f8fb;
    }

    .suffix {
      opacity: .6;

      span.suffix-item {
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

    span.t-tip {
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
      height: 35px;
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

        span.t-tip {
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

  .date-input-placeholders {
    position: absolute;
    left: 12px;
    top: 1px;
    width: calc(100% - 80px);
    background-color: white;
    border-radius: 4px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    padding-left: 3px;
    pointer-events: none;

    &.has-prefix {
      left: 40px;
    }
  }
}

[data-bs-theme=dark] {
  .date-input-placeholders {
    background-color: #151f2c;
    color: #999;
  }

  .input {
    &.disabled {
      .date-input-placeholders {
        background-color: #1b293a;
      }
    }
  }
}
</style>