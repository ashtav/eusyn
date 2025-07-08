<template>
  <div :class="['input', utils.on(disabled, 'disabled')]">
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
        <span v-for="(suffix, i) in inputSuffixs" :key="i" :class="[utils.on(suffix.disabled, 'disabled')]"
          @click="onSuffix(suffix)">

          <!-- if kbd and has text -->
          <kbd v-if="suffix?.kbd && suffix?.text">{{ suffix.text }}</kbd>

          <!-- if text -->
          <span v-else-if="suffix?.text" :class="suffix?.class"> {{ suffix.text }} </span>

          <!-- if icon -->
          <Icon v-else-if="suffix?.icon && !suffix?.text" :icon="suffix?.icon" />
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
  emits: ["update:modelValue", "enter", "suffix", "focus"],
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
      type: Array,
      default: () => []
    },
    formatters: {
      type: String,
      default: ""
      // "ucwords|ucfirst|lower|upper|trim|numeric|currency|alpha|alphanumeric|date|address|hashtag|decimal"
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const localValue = ref(props.modelValue);
    const inputSuffixs = ref(props.suffix);
    const textarea = ref(null);
    const onInput = (event) => {
      localValue.value = event.target.value;
    };
    const onSuffix = (data) => {
      emit("suffix", data);
    };
    const onKeyPress = (event) => {
      handleKeyPress(instance, emit, props, event, localValue.value, props.formatters.split("|"));
    };
    const onFocus = (event) => emit("focus", true);
    const onBlur = (event) => emit("focus", false);
    watch(() => props.suffix, (value) => {
      inputSuffixs.value = value;
    }, { immediate: true });
    watch(() => props.modelValue, (value) => {
      localValue.value = value;
    });
    watch(() => localValue.value, (value) => {
      formatting(props.formatters.split("|"), emit, value, "", (value2) => {
        localValue.value = value2;
        emit("update:modelValue", value2);
      });
    });
    onMounted(() => {
      if (props.autofocus) {
        setTimeout(() => {
          textarea.value.focus();
        }, 10);
      }
    });
    return {
      utils,
      localValue,
      inputSuffixs,
      textarea,
      onInput,
      onSuffix,
      onKeyPress,
      onFocus,
      onBlur
    };
  }
});
</script>

<style scoped>
.input.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.input.disabled textarea {
  border-color: #d1d1d1;
}
.input.disabled .date-input-placeholders {
  background-color: #f6f8fb;
}
.input.disabled .suffix {
  opacity: 0.6;
}
.input.disabled .suffix span.disabled {
  opacity: 1;
}
.input .suffix {
  position: absolute;
  right: 5px;
  top: 0;
}
.input .suffix span {
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
.input .suffix span span {
  font-size: 12.5px;
  letter-spacing: 0.5px;
}
.input .suffix span.disabled {
  pointer-events: none;
  opacity: 0.6;
}
.input .suffix span i {
  opacity: 0.6;
}
.input .suffix span:hover i {
  opacity: 1;
}
.input .suffix span:active i {
  opacity: 0.6;
}
.input textarea {
  scrollbar-width: thin;
}
.input .input-icon-addon {
  align-items: unset !important;
  top: 9px;
}

[data-bs-theme=dark] textarea {
  background-color: var(--input-background);
  border-color: var(--tblr-border-color);
}
[data-bs-theme=dark] textarea .controls span {
  border-color: #1f2e41;
}
[data-bs-theme=dark] .input.disabled textarea {
  border-color: var(--tblr-border-color);
}
</style>