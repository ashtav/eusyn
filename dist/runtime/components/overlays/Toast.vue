<template>
  <Teleport to="body">
    <div ref="toastEl" class="nuxt-toast" :class="[show ? 'show' : '', type, alignment]">
      <div class="nuxt-toast-content">
        <div class="d-flex justify-content-start">
          <!-- <i class="ti me-2" :class="icon"></i> -->
          <div class="d-flex justify-content-between w-100">
            <span v-text="message" />
            <i :class="iconX" @click="onHide" />
          </div>
        </div>

        <div class="progress" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </Teleport>
</template>

<script>
import { onMounted, ref } from "vue";
import eventBus from "../../plugins/mitt";
var Alignment = /* @__PURE__ */ ((Alignment2) => {
  Alignment2[Alignment2["topRight"] = 0] = "topRight";
  Alignment2[Alignment2["topLeft"] = 1] = "topLeft";
  Alignment2[Alignment2["bottomRight"] = 2] = "bottomRight";
  Alignment2[Alignment2["bottomLeft"] = 3] = "bottomLeft";
  return Alignment2;
})(Alignment || {});
export default {
  setup() {
    const message = ref(null);
    const progress = ref(0);
    const show = ref(false);
    const type = ref("default");
    const alignment = ref("top-right");
    let currentAnimationFrame = null;
    let originalDuration = null;
    let originalStartTime = null;
    let elapsedTimeUponHover = null;
    const toastEl = ref(null);
    onMounted(() => {
      eventBus.on("__show_toast", onShow);
      if (toastEl.value !== null) {
        toastEl.value.addEventListener("mouseenter", () => {
          if (currentAnimationFrame !== null) {
            cancelAnimationFrame(currentAnimationFrame);
            currentAnimationFrame = null;
            elapsedTimeUponHover = performance.now() - (originalStartTime || 0);
          }
        });
        toastEl.value.addEventListener("mouseleave", () => {
          if (currentAnimationFrame === null && originalDuration !== null && elapsedTimeUponHover !== null) {
            originalStartTime = performance.now() - elapsedTimeUponHover;
            const frame = () => {
              const elapsed = performance.now() - (originalStartTime ?? 0);
              progress.value = elapsed / (originalDuration ?? 0) * 100;
              if (progress.value < 100) {
                currentAnimationFrame = requestAnimationFrame(frame);
              } else {
                progress.value = 0;
                originalDuration = null;
                originalStartTime = null;
                elapsedTimeUponHover = null;
                show.value = false;
              }
            };
            currentAnimationFrame = requestAnimationFrame(frame);
          }
        });
      }
    });
    const onShow = (args) => {
      message.value = args.message;
      alignment.value = args?.options?.pos ?? "top-right";
      show.value = true;
      originalDuration = args?.options?.duration ?? 3e3;
      originalStartTime = performance.now();
      type.value = args?.type ?? "default";
      toastEl.value?.classList.add("bounce");
      setTimeout(() => {
        toastEl.value?.classList.remove("bounce");
      }, 150);
      if (currentAnimationFrame !== null) {
        cancelAnimationFrame(currentAnimationFrame);
        currentAnimationFrame = null;
        progress.value = 0;
      }
      const frame = () => {
        const elapsed = performance.now() - (originalStartTime ?? 0);
        progress.value = elapsed / (originalDuration ?? 0) * 100;
        if (progress.value < 100) {
          currentAnimationFrame = requestAnimationFrame(frame);
        } else {
          progress.value = 0;
          originalDuration = null;
          originalStartTime = null;
          elapsedTimeUponHover = null;
          show.value = false;
        }
      };
      currentAnimationFrame = requestAnimationFrame(frame);
    };
    const onHide = () => {
      progress.value = 0;
      originalDuration = null;
      originalStartTime = null;
      elapsedTimeUponHover = null;
      show.value = false;
    };
    return { onShow, onHide, show, message, progress, toastEl, type, alignment };
  },
  data() {
    return {
      iconX: "ti ti-x"
    };
  },
  mounted() {
    nextTick(() => {
      const config = useRuntimeConfig();
      const icon = config.public.ui?.icon;
      this.iconX = icon == "tabler" ? "ti ti-x" : "hgi hgi-stroke hgi-cancel-01";
    });
  }
};
</script>

<style scoped>
.nuxt-toast {
  position: fixed;
  z-index: 99999;
  min-width: 280px;
  max-width: 300px;
  background: white;
  box-shadow: 0 0.5rem 1rem rgba(220, 225, 231, 0.15);
  border-radius: 4px;
  opacity: 0;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  pointer-events: none;
}
.nuxt-toast.top-right {
  top: 20px;
  right: 20px;
}
.nuxt-toast.top-left {
  top: 20px;
  left: 20px;
}
.nuxt-toast.bottom-right {
  bottom: 20px;
  right: 20px;
}
.nuxt-toast.bottom-left {
  bottom: 20px;
  left: 20px;
}
.nuxt-toast.show {
  opacity: 1;
  pointer-events: all;
}
.nuxt-toast.error {
  background-color: #d63939;
}
.nuxt-toast.warning {
  background-color: #f76707;
}
.nuxt-toast.success {
  background-color: #2fb344;
}
.nuxt-toast.error, .nuxt-toast.warning, .nuxt-toast.success {
  color: white !important;
}
.nuxt-toast.error .ti-x,
.nuxt-toast.error .hgi, .nuxt-toast.warning .ti-x,
.nuxt-toast.warning .hgi, .nuxt-toast.success .ti-x,
.nuxt-toast.success .hgi {
  color: white !important;
}
.nuxt-toast.error .progress, .nuxt-toast.warning .progress, .nuxt-toast.success .progress {
  background: white !important;
}
.nuxt-toast.bounce {
  transition: 0.1s ease-in-out;
  transform: scale(1.05);
}
.nuxt-toast .nuxt-toast-content {
  position: relative;
  padding: 15px 20px;
  max-height: 350px;
  overflow: auto;
}
.nuxt-toast .nuxt-toast-content::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.nuxt-toast .nuxt-toast-content .progress {
  position: absolute;
  height: 1px;
  background: #212121;
  bottom: 0;
  left: 0;
}
.nuxt-toast .nuxt-toast-content .hgi {
  font-size: 17px;
  color: #888;
  transition: 0.2s;
}
.nuxt-toast .nuxt-toast-content .hgi:hover {
  color: #212121;
  cursor: pointer;
}
.nuxt-toast .nuxt-toast-content .ti-x {
  --tblr-icon-size: 1.08rem;
  width: var(--tblr-icon-size);
  height: var(--tblr-icon-size);
  font-size: var(--tblr-icon-size);
  margin-left: 15px;
  margin-top: 3px;
  color: #888;
  transition: 0.2s;
}
.nuxt-toast .nuxt-toast-content .ti-x:hover {
  color: #212121;
  cursor: pointer;
}

[data-bs-theme=dark] .nuxt-toast {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}
[data-bs-theme=dark] .nuxt-toast:not([data-bs-theme=dark] .nuxt-toast.error, [data-bs-theme=dark] .nuxt-toast.warning, [data-bs-theme=dark] .nuxt-toast.success) {
  background-color: #1f2d3d;
}
[data-bs-theme=dark] .nuxt-toast .progress {
  background: white !important;
}
</style>