<template>
  <div :class="['input', utils.on(disabled, 'disabled')]">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>
    <div class="input-icon" :class="{ 'mb-3': !nospace }">
      <!-- prefix -->
      <span v-if="prefix" class="input-icon-addon">
        <Ti :icon="prefix" size="input-prefix" />
      </span>

      <!-- date input placeholder -->
      <div
        v-if="['date'].includes(inputType) && (localValue == '' || localValue == null)"
        :class="['date-input-placeholders', utils.on(prefix != '', 'has-prefix'), utils.on(disabled, 'disabled')]"
      >
        ----/--/--
      </div>

      <!-- input -->
      <input
        :value="localValue"
        :type="inputType"
        :class="['form-control']"
        :placeholder="hint"
        :maxlength="maxLength"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :min="minDate"
        :max="maxDate"
        :autofocus="autofocus"
        name="input"
        autocomplete="off"
        @input="onInput"
        @keypress="onKeyPress"
      >

      <!-- suffixs -->
      <div v-if="inputSuffixs.length != 0 && !['date'].includes(type)" class="suffixs">
        <span
          v-for="(suffix, i) in inputSuffixs" :key="i"
          :class="[utils.on(suffix.disabled, 'disabled')]"
          @click="onSuffix(suffix)"
        >

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
  emits: ["update:modelValue", "enter", "blur", "suffix"],
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
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const localValue = ref(props.modelValue);
    const inputType = ref(props.type);
    const inputSuffixs = ref(props.suffixs);
    const obsecure = ref(true);
    const onInput = (event) => {
      localValue.value = event.target.value;
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
    watch(() => props.type, (value) => {
      inputType.value = value;
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
      formatting(props.formatters.split("|"), emit, value, props.type, (value2) => {
        emit("update:modelValue", value2);
      });
    });
    onMounted(() => {
      checkPassword(props.password);
    });
    return {
      utils,
      localValue,
      inputType,
      inputSuffixs,
      onInput,
      onSuffix,
      onKeyPress
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
</style>