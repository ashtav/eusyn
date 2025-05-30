<template>
    <div class="image-viewer" :class="{ 'show': modelValue }">
        <!-- actions -->
        <div class="controls">
            <span @click="onAction(action)" v-for="action in actionsControl"><i :class="`ti ti-${action}`"></i></span>
            <span @click="close"><i class="ti ti-x"></i></span>
        </div>

        <!-- navigation -->
        <div class="navigator">
            <span v-for="(nav, i) in ['left', 'right']" @click="onNavigate(i)"
                :class="[nav, { 'disabled': [currentIndex < 1, currentIndex >= (images.length - 1)][i] && !config?.loop }]">
                <i :class="[`ti ti-chevron-${nav}`]" />
            </span>
        </div>

        <!-- list of images -->
        <div class="list-images" @mouseenter="isCursorInImageList = true" @mouseleave="isCursorInImageList = false">
            <ul id="list_image__">
                <li v-for="(img, i) in images" :class="{ 'active': img == imageUrl }" @click="onSelectImage(i)"
                    :id="`image___${i}`">
                    <img :src="img" alt="">
                </li>
            </ul>
        </div>

        <!-- image view -->
        <div class="image" :style="imageStyle" @dblclick="resizeToDefault"></div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: () => []
    },
    active: {
      type: String,
      default: () => null
    },
    /**
     * allowed: ['copy', 'download']
     */
    actions: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: { min: null, max: null, loop: false }
    },
    onDownload: Function
  },
  emits: ["update:modelValue", "download"],
  setup(props, { emit, attrs }) {
    const localValue = ref(props.modelValue);
    const width = ref(50);
    const height = ref(50);
    const imageUrl = ref("");
    const currentIndex = ref(0);
    const isCursorInImageList = ref(false);
    const actionsControl = ref([]);
    let prevSize = [10, 10];
    const initActions = () => {
      const actions = [...new Set(props.actions)];
      actionsControl.value = actions.filter((e) => ["copy", "download"].includes(e));
    };
    const getConfig = () => {
      return {
        min: props.config.min ?? 30,
        max: props.config.max ?? 90
      };
    };
    const resizeToDefault = () => {
      updateImageSize();
    };
    const zoomImage = (type = "in", zoomFactor = 0) => {
      const { min, max } = getConfig();
      if (type == "in") {
        width.value += 5 * zoomFactor;
        height.value += 5 * zoomFactor;
        setTimeout(() => {
          if (width.value > max && height.value > max) {
            width.value = max;
            height.value = max;
          }
        }, 100);
      } else {
        width.value -= 5 * zoomFactor;
        height.value -= 5 * zoomFactor;
        setTimeout(() => {
          if (width.value < min && height.value < min) {
            width.value = min;
            height.value = min;
          }
        }, 100);
      }
    };
    const adjustSize = (event) => {
      if (!localValue)
        return;
      if (isCursorInImageList.value) {
        const imagesList = document.getElementById("list_image__");
        if (imagesList) {
          if (event.deltaY > 0) {
            imagesList.scrollLeft += 30;
          } else {
            imagesList.scrollLeft -= 30;
          }
        }
        return;
      }
      const zoomFactor = Math.abs(event.deltaY) / 50;
      if (event.deltaY < 0) {
        zoomImage("in", zoomFactor);
      } else {
        zoomImage("out", zoomFactor);
      }
    };
    const updateImageSize = () => {
      const { min } = getConfig();
      const img = new Image();
      img.src = imageUrl.value;
      img.onload = () => {
        width.value = img.naturalWidth / window.innerWidth * 100;
        height.value = img.naturalWidth / window.innerWidth * 100;
        if (width.value > 90)
          width.value = 90;
        if (height.value > 90)
          height.value = 90;
        if (width.value < min)
          width.value = min;
        if (height.value < min)
          height.value = min;
        if (`${prevSize}` == `${[width.value, height.value]}`) {
          width.value = width.value * 0.9;
          height.value = width.value * 0.9;
        }
        prevSize = [width.value, height.value];
      };
    };
    const focusOnImage = (index) => {
      const selectedImage = document.getElementById(`image___${index}`);
      if (selectedImage) {
        selectedImage.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    };
    const onNavigate = (i) => {
      const loop = props.config?.loop ?? false;
      if (i == 0) {
        if (currentIndex.value > 0) {
          currentIndex.value--;
        } else if (loop) {
          currentIndex.value = props.images.length - 1;
        }
      } else {
        if (currentIndex.value < props.images.length - 1) {
          currentIndex.value++;
        } else if (loop) {
          currentIndex.value = 0;
        }
      }
      imageUrl.value = props.images[currentIndex.value];
      updateImageSize();
      focusOnImage(currentIndex.value);
    };
    const close = () => {
      emit("update:modelValue", false);
    };
    const onAction = (action) => {
      switch (action) {
        case "copy":
          utils.copy(imageUrl.value, "Image url/path has been copied.");
          break;
        case "download":
          if (!props?.onDownload) {
            return utils.downloadFile(imageUrl.value);
          }
          emit("download", imageUrl.value);
          break;
        default:
          break;
      }
    };
    const onSelectImage = (index) => {
      currentIndex.value = index;
      imageUrl.value = props.images[index];
      updateImageSize();
      focusOnImage(index);
    };
    const initKeyShortcut = (value = true) => {
      if (!value) {
        return document.onkeydown = null;
      }
      document.onkeydown = (e) => {
        if ((e.key == "Escape" || e.key == "Esc") && localValue.value) {
          e.preventDefault();
          localValue.value = false;
          emit("update:modelValue", false);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          onNavigate(e.key === "ArrowLeft" ? 0 : 1);
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          zoomImage(e.key === "ArrowUp" ? "in" : "out", 10);
        }
      };
    };
    onMounted(() => {
      initActions();
      window.addEventListener("wheel", adjustSize);
      initKeyShortcut();
    });
    watch(() => props.actions, (_) => {
      initActions();
    });
    watch(() => props.modelValue, (value) => {
      localValue.value = value;
      width.value = 10;
      height.value = 10;
      initKeyShortcut(value);
      if (value && props.images.length != 0) {
        imageUrl.value = props.active ?? props.images[0];
        updateImageSize();
        const index = props.images.findIndex((e) => e == props.active);
        currentIndex.value = index < 0 ? 0 : index;
      }
      document.body.style.overflow = value ? "hidden" : "auto";
    });
    return {
      localValue,
      currentIndex,
      width,
      height,
      imageUrl,
      isCursorInImageList,
      actionsControl,
      resizeToDefault,
      onAction,
      adjustSize,
      updateImageSize,
      onNavigate,
      close,
      onSelectImage,
      imageStyle: computed(() => ({
        backgroundImage: `url('${imageUrl.value}')`,
        width: `${width.value}%`,
        height: `${height.value}%`
      }))
    };
  }
};
</script>


