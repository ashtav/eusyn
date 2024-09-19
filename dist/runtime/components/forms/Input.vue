<template>
  <div :class="['input', utils.on(disabled, 'disabled')]">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>
    <div class="input-icon" :class="{ 'mb-3': !nospace }">
      <!-- prefix -->
      <span v-if="prefix" class="input-icon-addon">
        <Ti :icon="prefix" size="input-prefix" />
      </span>

      <!-- date input placeholder -->
      <div v-if="['date'].includes(inputType) && (localValue == '' || localValue == null)"
        :class="['date-input-placeholders', utils.on(prefix != '', 'has-prefix'), utils.on(disabled, 'disabled')]">
        ----/--/--
      </div>

      <!-- input -->
      <input :value="localValue" :type="inputType" :class="['form-control']" :placeholder="hint" :maxlength="maxLength"
        :required="required" :disabled="disabled" :readonly="readonly" :min="minDate" :max="maxDate"
        :autofocus="autofocus" name="input" autocomplete="off" @focus="onFocus" @input="onInput" @keypress="onKeyPress"
        @mousedown="onMouseDown" ref="input">

      <!-- suffixs -->
      <div v-if="inputSuffixs.length != 0 && !['date'].includes(type)" class="suffixs">
        <span v-for="(suffix, i) in inputSuffixs" :key="i" :class="[utils.on(suffix.disabled, 'disabled')]"
          @click="onSuffix(suffix)">

          <!-- if kbd and has text -->
          <kbd v-if="suffix?.kbd && suffix?.text">{{ suffix.text }}</kbd>

          <!-- if text -->
          <span v-else-if="suffix?.text" :class="suffix?.class"> {{ suffix.text }} </span>

          <!-- if icon -->
          <Ti v-else-if="suffix?.icon && !suffix?.text" :icon="suffix?.icon" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
