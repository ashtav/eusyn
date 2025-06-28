<template>
  <div class="dropdown">
    <component :is="el" :class="['d-inline-block', attrs.class]" data-bs-toggle="dropdown">
      <slot>
        <Button :label="label" :icon="icon" :theme="theme" />
      </slot>
    </component>

    <div :class="[`dropdown-menu`, size, { 'show': show }, `dropdown-menu-${placement}`]">
      <span v-if="options_.length == 0" class="dropdown-item text-muted disabled">No data found!</span>

      <template v-for="(option, i) in options_" :key="i" v-else>
        <span :class="['dropdown-item', { 'text-danger': extract(option, 'danger') == true }]"
          @click="onSelect(option)">
          <Row justify="between" class="w-100">
            <span>{{ textOption(option) }}</span>
            <Icon v-if="extract(option, 'icon')" :icon="`${extract(option, 'icon')} fix-1`" />
          </Row>
        </span>

        <div v-if="separator.includes(i) && i < (options_.length - 1)" class="dropdown-divider" />
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default {
  inheritAttrs: false,
  emits: ["select"],
  props: {
    options: {
      type: [Array, Array, Array, Array],
      default: []
    },
    icons: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "lg"
    },
    placement: {
      type: String,
      default: "start"
    },
    separate: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: "Dropdown"
    },
    icon: {
      type: String,
      default: "hgi-arrow-down-01"
    },
    theme: {
      type: String,
      default: "btn-link"
    },
    el: {
      type: String,
      default: "span"
    }
  },
  setup(props, { emit, attrs }) {
    const options_ = ref(props.options);
    const separator = ref(props.separate);
    const dropdown = ref(null), slot = ref(null);
    const key = ref("");
    const dkey = utils.randString();
    const show = ref(false);
    const additionalStyle = ref({});
    const extract = (option, key2) => {
      return typeof option == "string" ? option : option[key2];
    };
    const toggle = () => {
      show.value = !show.value;
      additionalStyle.value = {
        opacity: 0
      };
      const elSlot = slot.value;
      const height = elSlot.offsetHeight;
      setTimeout(() => {
        const el = dropdown.value;
        if (isElementOutOfScreenBottom(el)) {
          additionalStyle.value = {
            inset: "auto 0px 0px auto",
            transform: `translate(0px, -${height + 15}px)`,
            opacity: 0
          };
        }
        setTimeout(() => {
          if (isElementOutOfScreenTop(el)) {
            additionalStyle.value = {};
          }
          additionalStyle.value["opacity"] = 1;
          if (props.placement == "end") {
            additionalStyle.value["right"] = 0;
          }
        }, 1);
      }, 1);
    };
    const textOption = (data) => {
      return ["number", "string"].includes(typeof data) ? data : data?.label ?? "";
    };
    const onSelect = (option) => {
      show.value = false;
      emit("select", option);
    };
    const isElementOutOfScreenTop = (element) => {
      return element.offsetTop < 0;
    };
    const isElementOutOfScreenBottom = (element) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.bottom > windowHeight;
    };
    const initOptions = (value) => {
      let options = [];
      value.forEach((e, i) => {
        if (e != "-") {
          options.push(e);
        } else {
          separator.value.push(i < 0 ? i : i - 1);
        }
      });
      options_.value = options;
    };
    watch(() => props.options, (value) => {
      initOptions(value);
    });
    onMounted(() => {
      initOptions(props.options);
      key.value = utils.randString();
      document.addEventListener("click", (e) => {
        if (show.value) {
          const parentClass = dkey;
          const targetElement = e.target;
          const isInsideParentClass = (element) => {
            while (element) {
              if (element.classList.contains(parentClass)) {
                return true;
              }
              element = element.parentElement;
            }
            return false;
          };
          if (!isInsideParentClass(targetElement)) {
            show.value = false;
          }
        }
      });
    });
    return { show, utils, options_, dropdown, slot, dkey, additionalStyle, toggle, textOption, onSelect, extract, separator, attrs };
  }
};
</script>

<style scoped>
.dropdown-menu {
  max-height: 290px;
  overflow-y: auto;
  position: absolute;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}
.dropdown-menu::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  /* Chrome/Safari/Webkit */
}
.dropdown-menu .dropdown-item {
  color: #666;
  cursor: pointer;
}
.dropdown-menu .dropdown-item:hover {
  background: #fafafa;
  color: #333;
}
.dropdown-menu .dropdown-item.active {
  color: #0054a6 !important;
}
.dropdown-menu .dropdown-item:not(.text-danger) i {
  color: #999;
}
.dropdown-menu .dropdown-divider {
  margin: 4px 0;
}
.dropdown-menu.sm {
  min-width: 80px !important;
  max-width: 80px !important;
  overflow: hidden;
}
.dropdown-menu.md {
  min-width: 160px !important;
  max-width: 160px !important;
  overflow: hidden;
}

[data-bs-theme=dark] .dropdown-item {
  color: #ccc;
}
[data-bs-theme=dark] .dropdown-item:hover {
  background: #1f2d3d;
  color: #fff;
}
[data-bs-theme=dark] .dropdown-item.active {
  color: #0054a6 !important;
}
</style>