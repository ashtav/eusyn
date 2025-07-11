<template>
    <input :value="localValue" :type="inputType" :placeholder="hint" :maxlength="maxLength" :required="required"
        :disabled="disabled" :readonly="readonly" :min="minDate" :max="maxDate" :autofocus="autofocus" name="input"
        autocomplete="off" @focus="onFocus" @blur="onBlur" @input="onInput" @keypress="onKeyPress"
        @mousedown="onMouseDown" ref="input">
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
import { formatting, handleKeyPress } from "../../scripts/input";
export default defineComponent({
  emits: ["update:modelValue", "enter", "focus", "suffix"],
  props: {
    modelValue: {
      default: "",
      type: [Number, String]
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
    mask: {
      type: String,
      default: null
      // "date:y/m/d"
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const input = ref(null);
    const localValue = ref(props.modelValue);
    const inputType = ref(props.type);
    const obsecure = ref(true);
    let inputEvent = null;
    const onInput = (event) => {
      localValue.value = event.target.value;
    };
    const moveCursor = () => {
      let value = localValue.value.toString().split("/");
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
      emit("focus", true);
      if (props.mask) {
        moveCursor();
      }
    };
    const onBlur = (event) => emit("focus", false);
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
      inputType.value = props.type;
    });
    watch(() => props.modelValue, (value) => {
      localValue.value = value;
    });
    watch(() => obsecure.value, (value) => {
      inputType.value = value ? "password" : "text";
    });
    watch(() => localValue.value, (value) => {
      if (props.mask) {
        let values = getDateMaskFormat().split("");
        let number = utils.numeric(value.toString()).toString();
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
      formatting(props.formatters.split("|"), emit, value.toString(), props.type, (value2) => {
        emit("update:modelValue", value2);
      });
    });
    watch(() => props.mask, () => onMask());
    watch(() => props.autofocus, () => {
      if (props.autofocus)
        doFocus();
    });
    onMounted(() => {
      onMask();
      inputType.value = props.type;
      if (props.autofocus)
        doFocus();
    });
    return {
      utils,
      localValue,
      inputType,
      input,
      onInput,
      onFocus,
      onBlur,
      onMouseDown,
      onKeyPress,
      doFocus
    };
  }
});
</script>

<style scoped lang="scss"></style>