<style scoped>
.image-viewer {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  z-index: 999;
  opacity: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-viewer.show {
  opacity: 1;
  pointer-events: all;
}
.image-viewer .navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.image-viewer .navigator span {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ccc;
  transition: 0.1s;
  z-index: 99;
}
.image-viewer .navigator span.disabled {
  opacity: 0;
  pointer-events: none;
}
.image-viewer .navigator span .ti {
  --tblr-icon-size: 2.3rem;
  width: var(--tblr-icon-size);
  height: var(--tblr-icon-size);
  font-size: var(--tblr-icon-size);
}
.image-viewer .navigator span:hover {
  color: white;
}
.image-viewer .navigator .left {
  margin-left: 25px;
}
.image-viewer .navigator .right {
  margin-right: 25px;
}
.image-viewer .image {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}
.image-viewer .controls {
  position: fixed;
  top: 20px;
  right: 15px;
  z-index: 99;
}
.image-viewer .controls span {
  cursor: pointer;
  color: white;
  transition: 0.1s;
  padding: 15px;
}
.image-viewer .controls span:hover {
  opacity: 0.7;
}
.image-viewer .controls span .ti {
  --tblr-icon-size: 1.0rem;
  width: var(--tblr-icon-size);
  height: var(--tblr-icon-size);
  font-size: var(--tblr-icon-size);
}
.image-viewer .list-images {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  max-width: 50%;
}
.image-viewer .list-images::before, .image-viewer .list-images::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;
  z-index: 1;
  pointer-events: none;
}
.image-viewer .list-images::before {
  left: 0;
  border-radius: 10px;
}
.image-viewer .list-images::after {
  right: 0;
  border-radius: 10px;
}
.image-viewer .list-images ul {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: inline-block;
  padding: 10px;
  scrollbar-width: none;
}
.image-viewer .list-images li {
  height: 53px;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
}
.image-viewer .list-images li img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  transition: 0.2s;
  object-fit: cover;
}
.image-viewer .list-images li.active img {
  border: 2px solid #fff;
  width: 65px;
  height: 65px;
}
</style>