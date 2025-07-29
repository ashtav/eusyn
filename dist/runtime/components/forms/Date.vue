<template>
    <div :class="['date', utils.on(disabled, 'disabled')]">
        <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

        <div class="input-group" @wheel="onWheel">
            <div>
                <Icon :icon="prefix" v-if="prefix" size="input-prefix" class="me-3 opacity-50" />
                <div class="d-flex">
                    <template v-for="(key, i) in ['y', 'm', 'd']" :key="i">
                        <span @click="onFocus(i)"
                            :class="['date-part', { 'focused': focused === i, 'blur': focused != -1 && focused != i }]">{{
                                date()[key] }}</span>
                        <span v-if="i < 2" :class="{ 'blur': focused != -1 }">/</span>
                    </template>
                </div>
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
import "../../assets/styles/scss/date.scss";
import { onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default {
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const value = props.modelValue ? new Date(props.modelValue) : /* @__PURE__ */ new Date();
    const localValue = ref(utils.dateFormat(value, "Y-m-d"));
    const focused = ref(-1);
    const date = () => {
      const date2 = new Date(localValue.value);
      const d = date2.getDate().toString().padStart(2, "0");
      const m = (date2.getMonth() + 1).toString().padStart(2, "0");
      const y = date2.getFullYear().toString();
      return { y, m, d };
    };
    const onFocus = (index) => {
      if (focused.value == index) {
        return focused.value = -1;
      }
      focused.value = index;
    };
    watch(() => props.modelValue, (value2) => {
      localValue.value = value2;
    });
    const onControl = (i) => {
      const dateObj = new Date(localValue.value);
      const minDate = props.minDate ? new Date(props.minDate) : null;
      const maxDate = props.maxDate ? new Date(props.maxDate) : null;
      const delta = i === 0 ? -1 : 1;
      if (focused.value === 0) {
        dateObj.setFullYear(dateObj.getFullYear() + delta);
      } else if (focused.value === 1) {
        dateObj.setMonth(dateObj.getMonth() + delta);
      } else {
        dateObj.setDate(dateObj.getDate() + delta);
      }
      if (minDate && dateObj < minDate) {
        dateObj.setTime(minDate.getTime());
      }
      if (maxDate && dateObj > maxDate) {
        dateObj.setTime(maxDate.getTime());
      }
      localValue.value = utils.dateFormat(dateObj, "Y-m-d");
      emit("update:modelValue", localValue.value);
    };
    const onWheel = (e) => {
      e.preventDefault();
      onControl(e.deltaY < 0 ? 1 : 0);
    };
    onMounted(() => {
      document.addEventListener("click", (e) => {
        const target = e.target;
        if (!target.closest(".input-group")) {
          focused.value = -1;
        }
      });
    });
    return { utils, focused, date, onControl, onWheel, onFocus };
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