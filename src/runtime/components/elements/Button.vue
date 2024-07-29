<template>
  <NuxtLink :to="to" :class="['btn', theme]" v-if="to">
    <Ti :icon="icon" class="me-2" v-if="icon != null" />

    {{ label ?? '' }}
  </NuxtLink>

  <button :class="['btn', theme]" :type="utils.on(submit, 'submit', 'button')" :disabled="submitted || disabled"
    @click="click_" v-else>
    <Spinner class="me-2" v-if="submitted" />

    <Row :reverse="iconAlign == 'end'" :gap="7">
      <Ti :icon="icon" v-if="icon != null && !submitted" />
      {{ label ?? '' }}
    </Row>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { utils } from '../../utils';

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
      default: "btn-primary",
    },

    icon: {
      type: String,
      default: null,
    },

    iconAlign: {
      type: String,
      default: 'start'
    },

    to: {
      type: String,
      default: null
    }
  },

  setup(props, { emit }) {
    const isSubmit = ref(props.submitted);


    watch(() => props.submitted, (value) => {
      isSubmit.value = value
    })


    const events = {
      submit: () => isSubmit.value = true,
      abort: () => isSubmit.value = false,
    }

    const click_ = () => {
      emit('click', events)
    }

    return {
      isSubmit,
      utils, click_
    }
  }
})
</script>
