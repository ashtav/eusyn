<template>
    <div class="carousel" ref="carousel">
        <div class="carousel-track-container">
            <ul class="carousel-track" ref="track">
                <slot>
                    <li v-for="(image, i) in images" :key="i"
                        :class="['carousel-slide', { 'current-slide': i == currentIndex }]" v-if="images">
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
            <Ti :icon="(config.arrows ?? []).length == 2 ? config.arrows[i] : `chevron-${btn}`" />
        </button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, type PropType } from 'vue';

interface CarouselConfig {
    autoPlay?: boolean,
    autoPlayInterval?: number, // milliseconds
    maxDots?: number,
    draggable?: boolean,
    infinite?: boolean,
    slideToShow?: number,
    arrows?: Array<string>
}

export default defineComponent({
    props: {
        images: {
            type: Array<string>,
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
            type: Object as PropType<CarouselConfig>,
            default: () => ({
                autoPlay: false,
                autoPlayInterval: 3000,
                maxDots: 7,
                draggable: false,
                infinite: true,
                slideToShow: 1,
                arrows: ['chevron-left', 'chevron-right']
            })
        }
    },

    setup(props, { slots }) {
        const carousel = ref<HTMLElement | null>(null);
        const track = ref<HTMLElement | null>(null);
        const prevButton = ref<HTMLButtonElement | null>(null);
        const nextButton = ref<HTMLButtonElement | null>(null);
        const currentIndex = ref(props.initIndex);

        let autoplayInterval: NodeJS.Timeout | undefined;

        const startAutoplay = () => {
            if (props.config?.autoPlay) {
                autoplayInterval = setInterval(() => {
                    const slides = Array.from(track.value?.children ?? []) as HTMLLIElement[];
                    const nextIndex = currentIndex.value === slides.length - 1 ? 0 : currentIndex.value + 1;
                    moveToSlide(nextIndex);
                }, props.config?.autoPlayInterval ?? 3000);
            }
        };

        const stopAutoplay = () => {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        };

        const moveToSlide = (index: number, animate: boolean = true) => {
            if (track.value) {
                const slides = Array.from(track.value.children) as HTMLLIElement[];
                const amountToMove = -slides[index].offsetLeft;
                track.value.style.transition = animate ? 'transform 0.5s ease-in-out' : '';
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

        const dotStyle = (i: number) => {
            const distance = Math.abs(currentIndex.value - i);
            const scale = 1 - (distance * 0.1);
            return {
                transform: `scale(${scale})`,
                opacity: scale
            };
        };

        const initControls = () => {

            const buttonStatus = (infinite: boolean, slides: Array<any>) => {
                if (!infinite) {
                    if (currentIndex.value === 0) {
                        prevButton.value[0].classList.add('disabled');
                    } else {
                        prevButton.value[0].classList.remove('disabled');
                    }

                    if (currentIndex.value === slides.length - 1) {
                        nextButton.value[0].classList.add('disabled');
                    } else {
                        nextButton.value[0].classList.remove('disabled');
                    }
                }
            }

            [nextButton.value[0], prevButton.value[0]].forEach((e: HTMLButtonElement, i: number) => {
                if (e) {
                    const slides = Array.from(track.value?.children ?? []) as HTMLLIElement[];
                    const infinite = props.config?.infinite ?? true

                    e.addEventListener('click', () => {

                        const nextIndex = currentIndex.value === slides.length - 1
                            ? (infinite ? 0 : slides.length - 1)
                            : currentIndex.value + 1;

                        const prevIndex = currentIndex.value === 0
                            ? (infinite ? slides.length - 1 : 0)
                            : currentIndex.value - 1;


                        const index = i == 0 ? nextIndex : prevIndex
                        moveToSlide(index);
                        buttonStatus(infinite, slides)
                    })

                    buttonStatus(infinite, slides)
                }
            })
        }

        onMounted(() => {
            moveToSlide(currentIndex.value, false)
            startAutoplay()
            initControls()
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


<style lang="scss">
.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    user-select: none;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .dots {
        position: absolute;
        bottom: 15px;
        display: flex;
        justify-content: center;
        width: 100%;

        li {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #ddd;
            border-radius: 50%;
            transition: transform 0.2s, opacity 0.2s;
            margin: 0 5px;
            border: 1px #666 solid;
            cursor: pointer;

            &.active {
                background: white;
            }
        }
    }

    .carousel-track-container {
        overflow: hidden;
        width: 100%;
        background-color: #182433;

        .carousel-track {
            display: flex;
            width: 100%;
            padding: 0;

            .carousel-slide {
                min-width: 100%;
                list-style: none;
                cursor: pointer;

                img {
                    width: 100%;
                    display: block;
                    object-fit: cover;
                    user-select: none !important;
                    -webkit-user-drag: none !important;
                    pointer-events: none !important;
                }
            }
        }
    }
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
    transition: .2s;

    &.disabled {
        opacity: 0 !important;
    }

    &.left {
        left: 10px;
    }

    &.right {
        right: 10px;
    }
}
</style>
