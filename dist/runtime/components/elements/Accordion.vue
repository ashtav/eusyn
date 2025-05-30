<template>
    <div class="accordion" ref="accordion">
        <div class="accordion-item" v-for="(item, i) in items" :key="i">
            <h2 class="accordion-header">
                <button :class="['accordion-button', { collapsed: !isOpen(i) }]" type="button">
                    {{ item.label }}
                </button>
            </h2>
            <div class="accordion-collapse">
                <div class="accordion-body pt-0">
                    {{ item.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    open: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const accordion = ref(null);
    const isOpen = (index) => props.open.includes(index);
    const isDefaultOpen = (index) => props.open.includes(index) && !props.open.includes(index);
    const handleClick = (header, index) => {
      const currentItem = header.parentElement;
      const content = currentItem.querySelector(".accordion-collapse");
      const button = header.querySelector("button");
      if (!props.multiple) {
        const items = accordion.value?.querySelectorAll(".accordion-item") || [];
        items.forEach((item) => {
          const otherButton = item.querySelector("button");
          const otherContent = item.querySelector(".accordion-collapse");
          if (item !== currentItem) {
            item.classList.remove("active");
            otherContent.style.maxHeight = null;
            otherButton?.classList.add("collapsed");
          }
        });
      }
      currentItem.classList.toggle("active");
      if (currentItem.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        button?.classList.remove("collapsed");
      } else {
        content.style.maxHeight = null;
        button?.classList.add("collapsed");
      }
    };
    onMounted(() => {
      const els = accordion.value;
      if (els) {
        const headers = els.querySelectorAll(".accordion-header");
        headers.forEach((header, index) => {
          const button = header.querySelector("button");
          button?.addEventListener("click", () => handleClick(header, index));
          const currentItem = header.parentElement;
          const content = currentItem.querySelector(".accordion-collapse");
          if (isOpen(index)) {
            currentItem.classList.add("active");
            content.style.transition = "max-height 0s ease";
            content.style.maxHeight = content.scrollHeight + "px";
            button?.classList.remove("collapsed");
          }
          setTimeout(() => {
            content.style.transition = "max-height 0.2s ease";
          }, 0);
        });
      }
    });
    return { accordion, isOpen, isDefaultOpen };
  }
};
</script>
  
<style scoped>
.accordion-collapse {
  max-height: 0;
  overflow: hidden;
}
</style>
  