<template>
    <div class="list-group-item" :class="{ active: active }">
        <slot v-if="label == null && value == null" />

        <!-- label value -->
        <div v-else :class="{
            'd-flex justify-content-between gap-5': $attrs.onAction
        }">
            <div :class="{
                'd-flex justify-content-between align-items-center w-100': inline,
                'd-flex align-items-center gap-3': !inline && thumbnail,
                'd-flex justify-content-between': $attrs.onAction
            }">
                <div v-if="thumbnail && !inline">
                    <span :class="`avatar avatar-${tsize}`" :style="{ backgroundImage: `url(${thumbnail})` }"> </span>
                </div>

                <div :class="{ 'd-flex justify-content-between w-100 gap-5': inline }">
                    <label class="text-secondary" v-if="label">{{ label }}</label>
                    <div v-if="value" :class="{ 'text-end': inline }">{{ value }}</div>
                </div>
            </div>

            <div class="options" :class="{ 'hover-to-show': hoverAction }" v-if="$attrs.onAction && !inline">
                <span v-for="(e, i) in options" :key="i" @click="emit('action', e)">
                    <Icon :icon="e.icon" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    return { emit };
  },
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    thumbnail: {
      type: String,
      default: null
    },
    tsize: {
      type: String,
      default: "md",
      validator: (value) => ["xs", "sm", "md", "lg", "xl"].includes(value)
    },
    active: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => [
        { icon: "hgi-edit-03", key: "edit" },
        { icon: "hgi-delete-02", key: "delete" }
      ]
    },
    hoverAction: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.list-group-item:hover .options {
  opacity: 1;
}

.options {
  display: flex;
  align-items: center;
  opacity: 1;
  transition: 0.2s;
}
.options.hover-to-show {
  opacity: 0;
}
.options span {
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 8px 6px 3px 6px;
  border-radius: 6px;
  transition: 0.2s;
  opacity: 0.7;
}
.options span:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
  opacity: 1;
}
.options span:active {
  transition: none;
  opacity: 0.5;
}
</style>