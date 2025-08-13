<template>
    <div :class="['image-viewer', { show }]">
        <!-- image info -->
        <div class="info">
            <li v-if="images.length > 1">{{ info }}</li>
        </div>

        <!-- actions -->
        <div class="actions">
            <span v-for="icon in ['cancel-01']" :key="icon" @click="onAction(icon)">
                <Icon :icon="icon" />
            </span>
        </div>

        <!-- image preview -->
        <div class="image-preview" @wheel="onWheel">
            <div v-if="loading" class="loader"></div>
            <img ref="viewerImg" :src="image?.src" v-show="!!image"
                :style="{ transform: 'scale(' + scale + ')', transition: 'transform 0.2s ease' }" draggable="false"
                @dblclick="onDblClick" />
        </div>

        <!-- image controls -->
        <div class="controls" v-if="images.length > 1">
            <ul>
                <li v-for="icon in ['arrow-left-01', 'arrow-right-01']" :key="icon" @click="onControl(icon)">
                    <Icon :icon="icon" />
                </li>
            </ul>
        </div>

        <!-- images -->
        <div class="image-list" v-show="images.length > 1">
            <div v-for="img in images" :key="img.id" :class="[{ 'selected': imageId == img.id }]">
                <img :src="img.src" class="lazy-img" @click="onImage($event, img)" draggable="false" />
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const images = ref([]);
    const image = ref(null);
    const imageCache = /* @__PURE__ */ new Map();
    const imageId = ref(null);
    const loading = ref(false);
    const show = ref(false);
    const info = ref("");
    const scale = ref(0.6);
    const viewerImg = ref(null);
    const setInfo = (data) => {
      const index = images.value.findIndex((img) => img.id === data.id);
      info.value = `Image ${index + 1} of ${images.value.length}`;
    };
    const preloadImages = () => {
      images.value.forEach((img) => {
        if (!imageCache.has(img.src)) {
          const preloadImg = new Image();
          preloadImg.src = img.src;
          preloadImg.onload = () => imageCache.set(img.src, true);
        }
      });
    };
    const loadImage = (data) => {
      image.value = data;
      imageId.value = data.id;
      setInfo(data);
      const refresh = () => {
        scale.value = 0.3;
        setTimeout(() => scale.value = 0.6, 150);
      };
      if (imageCache.has(data.src)) {
        loading.value = false;
        refresh();
        return;
      }
      const img = new Image();
      img.src = data.src;
      if (img.complete) {
        loading.value = false;
        imageCache.set(data.src, true);
        refresh();
      } else {
        loading.value = true;
        img.onload = () => {
          loading.value = false;
          imageCache.set(data.src, true);
          refresh();
        };
      }
    };
    const centerImage = (el) => {
      const container = document.querySelector(".image-list");
      if (!container || !el)
        return;
      const containerWidth = container.clientWidth;
      const imageWidth = el.clientWidth;
      const scrollPosition = el.offsetLeft - containerWidth / 2 + imageWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    };
    const onImage = (e, img) => {
      const target = e.currentTarget;
      centerImage(target);
      open(img);
    };
    const open = (imageSrc, index) => {
      scale.value = 0.3;
      if (Array.isArray(imageSrc)) {
        images.value = imageSrc.map((src, i2) => ({ src, id: `img-${i2}` }));
        preloadImages();
      }
      if (!imageSrc || Array.isArray(imageSrc) && imageSrc.length === 0) {
        console.error("No images provided to open viewer.");
        return;
      }
      if (!Array.isArray(imageSrc)) {
        show.value = true;
        loadImage(imageSrc);
        return;
      }
      images.value = imageSrc.map((src, i2) => ({ src, id: `img-${i2}` }));
      const i = index && index < images.value.length ? index : 0;
      show.value = true;
      loadImage(images.value[i]);
    };
    const onAction = (icon) => {
      show.value = false;
    };
    const onControl = (icon) => {
      const currentIndex = images.value.findIndex((img) => img.id === imageId.value);
      if (currentIndex === -1)
        return;
      const nextIndex = icon === "arrow-left-01" ? (currentIndex - 1 + images.value.length) % images.value.length : (currentIndex + 1) % images.value.length;
      const nextImage = images.value[nextIndex];
      loadImage(nextImage);
      centerImage(document.querySelector(`.image-list div:nth-child(${nextIndex + 1})`));
    };
    const onWheel = (event) => {
      if (event.preventDefault) {
        event.preventDefault();
      }
      const delta = event.deltaY;
      if (delta < 0) {
        scale.value = Math.min(scale.value + 0.1, 5);
      } else {
        scale.value = Math.max(scale.value - 0.1, 0.3);
      }
    };
    const onDblClick = () => {
      scale.value = scale.value < 0.6 ? 0.6 : scale.value >= 1 ? 0.6 : 1;
    };
    onMounted(() => {
      const container = document.querySelector(".image-list");
      if (!container)
        return;
      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      });
      document.onkeydown = (e) => {
        if ((e.key == "Escape" || e.key == "Esc") && show.value) {
          e.preventDefault();
          show.value = false;
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          onControl(e.key === "ArrowLeft" ? "arrow-left-01" : "arrow-right-01");
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          onWheel({
            deltaY: e.key === "ArrowUp" ? -100 : 100
          });
        }
      };
    });
    return {
      images,
      image,
      imageId,
      loading,
      show,
      info,
      viewerImg,
      scale,
      onImage,
      open,
      onAction,
      onControl,
      onWheel,
      onDblClick
    };
  }
};
</script>

<style scoped>
.image-viewer {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease-in-out;
}
.image-viewer.show {
  display: flex;
  opacity: 1;
  pointer-events: all;
}
.image-viewer.show .image-preview {
  opacity: 1;
}
.image-viewer .info {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  z-index: 1000;
}
.image-viewer .info li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.image-viewer .image-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s, height 0.3s;
  transform: translate(-50%, -50%);
  opacity: 0;
  user-select: none;
}
.image-viewer .image-preview img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease;
}
.image-viewer .image-preview .loader {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.image-viewer .actions {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  z-index: 10000;
}
.image-viewer .actions span {
  cursor: pointer;
  padding: 5px 13px;
}
.image-viewer .actions span:hover {
  opacity: 0.7;
}
.image-viewer .actions span:active {
  opacity: 1;
}
.image-viewer .controls {
  display: flex;
  align-items: center;
}
.image-viewer .controls ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.image-viewer .controls ul li {
  margin: 0 10px;
  cursor: pointer;
}
.image-viewer .controls ul li:hover {
  opacity: 0.7;
}
.image-viewer .controls ul li:active {
  opacity: 1;
}
.image-viewer .controls ul li i {
  font-size: 40px;
}
.image-viewer .controls ul li:first-child {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.image-viewer .controls ul li:last-child {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.image-viewer .image-list {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: nowrap;
  gap: 1px;
  max-width: 80%;
  overflow-y: hidden;
  overflow-x: auto;
  height: 70px;
  padding: 5px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.image-viewer .image-list div {
  flex: 0 0 auto;
  border: 1px transparent solid;
  transition: 0.2s cubic-bezier(0.34, 1.86, 0.64, 1);
  border-radius: 6px;
  width: 50px;
  height: 50px;
}
.image-viewer .image-list div.selected {
  border: 1px white solid;
  transform: scale(1.2);
}
.image-viewer .image-list div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 6px;
}
.image-viewer .image-list div img:hover {
  opacity: 0.7;
}
.image-viewer .image-list div img:active {
  opacity: 1;
}
</style>