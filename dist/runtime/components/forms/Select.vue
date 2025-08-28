<template>
  <div :class="['select', utils.on(disabled || isLoading, 'disabled')]">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>
    <div class="input-icon">
      <!-- prefix -->
      <span v-if="prefix" class="input-icon-addon">
        <Icon :icon="prefix" size="input-prefix" />
      </span>

      <!-- input -->
      <input ref="refSelect" :value="labelInput" :class="['form-control', utils.on(isFocus, 'has-focus')]"
        :placeholder="hint" :maxlength="255" :required="required" :disabled="disabled || isLoading"
        :autofocus="autofocus" name="select" autocomplete="off" @input="onInput" @focus="onFocus" @blur="onBlur"
        @keypress="onKeyPress">

      <!-- suffix -->
      <div class="suffix">
        <span v-if="values.length > 0" @click="onClean" tooltip="Clear">
          <Icon icon="delete-02" />
        </span>

        <span @click="onSuffix">
          <i v-if="isLoading" class="spinner-border spinner-border-sm" />
          <Icon v-else :icon="selected ? 'hgi-cancel-01' : suffix ?? 'hgi-arrow-down-01'" />
        </span>
      </div>

      <!-- options -->
      <div v-if="isFocus" class="options">
        <ul ref="refOption">
          <li v-for="(option, i) in localOptions" :key="i"
            :class="{ 'selected': option == selected, 'hovered': indexToSelect == i }" @mousedown="onSelect(option)">
            <span>{{ textOption(option) }}</span>
          </li>
          <li v-if="localOptions.length == 0" class="text-muted pe-none">
            Not found.
          </li>
        </ul>
      </div>
    </div>

    <ul v-if="multiple" class="multiple">
      <li v-for="(value, i) in values" :key="i">
        <span class="me-2">{{ textOption(value) }}</span>
        <Icon icon="cancel-01 fix" @click="removeItem(i)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
import { textOption } from "../../scripts/select";
export default defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue", "enter", "change", "focus"],
  props: {
    modelValue: {
      default: "",
      type: [Number, String, Array]
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
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    duplicate: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, attrs }) {
    const instance = getCurrentInstance();
    const labelInput = ref(props.multiple ? "" : props.modelValue);
    const localOptions = ref(props.options);
    const selected = ref(null);
    const isLoading = ref(false);
    const isFocus = ref(false);
    const refSelect = ref(null);
    const refOption = ref(null);
    const indexToSelect = ref(-1);
    const values = ref(Array.isArray(props.modelValue) ? props.modelValue : []);
    const focusToSelected = async (index) => {
      await nextTick();
      const el = index != null ? refOption.value?.querySelectorAll("li")[index] : refOption.value?.querySelector("li.selected");
      if (el && refOption.value) {
        refOption.value.scrollTop = el.offsetTop - refOption.value.clientHeight / 2 + el.clientHeight / 2;
      }
    };
    const onInput = (e) => {
      labelInput.value = e.target.value.toLowerCase();
      localOptions.value = props.options.filter((o) => {
        const match = textOption(o).toLowerCase().includes(labelInput.value);
        return props.multiple ? match && !values.value.map((e2) => textOption(e2, true)).includes(textOption(o, true)) : match;
      });
      isFocus.value ||= true;
    };
    const onFocus = (event) => {
      isFocus.value = true;
      emit("focus", true);
      focusToSelected();
      const index = props.options.findIndex((o) => o === selected.value);
      indexToSelect.value = index === -1 ? -1 : index;
      if (props.multiple && !props.duplicate) {
        localOptions.value = props.options.filter((o) => {
          return !values.value.map((e) => textOption(e, true)).includes(textOption(o, true));
        });
      }
    };
    const onBlur = () => {
      labelInput.value = textOption(selected.value);
      emit("focus", false);
      setTimeout(() => {
        isFocus.value = false;
        indexToSelect.value = -1;
        if (!props.multiple) {
          localOptions.value = props.options;
        }
      }, 1);
    };
    const onSelect = (option) => {
      if (props.multiple) {
        if (values.value.findIndex((e) => e == option) == -1 || props.duplicate) {
          values.value.push(option);
          emit("update:modelValue", values.value.map((e) => textOption(e, true)));
          emit("change", values.value);
        }
        return;
      }
      labelInput.value = textOption(option);
      selected.value = option;
      emit("update:modelValue", textOption(option, true));
      emit("change", option);
    };
    const removeItem = (index) => {
      values.value.splice(index, 1);
      emit("update:modelValue", values.value.map((e) => textOption(e, true)));
      emit("change", values.value);
    };
    const onClean = () => {
      values.value = [];
      emit("update:modelValue", values.value);
      emit("change", values.value);
    };
    const onKeyPress = (event) => {
      if (event.keyCode == 13 && instance?.vnode?.props?.onEnter) {
        const options = localOptions.value;
        setTimeout(() => {
          if (labelInput.value != textOption(selected.value) && options.length != 0 && labelInput.value != "") {
            onSelect(options[0]);
            const elm = refSelect.value;
            elm.blur();
          }
        }, 10);
        emit("enter", labelInput.value);
        isFocus.value = false;
      }
    };
    const onSuffix = () => {
      if (!selected.value) {
        const elm = refSelect.value;
        return elm.focus();
      }
      selected.value = null;
      labelInput.value = "";
      emit("update:modelValue", "");
      emit("change", null);
    };
    const initValue = () => {
      setTimeout(() => {
        if (props.multiple && Array.isArray(props.modelValue)) {
          const data = props.modelValue;
          const isOptionArrObject = Array.isArray(props.options) && props.options.length > 0 && props.options.every((item) => typeof item === "object" && item !== null);
          if (isOptionArrObject) {
            values.value = props.modelValue.map((item) => {
              const option2 = props.options.find((o) => o.value === item);
              return option2 ? option2 : item;
            });
            return;
          }
          if (Array.isArray(data) && data.every((item) => typeof item === "number" && !isNaN(item))) {
            values.value = props.modelValue.map((e) => e.toString());
            return;
          }
          values.value = props.modelValue;
          return;
        }
        const value = props.modelValue;
        const option = props.options.find((o) => {
          return `${textOption(o, true)}`.toLowerCase() == `${value}`.toLowerCase();
        });
        if (option) {
          selected.value = option;
          labelInput.value = textOption(option);
          return;
        }
        selected.value = null;
        labelInput.value = "";
      }, 10);
    };
    const doFocus = () => {
      if (props.autofocus && refSelect.value) {
        setTimeout(() => {
          refSelect.value.focus();
        }, 10);
      }
    };
    watch(() => props.modelValue, (value) => {
      initValue();
    });
    watch(() => props.options, (value) => {
      localOptions.value = value;
      initValue();
    });
    onMounted(() => {
      initValue();
      doFocus();
      document.addEventListener("keydown", (e) => {
        if (!isFocus.value)
          return;
        const options = localOptions.value;
        if (!options.length)
          return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          indexToSelect.value = e.key === "ArrowDown" ? indexToSelect.value + 1 >= options.length ? 0 : indexToSelect.value + 1 : indexToSelect.value - 1 < 0 ? options.length - 1 : indexToSelect.value - 1;
          focusToSelected(indexToSelect.value);
        }
        if (e.key === "Enter" && indexToSelect.value >= 0) {
          if (indexToSelect.value != -1) {
            onSelect(options[indexToSelect.value]);
          }
          onBlur();
          refSelect.value.blur();
        }
      });
    });
    const setLoading = (value) => {
      isLoading.value = value;
    };
    return {
      utils,
      labelInput,
      localOptions,
      selected,
      isFocus,
      refSelect,
      refOption,
      isLoading,
      values,
      indexToSelect,
      onInput,
      onFocus,
      onBlur,
      onSelect,
      onKeyPress,
      onSuffix,
      textOption,
      doFocus,
      setLoading,
      removeItem,
      onClean
    };
  }
});
</script>

