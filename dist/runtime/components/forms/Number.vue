<template>
    <div :class="['number', utils.on(disabled, 'disabled')]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div class="w-100">
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                <input class="form-control" :value="localValue" @input="onInput" @keypress="onPress"
                    @change="onChange" />
            </div>

            <div class="controls">
                <span v-for="(icon, i) in ['hgi-minus-sign', 'hgi-plus-sign']" @click="onControl(i)">
                    <Icon :icon="icon" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import "../../assets/styles/scss/number.scss";
import { ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default {
  name: "Number",
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const value = parseInt(props.modelValue.toString()) || 0;
    const localValue = ref(value);
    watch(() => props.modelValue, (value2) => {
      localValue.value = parseInt(value2.toString()) || 0;
    });
    const onControl = (i) => {
      if (props.disabled || props.readonly)
        return;
      localValue.value = i === 0 ? Math.max((localValue.value || 0) - 1, props.min ?? 0) : Math.min((localValue.value || 0) + 1, props.max ?? Number.MAX_SAFE_INTEGER);
      emit("update:modelValue", localValue.value.toString());
    };
    const onInput = (e) => {
      if (props.disabled || props.readonly)
        return;
      const raw = e.target.innerText || e.target.value || "";
      const cleaned = raw.replace(/[^0-9-]/g, "");
      const min = props.min ?? 0;
      const max = props.max ?? Number.MAX_SAFE_INTEGER;
      let parsed = parseInt(cleaned, 10);
      if (isNaN(parsed)) {
        return;
      }
      parsed = Math.min(Math.max(parsed, min), max);
      localValue.value = parsed;
      if (e.target.isContentEditable) {
        e.target.innerText = parsed.toString();
      } else {
        e.target.value = parsed.toString();
      }
      emit("update:modelValue", parsed.toString());
    };
    const onPress = (e) => {
      const key = e.key;
      const value2 = e.target.value;
      const min = props.min ?? 0;
      if (key === "Backspace" || key === "Delete" || key === "Tab" || key === "ArrowLeft" || key === "ArrowRight" || key === "Home" || key === "End") {
        return;
      }
      if (key === "-") {
        if (value2.length !== 0 || value2.includes("-") || min == 0) {
          e.preventDefault();
        }
        return;
      }
      if (key === "0" && value2 === "0") {
        e.preventDefault();
        return;
      }
      if (key === "0" && /^-?0$/.test(value2)) {
        e.preventDefault();
        return;
      }
      if (/^0\d/.test(value2 + key) || /^-0\d/.test(value2 + key)) {
        e.preventDefault();
        return;
      }
      if (!/^[0-9]$/.test(key)) {
        e.preventDefault();
      }
    };
    const onChange = (e) => {
      const value2 = e.target.value;
      if (value2.trim() == "" || value2.trim() == "-") {
        e.target.value = 0;
        localValue.value = 0;
        emit("update:modelValue", 0);
      }
    };
    const onWheel = (e) => {
      e.preventDefault();
      onControl(e.deltaY < 0 ? 1 : 0);
    };
    return { utils, localValue, onControl, onWheel, onInput, onPress, onChange };
  },
  props: {
    modelValue: {
      default: "",
      type: [String, Number]
    },
    label: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
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
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    }
  }
};
</script>