<template>
  <i :class="['ti', icon.includes('ti-') ? icon : `ti-${icon}`, size, clean ? 'clean' : '']" v-if="isTabler" />
  <i :class="['hgi hgi-stroke', icon]" v-else></i>
</template>

<script>
import { useRuntimeConfig } from "#imports";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "sm"
    },
    clean: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const config = useRuntimeConfig();
    const icon = config.public.ui?.icon;
    const isTabler = icon == "tabler";
    return { isTabler };
  }
});
</script>

<style scoped>
.ti {
  --tblr-icon-size: 1.05rem;
  width: var(--tblr-icon-size);
  height: var(--tblr-icon-size);
  font-size: var(--tblr-icon-size);
  vertical-align: bottom;
  stroke-width: 0.1rem;
  display: inline-block;
}
.ti.xs {
  --tblr-icon-size: 0.9rem;
}
.ti.sm {
  --tblr-icon-size: 1.05rem;
}
.ti.md {
  --tblr-icon-size: 1.25rem;
}
.ti.lg {
  --tblr-icon-size: 1.5rem;
}
.ti.input-prefix {
  margin-bottom: 0px;
  margin-top: 2px;
}

.hgi {
  font-size: 17px;
}
.hgi.fix {
  top: 3px;
}
</style>