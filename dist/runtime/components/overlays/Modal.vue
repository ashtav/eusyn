<template>
  <div class="modal fade" :class="{ 'show': show && !isConfirmOpen }" tabindex="-1"
    :style="{ display: preShow ? 'block' : 'none' }">
    <div class="modal-dialog modal-dialog-centered" role="document" :class="`modal-${size}`">
      <div class="modal-content">
        <!-- modal header -->
        <div v-if="!headerless" class="modal-header bg-white" :class="{ 'border-0': !elevation }">
          <Icon :icon="`${icon} fix-1 me-2`" v-if="icon" />
          <h5 class="modal-title text-truncate">
            {{ title }}
          </h5>

          <!-- modal action -->
          <div class="modal-action">
            <ul>
              <template v-for="(item, i) in [...actions, { icon: iconX, type: 'close' }]">
                <Dropdown v-if="item?.options?.length > 0 && (item?.visible ?? true)" :key="i" placement="end"
                  :options="item?.options" @select="(o: any) => item?.click?.call(null, { ...o, index: i })">
                  <li :icon-tooltip="item?.tooltip" :class="[item?.disabled ? 'disabled opacity-50' : '']">
                    <Icon :icon="item?.icon" />
                  </li>
                </Dropdown>

                <li v-if="(item?.visible ?? true) && !item?.options?.length" :key="i" :icon-tooltip="item?.tooltip"
                  :class="[item?.disabled ? 'disabled opacity-50' : '']"
                  @click="item?.type == 'close' ? modal.close(id) : item?.click?.call(null, { ...item, index: i })">
                  <Icon :icon="item?.icon" />
                </li>
              </template>
            </ul>
          </div>
        </div>

        <!-- modal body -->
        <slot />
      </div>
    </div>
  </div>

  <div v-if="preShow" class="modal-backdrop fade" :class="{ 'show': show && !isConfirmOpen }" />
</template>

<script>
import { useRuntimeConfig } from "#imports";
import { nextTick, onMounted, ref } from "vue";
import eventBus from "../../plugins/mitt";
import { modal } from "../../scripts/modal";
export default {
  inheritAttrs: false,
  emits: ["init", "onClose"],
  props: {
    id: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "md"
    },
    elevation: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: null
    },
    actions: {
      type: Array,
      default: []
    },
    headerless: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const show = ref(false);
    const preShow = ref(false);
    const isConfirmOpen = ref(false);
    const title = ref("");
    const config = useRuntimeConfig();
    const icon = config.public.ui?.icon;
    const iconX = icon == "tabler" ? "ti-x" : "hgi-cancel-01";
    let callback;
    const onShow = async (args) => {
      await nextTick();
      if (props.id == args.id) {
        preShow.value = true;
        const isParamString = typeof args?.params == "string";
        title.value = isParamString ? args?.params : args?.params?.title ?? "Untitled";
        callback = isParamString ? null : args?.params?.callback ?? null;
        setTimeout(() => {
          show.value = true;
          emit("init", { title: title.value, data: isParamString ? {} : args?.params?.data });
        }, 1);
        document.body.style.overflow = "hidden";
        document.onkeydown = (e) => {
          if (e.key == "Escape" || e.key == "Esc" && show.value) {
            e.preventDefault();
            modal.close(props.id);
          }
        };
      }
    };
    const onShowConfirm = (args) => {
      isConfirmOpen.value = args.show;
    };
    const onClose = (args) => {
      if (args.id == props.id) {
        show.value = false;
        setTimeout(() => {
          preShow.value = false;
        }, 250);
        document.onkeydown = () => {
        };
        document.body.style.overflow = "auto";
      }
    };
    const onSetTitle = (args) => {
      title.value = args.title;
    };
    const onCallback = (args) => {
      callback?.call(this, args.data);
    };
    onMounted(() => {
      eventBus.on("__show_modal", onShow);
      eventBus.on("__show_modal2", onShow);
      eventBus.on("__close_modal", onClose);
      eventBus.on("__set_modal_title", onSetTitle);
      eventBus.on("__callback_modal", onCallback);
      eventBus.on("__show_confirm", onShowConfirm);
    });
    return { modal, preShow, show, title, onClose, iconX, isConfirmOpen };
  }
};
</script>

<style scoped>
.modal {
  scrollbar-width: thin;
}

.modal-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  padding-right: 24px;
}
.modal-header .modal-action {
  flex-grow: 1;
  flex-shrink: 0;
  white-space: nowrap;
  text-align: right;
}
.modal-header .modal-action ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.modal-header .modal-action ul li {
  display: inline-block;
  margin-left: 18px;
  transition: 0.1s;
  cursor: pointer;
}
.modal-header .modal-action ul li i {
  color: #999;
  transition: 0.2s;
}
.modal-header .modal-action ul li.disabled {
  pointer-events: none;
}
.modal-header .modal-action ul li:hover i {
  color: #333;
}
.modal-header .modal-action ul li:active {
  opacity: 0.6;
}
.modal-header .modal-action ul li[icon-tooltip] {
  position: relative;
}
.modal-header .modal-action ul li[icon-tooltip]::before, .modal-header .modal-action ul li[icon-tooltip]::after {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: 0.1s ease-in-out;
  left: 50%;
}
.modal-header .modal-action ul li[icon-tooltip]::before {
  content: attr(icon-tooltip);
  padding: 5px 10px;
  background: var(--tooltip-background);
  top: -46px;
  transform: translateX(-50%);
  color: white;
  border-radius: 4px;
  font-size: 13px;
}
.modal-header .modal-action ul li[icon-tooltip]::after {
  content: "";
  width: 0;
  height: 0;
  top: -18px;
  transform: translateX(-50%) rotate(180deg);
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #212121;
}
.modal-header .modal-action ul li[icon-tooltip]:hover::before, .modal-header .modal-action ul li[icon-tooltip]:hover::after {
  opacity: 1;
}

[data-bs-theme=dark] .modal-header {
  background: rgba(49, 66, 87, 0.1) !important;
}
[data-bs-theme=dark] .modal-header ul li:hover i {
  color: #ccc;
}
[data-bs-theme=dark] .modal-header ul li[icon-tooltip]::before {
  background: var(--tooltip-background);
}
[data-bs-theme=dark] .modal-header ul li[icon-tooltip]::after {
  border-bottom: 7px solid var(--tooltip-background);
}
[data-bs-theme=dark] .modal-content {
  border-color: #2d3d50;
  box-shadow: none;
}

.modal-backdrop {
  background: rgba(0, 0, 0, 0.7);
  transition: 0.2s;
  opacity: 0;
}
.modal-backdrop.show {
  opacity: 1;
}
</style>