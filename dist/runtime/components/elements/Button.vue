<template>
  <NuxtLink v-if="to" :to="to" :class="['btn', theme]">
    <Ti v-if="icon != null" :icon="icon" style="margin: 1.8px 0" />

    <span v-if="label" :class="{ 'ms-2': icon != null }">{{
      label ?? '' }}</span>
  </NuxtLink>

  <button v-else :class="['btn', theme]" :type="utils.on(submit, 'submit', 'button')" :disabled="isSubmit || disabled"
    @click="click_">
    <Spinner v-if="isSubmit" :class="{ 'me-2': icon == null }" />

    <Row :reverse="iconAlign == 'end'" :gap="(icon == null || label == null) ? 0 : 3">
      <Ti v-if="icon != null && !isSubmit" :icon="icon ?? ''" /> <span v-if="label" v-text="label" />
    </Row>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import { utils } from '../../plugins/utils';

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
      default: 'btn-primary'
    },

    icon: {
      type: String,
      default: null
    },

    iconAlign: {
      type: String,
      default: 'start'
    },

    to: {
      type: String,
      default: null
    },

    onClick: {
      type: Function as PropType<(action: ButtonAction) => void>,
    }
  },

  setup(props, { emit }) {
    const isSubmit = ref(props.submitted)


    watch(() => props.submitted, (value) => {
      isSubmit.value = value
    })


    const events: ButtonAction = {
      submit: () => isSubmit.value = true,
      abort: () => isSubmit.value = false
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
