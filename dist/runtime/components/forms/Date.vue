<template>
    <div :class="['date', utils.on(disabled, 'disabled')]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div>
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                {{ localValue }}
            </div>

            <div class="controls">
                <span v-for="(icon, i) in ['hgi-arrow-down-01', 'hgi-arrow-up-01']" @click="onControl(i)">
                    <Icon :icon="`${icon} fix`" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default {
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const value = props.modelValue ? new Date(props.modelValue) : /* @__PURE__ */ new Date();
    const localValue = ref(utils.dateFormat(value, "Y-m-d"));
    watch(() => props.modelValue, (value2) => {
      localValue.value = value2;
    });
    const onControl = (i) => {
      const date = new Date(localValue.value);
      const minDate = props.minDate ? new Date(props.minDate) : null;
      const maxDate = props.maxDate ? new Date(props.maxDate) : null;
      if (i === 0) {
        date.setDate(date.getDate() - 1);
      } else {
        date.setDate(date.getDate() + 1);
      }
      if (minDate && date < minDate) {
        date.setTime(minDate.getTime());
      }
      if (maxDate && date > maxDate) {
        date.setTime(maxDate.getTime());
      }
      localValue.value = utils.dateFormat(date, "Y-m-d");
      emit("update:modelValue", localValue.value);
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
      type: String
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
    minDate: {
      type: String,
      default: null
    },
    maxDate: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.date.disabled {
  pointer-events: none;
}
.date.disabled .input-group,
.date.disabled div {
  background-color: transparent;
  opacity: 0.5;
  border-color: #d1d1d1;
}
.date.disabled .controls {
  opacity: 0.5;
}
.date .input-group {
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
.date .input-group div {
  display: flex;
  align-items: center;
  position: relative;
  bottom: 1px;
}
.date .input-group .controls span {
  padding: 0.45rem 0.75rem;
  cursor: pointer;
}
.date .input-group .controls span:not(:first-child) {
  border-left: 1px solid #dadfe5;
}
.date .input-group .controls span:hover {
  opacity: 0.7;
}
.date .input-group .controls span:active {
  opacity: 1;
}

[data-bs-theme=dark] .date .input-group {
  background-color: var(--input-background);
  color: #fff;
  border-color: var(--tblr-border-color);
}
[data-bs-theme=dark] .date .input-group .controls span {
  border-color: #1f2e41;
}
</style>