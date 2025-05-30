<template>
    <div class="drop-d x" @click="toggleOptions">
        <span ref="slotRef">
            <slot />
        </span>

        <div class="options" v-if="showOptions" :style="optionsStyle">
            <ul>
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
export default {
  setup() {
    const slotRef = ref(null);
    const showOptions = ref(false);
    const optionsStyle = ref({
      top: "0px",
      left: "0px",
      position: "fixed"
    });
    const toggleOptions = () => {
      if (!slotRef.value)
        return;
      const rect = slotRef.value.getBoundingClientRect();
      optionsStyle.value = {
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        position: "fixed"
      };
      console.log(optionsStyle.value);
      showOptions.value = !showOptions.value;
    };
    const handleClickOutside = (event) => {
      if (slotRef.value && !slotRef.value.contains(event.target)) {
        showOptions.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return {
      slotRef,
      showOptions,
      optionsStyle,
      toggleOptions
    };
  }
};
</script>

<style scoped>
.drop-d {
  display: inline;
}

.options {
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px;
  z-index: 100;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  padding: 4px 8px;
  cursor: pointer;
}
ul li:hover {
  background-color: #f0f0f0;
}
</style>
