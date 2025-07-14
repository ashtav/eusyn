<template>
  <div :class="['radio']">
    <label v-if="label" :class="['form-label', utils.on(required, 'required')]"> {{ label }} </label>

    <div v-if="isLoading">
      <label v-for="(_, i) in utils.randInt(2, 5)" :key="i" class="form-check mb-1"
        :class="{ 'form-check-inline': inline }">
        <input class="form-check-input" type="radio" disabled>
        <span class="form-check-label" style="margin-top: 3px;">
          <Shimmer :size="[[30, 120]]" />
        </span>
      </label>
    </div>

    <div v-else>
      <label v-for="(option, i) in options" :key="i" class="form-check" :class="{ 'form-check-inline': inline }">
        <input v-model="localValue" class="form-check-input" type="radio" :name="inputName"
          :value="textOption(option, true)" :disabled="disabled || (option?.disabled ?? false)" :required="required"
          @input="onInput(option)">
        <span class="form-check-label"> {{ textOption(option) }} </span>
      </label>

      <div class="text-secondary mb-2" v-if="options.length == 0">{{ emptyMessage }}</div>
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
    inline: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    emptyMessage: {
      type: String,
      default: "No data available"
    }
  },
  setup(props, { emit }) {
    const localValue = ref(props.modelValue);
    const inputName = ref("radio-" + utils.randString(5));
    const isLoading = ref(false);
    const onInput = (option) => {
      localValue.value = textOption(option, hasValueProperty(props.options));
      emit("update:modelValue", localValue.value);
      emit("change", option);
    };
    watch(() => props.modelValue, (value) => {
      const hasValue = hasValueProperty(props.options);
      const option = props.options.find((o) => {
        const text = textOption(o, hasValue);
        const isString = typeof text === "string";
        return (isString ? text.toLowerCase() : text) == `${value}`.toLowerCase();
      });
      localValue.value = textOption(option, hasValue);
      emit("update:modelValue", value);
    });
    watch(() => props.options, (newOptions) => {
      validateOptions(newOptions);
      if (newOptions.length > 0 && !localValue.value) {
        localValue.value = textOption(newOptions[0], hasValueProperty(newOptions));
      }
    }, { immediate: true });
    const setLoading = (loading) => {
      isLoading.value = loading;
    };
    onMounted(() => {
      validateOptions(props.options);
    });
    return {
      utils,
      localValue,
      inputName,
      isLoading,
      setLoading,
      onInput,
      textOption
    };
  }
});
</script>