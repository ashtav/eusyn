<template>
  <NuxtLink v-if="to" :to="to" :class="['btn', theme]">
    <Ti v-if="icon != null" :icon="icon" class="me-2" />

    {{ label ?? '' }}
  </NuxtLink>

  <button
    v-else
    :class="['btn', theme]"
    :type="utils.on(submit, 'submit', 'button')"
    :disabled="submitted || disabled"
    @click="click_"
  >
    <Spinner v-if="submitted" class="me-2" />

    <Row :reverse="iconAlign == 'end'" :gap="icon != null && !submitted ? 7 : 0">
      <Ti v-if="icon != null && !submitted" :icon="icon ?? ''" /> {{ label ?? '' }}
    </Row>
  </button>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default defineComponent({
  // inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    submitted: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "btn-primary"
    },
    icon: {
      type: String,
      default: null
    },
    iconAlign: {
      type: String,
      default: "start"
    },
    to: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    const isSubmit = ref(props.submitted);
    watch(() => props.submitted, (value) => {
      isSubmit.value = value;
    });
    const events = {
      submit: () => isSubmit.value = true,
      abort: () => isSubmit.value = false
    };
    const click_ = () => {
      emit("click", events);
    };
    return {
      isSubmit,
      utils,
      click_
    };
  }
});
</script>