import { formatting, handleKeyPress } from "../../scripts/input";
export default defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue", "enter", "blur", "focus", "suffix"],
  props: {
    modelValue: {
      default: "",
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
    type: {
      type: String,
      default: "text"
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
      default: 255
    },
    prefix: {
      type: String,
      default: null
    },
    suffixs: {
      type: Array,
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
      default: ""
      // "ucwords|ucfirst|lower|upper|trim|numeric|currency|alpha|alphanumeric|date|address|hashtag|decimal"
    },
    nospace: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: null
      // "date:y/m/d"
    }
  },
  setup(props, { emit }) {
    const getType = () => {
      return props.password ? "password" : ["range"].includes(props.type) ? "text" : props.type;
    };
    const instance = getCurrentInstance();
    const input = ref(null);
    const localValue = ref(props.modelValue);
    const inputType = ref(getType());
    const inputSuffixs = ref(props.suffixs);
    const obsecure = ref(true);
    let inputEvent = null;
    const onInput = (event) => {
      localValue.value = event.target.value;
    };
    const moveCursor = () => {
      let value = localValue.value.split("/");
      let joinedValue = value.join("/");
      let firstUnderscoreIndex = joinedValue.indexOf("_");
      if (firstUnderscoreIndex !== -1) {
        setTimeout(() => {
          inputEvent.setSelectionRange(firstUnderscoreIndex, firstUnderscoreIndex);
        }, 1);
      }
    };
    const onMouseDown = (event) => {
      if (props.mask && props.mask.split(":")[0] == "date") {
        moveCursor();
      }
    };
    const onFocus = (event) => {
      inputEvent = event.target;
      emit("focus", event);
      if (props.mask) {
        moveCursor();
      }
    };
    const onSuffix = (data) => {
      if (data?._toggle) {
        const index = inputSuffixs.value.findIndex((e) => e._toggle);
        obsecure.value = !obsecure.value;
        inputSuffixs.value[index] = { icon: obsecure.value ? "ti-eye" : "ti-eye-off", _toggle: true };
      }
      emit("suffix", data);
    };
    const checkPassword = (value) => {
      const suffixs = inputSuffixs.value;
      inputType.value = value ? "password" : props.type;
      obsecure.value = value;
      if (value) {
        const index = suffixs.findIndex((e) => e._toggle);
        if (index == -1) {
          inputSuffixs.value.push({
            icon: "ti-eye",
            _toggle: true
          });
        }
        return;
      }
      inputSuffixs.value = suffixs.filter((e) => !e._toggle);
    };
    const onKeyPress = (event) => {
      handleKeyPress(instance, emit, props, event, localValue.value, props.formatters.split("|"));
    };
    const getDateMaskFormat = () => {
      const masks = props.mask.split(":");
      let format = "y/m/d";
      let value = { y: "____", d: "__", m: "__" };
      if (masks.length > 1) {
        let f = masks[1];
        const hasD = f.includes("d");
        const hasM = f.includes("m");
        const hasY = f.includes("y");
        if (hasD && hasM && hasY) {
          format = masks[1];
        }
      }
      const result = format.split("/").map((e) => value[e]).join("/");
      return result;
    };
    const validateDate = (date, format) => {
      const dateParts = date.split("/");
      const formatParts = format.split("/");
      let day = parseInt(dateParts[formatParts.indexOf("d")], 10);
      let month = parseInt(dateParts[formatParts.indexOf("m")], 10);
      const year = parseInt(dateParts[formatParts.indexOf("y")], 10);
      month = Math.min(Math.max(month, 1), 12);
      const daysInMonth = new Date(year, month, 0).getDate();
      day = Math.min(Math.max(day, 1), daysInMonth);
      const formattedDate = formatParts.map((part) => {
        if (part === "d")
          return day.toString().padStart(2, "0");
        if (part === "m")
          return month.toString().padStart(2, "0");
        if (part === "y")
          return year.toString();
      }).join("/");
      return formattedDate;
    };
    const onMask = () => {
      if (props.mask) {
        const masks = props.mask.split(":");
        if (masks[0] == "date") {
          localValue.value = getDateMaskFormat();
        }
      }
    };
    const doFocus = () => {
      if (input.value) {
        input.value.focus();
      }
    };
    watch(() => props.type, () => {
      inputType.value = getType();
    });
    watch(() => props.password, (value) => {
      checkPassword(value);
    });
    watch(() => props.suffixs, (value) => {
      inputSuffixs.value = value;
      checkPassword(props.password);
    }, { immediate: true });
    watch(() => props.modelValue, (value) => {
      localValue.value = value;
    });
    watch(() => obsecure.value, (value) => {
      inputType.value = value ? "password" : "text";
    });
    watch(() => localValue.value, (value) => {
      if (props.mask) {
        let values = getDateMaskFormat().split("");
        let number = utils.numeric(value).toString();
        let numIndex = 0;
        let cursorPosition = number.length;
        for (let i = 0; i < cursorPosition; i++) {
          if (values[i] === "/") {
            cursorPosition++;
          }
        }
        for (let i = 0; i < values.length && numIndex < number.length; i++) {
          if (values[i] === "_") {
            values[i] = number[numIndex];
            numIndex++;
          }
        }
        localValue.value = values.join("");
        setTimeout(() => {
          inputEvent?.setSelectionRange(cursorPosition, cursorPosition);
        }, 5);
        if (!values.includes("_")) {
          const masks = props.mask.split(":");
          let format = masks.length > 1 ? masks[1] : "y/m/d";
          emit("update:modelValue", validateDate(localValue.value, format));
        }
        return;
      }
      formatting(props.formatters.split("|"), emit, value, props.type, (value2) => {
        emit("update:modelValue", value2);
      });
    });
    watch(() => props.mask, () => onMask());
    watch(() => props.autofocus, () => {
      if (props.autofocus)
        doFocus();
    });
    onMounted(() => {
      checkPassword(props.password);
      onMask();
      inputType.value = getType();
      if (props.autofocus)
        doFocus();
    });
    return {
      utils,
      localValue,
      inputType,
      inputSuffixs,
      input,
      onInput,
      onFocus,
      onMouseDown,
      onSuffix,
      onKeyPress,
      doFocus
    };
  }
});
</script>

<style scoped>
.input.disabled {
  pointer-events: none;
}
.input.disabled .date-input-placeholders {
  background-color: #f6f8fb;
}
.input.disabled .suffixs {
  opacity: 0.6;
}
.input.disabled .suffixs span.disabled {
  opacity: 1;
}
.input .suffixs {
  position: absolute;
  right: 5px;
  top: 0;
}
.input .suffixs span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 7px;
  padding-top: 1px;
  cursor: pointer;
  text-wrap: nowrap;
  user-select: none;
}
.input .suffixs span span {
  font-size: 12.5px;
  letter-spacing: 0.5px;
}
.input .suffixs span.disabled {
  pointer-events: none;
  opacity: 0.6;
}
.input .suffixs span i {
  opacity: 0.6;
}
.input .suffixs span:hover i {
  opacity: 1;
}
.input .suffixs span:active i {
  opacity: 0.6;
}
.input .date-input-placeholders {
  position: absolute;
  left: 12px;
  top: 1px;
  width: 90%;
  background-color: white;
  border-radius: 4px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  padding-left: 3px;
  pointer-events: none;
}
.input .date-input-placeholders.has-prefix {
  left: 40px;
}

[data-bs-theme=dark] .date-input-placeholders {
  background-color: #151f2c;
  color: #999;
}
[data-bs-theme=dark] .input.disabled .date-input-placeholders {
  background-color: #1b293a;
}
</style>