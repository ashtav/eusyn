<template>
  <Teleport to="body">
    <div ref="toastEl" class="nuxt-toast" :class="[show ? 'show' : '', type]">
      <div class="nuxt-toast-content">
        <div class="d-flex justify-content-start">
          <!-- <i class="ti me-2" :class="icon"></i> -->
          <div class="d-flex justify-content-between w-100">
            <span v-text="message" />
            <i class="ti ti-x" @click="onHide" />
          </div>
        </div>

        <div class="progress" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import eventBus from '../../plugins/mitt'

export default {
  setup() {
    const message: Ref<string | null> = ref(null)
    const icon: Ref<string | null> = ref(null)
    const progress: Ref<number> = ref(0)
    const show: Ref<boolean> = ref(false)
    const type: Ref<string> = ref('default')

    let currentAnimationFrame: number | null = null
    let originalDuration: number | null = null
    let originalStartTime: number | null = null
    let elapsedTimeUponHover: number | null = null

    const toastEl = ref<HTMLElement | null>(null)

    onMounted(() => {
      eventBus.on('__show_toast', onShow)

      if (toastEl.value !== null) {
        toastEl.value.addEventListener('mouseenter', () => {
          if (currentAnimationFrame !== null) {
            cancelAnimationFrame(currentAnimationFrame)
            currentAnimationFrame = null
            elapsedTimeUponHover = performance.now() - (originalStartTime || 0)
          }
        })

        toastEl.value.addEventListener('mouseleave', () => {
          if (
            currentAnimationFrame === null &&
            originalDuration !== null &&
            elapsedTimeUponHover !== null
          ) {
            originalStartTime = performance.now() - elapsedTimeUponHover
            const frame = () => {
              const elapsed = performance.now() - (originalStartTime ?? 0)
              progress.value = (elapsed / (originalDuration ?? 0)) * 100

              if (progress.value < 100) {
                currentAnimationFrame = requestAnimationFrame(frame)
              } else {
                progress.value = 0
                originalDuration = null
                originalStartTime = null
                elapsedTimeUponHover = null
                show.value = false
              }
            }

            currentAnimationFrame = requestAnimationFrame(frame)
          }
        })
      }
    })

    const onShow = (args: any) => {
      message.value = args.message
      icon.value = args?.options?.icon ?? 'ti-info-circle'

      show.value = true
      originalDuration = args?.options?.duration ?? 3000 // by default 3 seconds
      originalStartTime = performance.now()

      type.value = args?.type ?? 'default'

      //   add bounce class
      toastEl.value?.classList.add('bounce')

      setTimeout(() => {
        toastEl.value?.classList.remove('bounce')
      }, 150)

      // Cancel the previous animation if any
      if (currentAnimationFrame !== null) {
        cancelAnimationFrame(currentAnimationFrame)
        currentAnimationFrame = null
        progress.value = 0 // Reset progress
      }

      const frame = () => {
        const elapsed = performance.now() - (originalStartTime ?? 0)
        progress.value = (elapsed / (originalDuration ?? 0)) * 100

        if (progress.value < 100) {
          currentAnimationFrame = requestAnimationFrame(frame)
        } else {
          progress.value = 0
          originalDuration = null
          originalStartTime = null
          elapsedTimeUponHover = null
          show.value = false
        }
      }

      currentAnimationFrame = requestAnimationFrame(frame)
    }

    const onHide = () => {
      progress.value = 0
      originalDuration = null
      originalStartTime = null
      elapsedTimeUponHover = null
      show.value = false
    }

    return { onShow, onHide, show, message, icon, progress, toastEl, type }
  }
}
</script>

<style lang="scss" scoped>
.nuxt-toast {
  position: fixed;
  z-index: 99999;
  top: 20px;
  right: 20px;
  min-width: 280px;
  max-width: 300px;
  background: white;
  box-shadow: 0 0.5rem 1rem rgba(var(--tblr-body-color-rgb), 0.15);
  border-radius: 4px;
  opacity: 0;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  pointer-events: none;

  &.show {
    opacity: 1;
    pointer-events: all;
  }

  &.error {
    background-color: #d63939;
  }

  &.warning {
    background-color: #f76707;
  }

  &.success {
    background-color: #2fb344;
  }

  &.error,
  &.warning,
  &.success {
    color: white !important;

    .ti-x {
      color: white !important;
    }

    .progress {
      background: white !important;
    }
  }

  &.bounce {
    transition: 0.1s ease-in-out;
    transform: scale(1.05);
  }

  .nuxt-toast-content {
    position: relative;
    padding: 15px 20px;
    max-height: 350px;
    overflow: auto;

    // hide scrollbar
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .progress {
      position: absolute;
      height: 1px;
      background: #212121;
      bottom: 0;
      left: 0;
    }

    .ti-x {
      --tblr-icon-size: 1.08rem;
      width: var(--tblr-icon-size);
      height: var(--tblr-icon-size);
      font-size: var(--tblr-icon-size);

      margin-left: 15px;
      margin-top: 3px;
      color: #888;
      transition: 0.2s;

      &:hover {
        color: #212121;
        cursor: pointer;
      }
    }
  }
}

[data-bs-theme=dark] {
  .nuxt-toast {
    box-shadow: 0 0.5rem 1rem darken($color: #1f2d3d, $amount: 5%);
  }
}
</style>