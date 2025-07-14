<template>
    <div class="actions">
        <ul>
            <li v-for="(e, i) in actions">
                <span class="action" @click="handleClick(e)" :key="i" :style="e.label ? { borderRadius: '6px' } : styles">
                    <Icon :icon="e.icon" v-if="e.icon" />
                    <span v-if="e.label">{{ e.label }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const handleClick = (action) => {
      action.click?.(action);
    };
    const styles = {
      borderRadius: props.radius === "circle" ? "50%" : "6px",
      padding: props.radius === "circle" ? "10px" : "5px 10px"
    };
    return { handleClick, styles };
  },
  props: {
    actions: {
      type: Array,
      default: () => []
    },
    radius: {
      type: String,
      default: "rounded"
      // rounded and circle
    }
  }
};
</script>

<style scoped>
.actions ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2px;
}
.actions ul li {
  display: inline-block;
}
.actions ul li span.action {
  cursor: pointer;
  background-color: var(--background-color);
  padding: 10px 13px;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}
.actions ul li span.action:hover {
  opacity: 0.7;
}
.actions ul li span.action:active {
  opacity: 1;
}
</style>