<style scoped>
.select input.has-focus {
  border-radius: 4px 4px 4px 0;
}
.select.disabled {
  pointer-events: none;
}
.select.disabled .suffix {
  opacity: 0.6;
}
.select.disabled .suffix span.disabled {
  opacity: 1;
}
.select .suffix {
  position: absolute;
  right: 5px;
  top: 0;
}
.select .suffix span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 7px;
  padding-top: 1px;
  cursor: pointer;
  text-wrap: nowrap;
  user-select: none;
}
.select .suffix span span {
  font-size: 12.5px;
  letter-spacing: 0.5px;
}
.select .suffix span.disabled {
  pointer-events: none;
  opacity: 0.6;
}
.select .suffix span i {
  opacity: 0.6;
}
.select .suffix span:hover i {
  opacity: 1;
}
.select .suffix span:active i {
  opacity: 0.6;
}
.select .options {
  position: absolute;
  z-index: 10;
  width: 50%;
  left: 1px;
}
.select .options ul {
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
}
.select .options ul li {
  padding: 10px 13px;
  display: flex;
  align-items: center;
}
.select .options ul li:hover {
  cursor: pointer;
  background-color: #f6f8fb;
}
.select .options ul li.selected {
  background-color: #f6f8fb;
  font-weight: 500;
}
.select .options ul li.hovered {
  background-color: #f6f8fb;
}
@media only screen and (max-width: 480px) {
  .select .options {
    width: calc(100% - 37px);
  }
}
.select .multiple {
  padding: 0;
  margin-top: 5px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}
.select .multiple li {
  display: inline-block;
  padding: 2px 12px;
  padding-right: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--background-color);
}
.select .multiple li i {
  font-size: 14px;
  cursor: pointer;
}
.select .multiple li i:hover {
  opacity: 0.7;
}

[data-bs-theme=dark] .options ul {
  background-color: #151f2c;
  box-shadow: 0 0.5rem 2rem #101822;
  color: #cacaca;
}
[data-bs-theme=dark] .options ul li {
  padding: 10px 13px;
}
[data-bs-theme=dark] .options ul li:hover {
  background-color: #1f2d3d;
}
[data-bs-theme=dark] .options ul li.selected {
  background-color: #1f2d3d;
  color: white;
}
[data-bs-theme=dark] .options ul li.hovered {
  background-color: #1f2d3d;
}
</style>