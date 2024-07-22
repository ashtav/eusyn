<template>
  <NuxtLink :to="to" :class="['btn', theme]" v-if="to">
    <Ti :icon="icon" class="me-2" v-if="icon != null" />

    {{ label ?? '' }}
  </NuxtLink>

  <button :class="['btn', theme]" :type="type" :disabled="isSubmit" @click="click_" v-else>
    <Spinner class="me-2" v-if="isSubmit" />
    <Ti :icon="icon" class="me-2" v-if="icon != null && !isSubmit" />

    {{ label ?? '' }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { utils } from '../../utils';

export default defineComponent({
  inheritAttrs: false,
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

    theme: {
      type: String,
      default: "btn-primary",
    },

    icon: {
      type: String,
      default: null,
    },

    type: {
      type: String as () => "button" | "submit" | "reset",
      default: "button",
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
