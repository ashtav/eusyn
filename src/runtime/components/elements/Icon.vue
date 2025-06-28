<template>
  <i :class="['ti', icon.includes('ti-') ? icon : `ti-${icon}`, size, clean ? 'clean' : '']" v-if="isTabler" />
  <i :class="['hgi hgi-stroke', icon.includes('hgi-') ? icon : `hgi-${icon}`]" v-else></i>
</template>

<script lang="ts">
import { useRuntimeConfig } from '#imports';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: 'sm'
    },

    clean: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const config = useRuntimeConfig()
    const icon = config.public.ui?.icon
    const isTabler = icon == 'tabler';

    return { isTabler }
  }
})
</script>

<style scoped lang="scss">
.ti {
  --tblr-icon-size: 1.05rem;
  width: var(--tblr-icon-size);
  height: var(--tblr-icon-size);
  font-size: var(--tblr-icon-size);
  vertical-align: bottom;
  stroke-width: .1rem;
  // margin-bottom: 1px;
  display: inline-block;

  // &.clean {
  //   margin: 0 !important
  // }

  &.xs {
    --tblr-icon-size: 0.9rem;
  }

  &.sm {
    --tblr-icon-size: 1.05rem;
  }

  &.md {
    --tblr-icon-size: 1.25rem;
  }

  &.lg {
    --tblr-icon-size: 1.5rem;
  }

  &.input-prefix {
    margin-bottom: 0px;
    margin-top: 2px;
  }
}

.hgi {
  font-size: 17px;

  &.fix {
    top: 3px;
  }

  &.fix-1 {
    top: 1px;
  }
}
</style>