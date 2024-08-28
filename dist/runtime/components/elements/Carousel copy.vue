<template>
    <div class="carousel" ref="carousel">
        <div class="carousel-track-container">
            <ul class="carousel-track" ref="track">
                <li v-for="(image, i) in images" :class="['carousel-slide', { 'current-slide': i == currentIndex }]">
                    <img :src="image" alt="" :height="height" draggable="false" onmousedown="return false">
                </li>
            </ul>

            <ul class="dots">
                <li v-for="(i, index) in displayedDots" :key="index" :class="[{ 'active': i == currentIndex }]"
                    :style="dotStyle(i)" @click="moveToSlide(i)"></li>
            </ul>
        </div>

        <!-- controls -->
        <button class="carousel-button carousel-button--left" ref="prevButton">
            <Ti icon="chevron-left" />
        </button>
        <button class="carousel-button carousel-button--right" ref="nextButton">
            <Ti icon="chevron-right" />
        </button>
    </div>
</template>


<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true
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
      default: {
        autoPlay: false,
        autoPlayInterval: 3e3,
        maxDots: 7,
        draggable: false,
        infinite: true,
        slideToShow: 1
      }
    }
  },
  setup(props) {
    const carousel = ref(null);
    const track = ref(null);
    const prevButton = ref(null);
    const nextButton = ref(null);
    const currentIndex = ref(props.initIndex);
    let autoplayInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = null;
    const handleDragStart = (e) => {
      isDragging = true;
      startPos = e.clientX;
      track.value.style.transition = "none";
      animationID = requestAnimationFrame(animation);
    };
    const handleDragging = (e) => {
      if (!isDragging)
        return;
      const currentPosition = e.clientX;
      currentTranslate = prevTranslate + currentPosition - startPos;
      const slides = Array.from(track.value?.children ?? []);
      const slideWidth = slides[0].offsetWidth;
      const maxTranslate = -Math.min(currentIndex.value + 1, slides.length - 1) * slideWidth;
      currentTranslate = Math.max(currentTranslate, maxTranslate);
      currentTranslate = Math.min(currentTranslate, 0);
    };
    const handleDragEnd = () => {
      isDragging = false;
      cancelAnimationFrame(animationID);
      const slides = Array.from(track.value?.children ?? []);
      if (slides.length == 0)
        return;
      const slideWidth = slides[0].offsetWidth;
      const movedBy = currentTranslate - prevTranslate;
      let nextIndex = currentIndex.value;
      if (movedBy < -slideWidth / 3 && currentIndex.value < slides.length - 1) {
        nextIndex = currentIndex.value + 1;
      } else if (movedBy > slideWidth / 3 && currentIndex.value > 0) {
        nextIndex = currentIndex.value - 1;
      }
      moveToSlide(nextIndex);
      prevTranslate = -nextIndex * slideWidth;
      currentTranslate = prevTranslate;
    };
    const animation = () => {
      if (track.value) {
        track.value.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) {
          requestAnimationFrame(animation);
        }
      }
    };
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
      const totalDots = props.images.length;
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
    onMounted(() => {
      moveToSlide(currentIndex.value, false);
      startAutoplay();
      if (track.value && (props.config.draggable ?? false)) {
        track.value.addEventListener("mousedown", handleDragStart);
        window.addEventListener("mousemove", handleDragging);
        window.addEventListener("mouseup", handleDragEnd);
      }
      if (nextButton.value) {
        nextButton.value.addEventListener("click", () => {
          const slides = Array.from(track.value?.children ?? []);
          const nextIndex = currentIndex.value === slides.length - 1 ? 0 : currentIndex.value + 1;
          moveToSlide(nextIndex);
        });
      }
      if (prevButton.value) {
        prevButton.value.addEventListener("click", () => {
          const slides = Array.from(track.value?.children ?? []);
          const prevIndex = currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1;
          moveToSlide(prevIndex);
        });
      }
    });
    onUnmounted(() => {
      stopAutoplay();
      if (track.value) {
        track.value.removeEventListener("mousedown", handleDragStart);
        window.removeEventListener("mousemove", handleDragging);
        window.removeEventListener("mouseup", handleDragEnd);
      }
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

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.carousel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.carousel .dots {
  position: absolute;
  bottom: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.carousel .dots li {
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
.carousel .dots li.active {
  background: white;
}

.carousel-track-container {
  overflow: hidden;
  width: 100%;
  background-color: #182433;
}

.carousel-track {
  display: flex;
  width: 100%;
  padding: 0;
}

.carousel-slide {
  min-width: 100%;
  list-style: none;
  cursor: pointer;
}

.carousel-slide img {
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
}

.carousel-button--left {
  left: 10px;
}

.carousel-button--right {
  right: 10px;
}
</style>
