<template>
  <div
    class="modal modal-blur fade"
    :class="{ 'show': show }"
    tabindex="-1"
    :style="{ display: preShow ? 'block' : 'none' }"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document" :class="`modal-${size}`">
      <div class="modal-content">
        <!-- modal header -->
        <div v-if="!headerless" class="modal-header bg-white" :class="{ 'border-0': !elevation }">
          <h5 class="modal-title">
            {{ title }}
          </h5>

          <!-- modal action -->
          <div class="modal-action">
            <ul>
              <template v-for="(item, i) in actions">
                <li
                  v-if="(item?.visible ?? true)"
                  :key="i"
                  :icon-tooltip="item?.tooltip"
                  :class="[item?.disabled ? 'disabled opacity-50' : '']"
                  @click="item?.click?.call(null, { ...item, index: i })"
                >
                  <Ti :icon="item?.icon" />
                </li>
              </template>
            </ul>
          </div>

          <!-- close modal -->
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="() => modal.close(id)"
          />
        </div>

        <!-- modal body -->
        <slot />
      </div>
    </div>
  </div>

  <div v-if="preShow" class="modal-backdrop fade" :class="{ 'show': show }" />
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import eventBus from '../../plugins/mitt';
import { modal } from '../../scripts/modal';

export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: 'md'
    },

    elevation: {
      type: Boolean,
      default: true
    },

    actions: {
      type: Array<any>,
      default: []
    },

    headerless: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    const show = ref(false)
    const preShow = ref(false)

    const title = ref('')

    let callback: Function

    const onShow = (args: any) => {
      if (args.id == props.id) {
        preShow.value = true

        title.value = args?.params?.title ?? 'Untitled'
        callback = args?.params?.callback ?? null

        setTimeout(() => {
          show.value = true
        }, 1)

        // listen to keyboard: press Esc to close
        document.body.style.overflow = 'hidden'
        document.onkeydown = (e) => {
          if (e.key == 'Escape' || e.key == 'Esc' && show.value) {
            e.preventDefault()
            modal.close(props.id)
          }
        }
      }
    }

    const onClose = (args: any) => {
      if (args.id == props.id) {
        show.value = false

        setTimeout(() => {
          preShow.value = false
        }, 250)

        // unlisten to keyboard
        document.onkeydown = () => { }
        document.body.style.overflow = 'auto'
      }
    }

    const onSetTitle = (args: any) => {
      title.value = args.title
    }

    const onCallback = (args: any) => {
      callback?.call(this, args.data)
    }


    onMounted(() => {
      eventBus.on('__show_modal', onShow)
      eventBus.on('__close_modal', onClose)
      eventBus.on('__set_modal_title', onSetTitle)
      eventBus.on('__callback_modal', onCallback)
    })

    return { modal, preShow, show, title, onClose }
  }
}
</script>

<style lang="scss" scoped>
.btn-close {
    outline: none;
    --tblr-btn-close-focus-shadow: none
}

.modal {
    scrollbar-width: thin;
}

.modal-header {
    position: sticky;
    top: 0;
    z-index: 1;
    background: rgba(255, 255, 255, .1) !important;
    backdrop-filter: blur(10px) !important;

    .modal-action {
        flex-grow: 1;
        flex-shrink: 0;
        white-space: nowrap;
        text-align: right;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                display: inline-block;
                margin-left: 18px;
                transition: .1s;
                cursor: pointer;

                i {
                    color: #999;
                    transition: .2s;
                }

                &.disabled {
                    pointer-events: none;
                }

                &:hover {
                    i {
                        color: #333;
                    }
                }

                &:active {
                    opacity: .6;
                }

                &[icon-tooltip] {
                    position: relative;

                    &::before,
                    &::after {
                        position: absolute;
                        opacity: 0;
                        pointer-events: none;
                        transition: .1s ease-in-out;
                        left: 50%;
                    }

                    &::before {
                        content: attr(icon-tooltip);
                        padding: 5px 10px;
                        background: #212121;
                        top: -46px;
                        transform: translateX(-50%);
                        color: white;
                        border-radius: 4px;
                        font-size: 13px;
                    }

                    &::after {
                        content: "";
                        width: 0;
                        height: 0;
                        top: -18px;
                        transform: translateX(-50%) rotate(180deg);
                        border-left: 7px solid transparent;
                        border-right: 7px solid transparent;
                        border-bottom: 7px solid #212121;
                    }

                    &:hover::before,
                    &:hover::after {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>