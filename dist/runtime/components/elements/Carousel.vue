<template>
    <div class="custom-carousel" ref="carousel">
        <div class="custom-carousel-track-container">
            <ul class="custom-carousel-track" ref="track">
                <slot>
                    <li v-for="(image, i) in images" :key="i"
                        :class="['custom-carousel-slide', { 'current-slide': i == currentIndex }]" v-if="images">
                        <img :src="image" alt="" :height="height" draggable="false" onmousedown="return false"
                            style="pointer-events: none;">
                    </li>
                </slot>
            </ul>

            <ul class="dots">
                <li v-for="(i, index) in displayedDots" :key="index" :class="[{ 'active': i == currentIndex }]"
                    :style="dotStyle(i)" @click="moveToSlide(i)"></li>
            </ul>
        </div>

        <!-- controls -->
        <button v-for="(btn, i) in ['left', 'right']" :class="['carousel-button', btn]"
            :ref="['prevButton', 'nextButton'][i]">
            <Icon :icon="(config.arrows ?? []).length == 2 ? config.arrows[i] : `chevron-${btn}`" />
        </button>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
export default defineComponent({
  props: {
    images: {
      type: Array,
      default: () => []
    },
    initIndex: {
      type: Number,
      default: 0
    },
    height: {
      type: [Number, String],
      default: 250
    },
    config: {
      type: Object,
      default: () => ({
        autoPlay: false,
        autoPlayInterval: 3e3,
        maxDots: 7,
        draggable: false,
        infinite: true,
        slideToShow: 1,
        arrows: ["chevron-left", "chevron-right"]
      })
    }
  },
  setup(props, { slots }) {
    const carousel = ref(null);
    const track = ref(null);
    const prevButton = ref(null);
    const nextButton = ref(null);
    const currentIndex = ref(props.initIndex);
    let autoplayInterval;
    const startAutoplay = () => {
      if (props.config?.autoPlay) {
        autoplayInterval = setInterval(() => {
          const slides = Array.from(track.value?.children ?? []);
          const nextIndex = currentIndex.value === slides.length - 1 ? 0 : currentIndex.value + 1;
          moveToSlide(nextIndex);
        }, props.config?.autoPlayInterval ?? 3e3);
      }
    };
    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };
    const moveToSlide = (index, animate = true) => {
      if (track.value) {
        const slides = Array.from(track.value.children);
        const amountToMove = -slides[index].offsetLeft;
        track.value.style.transition = animate ? "transform 0.5s ease-in-out" : "";
        track.value.style.transform = `translateX(${amountToMove}px)`;
        currentIndex.value = index;
      }
    };
    const displayedDots = computed(() => {
      const maxDots = props.config?.maxDots ?? 7;
      const totalDots = track.value?.children.length || 0;
      const half = Math.floor(maxDots / 2);
      let start = Math.max(currentIndex.value - half, 0);
      let end = Math.min(start + maxDots, totalDots);
      if (end - start < maxDots) {
        start = Math.max(end - maxDots, 0);
      }
      return Array.from({ length: end - start }, (_, i) => start + i);
    });
    const dotStyle = (i) => {
      const distance = Math.abs(currentIndex.value - i);
      const scale = 1 - distance * 0.1;
      return {
        transform: `scale(${scale})`,
        opacity: scale
      };
    };
    const initControls = () => {
      const buttonStatus = (infinite, slides) => {
        if (!infinite) {
          if (currentIndex.value === 0) {
            prevButton.value[0].classList.add("disabled");
          } else {
            prevButton.value[0].classList.remove("disabled");
          }
          if (currentIndex.value === slides.length - 1) {
            nextButton.value[0].classList.add("disabled");
          } else {
            nextButton.value[0].classList.remove("disabled");
          }
        }
      };
      [nextButton.value[0], prevButton.value[0]].forEach((e, i) => {
        if (e) {
          const slides = Array.from(track.value?.children ?? []);
          const infinite = props.config?.infinite ?? true;
          e.addEventListener("click", () => {
            const nextIndex = currentIndex.value === slides.length - 1 ? infinite ? 0 : slides.length - 1 : currentIndex.value + 1;
            const prevIndex = currentIndex.value === 0 ? infinite ? slides.length - 1 : 0 : currentIndex.value - 1;
            const index = i == 0 ? nextIndex : prevIndex;
            moveToSlide(index);
            buttonStatus(infinite, slides);
          });
          buttonStatus(infinite, slides);
        }
      });
    };
    onMounted(() => {
      moveToSlide(currentIndex.value, false);
      startAutoplay();
      initControls();
    });
    onUnmounted(() => {
      stopAutoplay();
    });
    return {
      carousel,
      track,
      currentIndex,
      prevButton,
      nextButton,
      moveToSlide,
      displayedDots,
      dotStyle
    };
  }
});
</script>


<style>
.custom-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  user-select: none;
}
.custom-carousel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.custom-carousel .dots {
  position: absolute;
  bottom: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.custom-carousel .dots li {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #ddd;
  border-radius: 50%;
  transition: transform 0.2s, opacity 0.2s;
  margin: 0 5px;
  border: 1px #666 solid;
  cursor: pointer;
}
.custom-carousel .dots li.active {
  background: white;
}
.custom-carousel .custom-carousel-track-container {
  overflow: hidden;
  width: 100%;
  background-color: #182433;
}
.custom-carousel .custom-carousel-track-container .custom-carousel-track {
  display: flex;
  width: 100%;
  padding: 0;
}
.custom-carousel .custom-carousel-track-container .custom-carousel-track .custom-carousel-slide {
  min-width: 100%;
  list-style: none;
  cursor: pointer;
}
.custom-carousel .custom-carousel-track-container .custom-carousel-track .custom-carousel-slide img {
  width: 100%;
  display: block;
  object-fit: cover;
  user-select: none !important;
  -webkit-user-drag: none !important;
  pointer-events: none !important;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;
}
.carousel-button.disabled {
  opacity: 0 !important;
}
.carousel-button.left {
  left: 10px;
}
.carousel-button.right {
  right: 10px;
}
</style>
