<template>
  <div :class="{ 'mb-3': !nospace }">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

    <div>
      <label v-for="(option, i) in options" :key="i" class="form-check form-check-inline">
        <input
          v-model="localValue"
          class="form-check-input"
          type="radio"
          :name="inputName"
          :value="textOption(option, true)"
          :disabled="disabled || (option?.disabled ?? false)"
          :required="required"
          @input="onInput(option)"
        >
        <span class="form-check-label"> {{ textOption(option) }} </span>
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
import { hasValueProperty, textOption, validateOptions } from "../../scripts/select";
export default defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      default: ""
    },
    label: {
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
    options: {
      type: Array,
      default: () => []
    },
    nospace: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const localValue = ref(props.modelValue);
    const inputName = ref("radio-" + utils.randString(5));
    const onInput = (option) => {
      localValue.value = textOption(option, hasValueProperty(props.options));
      emit("update:modelValue", localValue.value);
      emit("change", option);
    };
    watch(() => props.modelValue, (value) => {
      const hasValue = hasValueProperty(props.options);
      const option = props.options.find((o) => {
        return textOption(o, hasValue).toLowerCase() == `${value}`.toLowerCase();
      });
      localValue.value = textOption(option, hasValue);
      emit("update:modelValue", value);
    });
    onMounted(() => {
      validateOptions(props.options);
    });
    return {
      utils,
      localValue,
      inputName,
      onInput,
      textOption
    };
  }
});
</script>