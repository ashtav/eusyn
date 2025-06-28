<template>
    <div :class="['number', utils.on(disabled, 'disabled')]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div>
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                {{ localValue }}
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
      localValue.value = i === 0 ? Math.max((localValue.value || 0) - 1, props.min || 0) : Math.min((localValue.value || 0) + 1, props.max || Number.MAX_SAFE_INTEGER);
      emit("update:modelValue", localValue.value.toString());
    };
    const onWheel = (e) => {
      e.preventDefault();
      onControl(e.deltaY < 0 ? 1 : 0);
    };
    return { utils, localValue, onControl, onWheel };
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

<style scoped>
.number.disabled {
  pointer-events: none;
}
.number.disabled .input-group,
.number.disabled div {
  background-color: transparent;
  opacity: 0.5;
  border-color: #d1d1d1;
}
.number.disabled .controls {
  opacity: 0.5;
}
.number .input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
  padding-right: 0;
  background-color: #fff;
  border-radius: var(--tblr-border-radius-md);
  border: 1px var(--tblr-border-color) solid;
  height: 36px;
}
.number .input-group div {
  display: flex;
  align-items: center;
}
.number .input-group .controls span {
  padding: 0.55rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.number .input-group .controls span:not(:first-child) {
  border-left: 1px solid #dadfe5;
}
.number .input-group .controls span:hover {
  opacity: 0.7;
}
.number .input-group .controls span:active {
  opacity: 1;
}

[data-bs-theme=dark] .number .input-group {
  background-color: var(--input-background);
  color: #fff;
  border-color: var(--tblr-border-color);
}
[data-bs-theme=dark] .number .input-group .controls span {
  border-color: #1f2e41;
}
</style>