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
                :class="[nav, { 'disabled': [currentIndex < 1, currentIndex >= (images.length - 1)][i] }]">
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
        <div class="image" :style="imageStyle"></div>
    </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils.js';

export default {
    emits: ["update:modelValue"],
    inheritAttrs: false,

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },

        images: {
            type: Array<any>,
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
            type: Array<string>,
            default: () => []
        }
    },

    setup(props, { emit }) {
        const localValue = ref(props.modelValue);
        const width = ref(50);
        const height = ref(50);
        const imageUrl = ref('');
        const currentIndex = ref(0);
        const isCursorInImageList = ref(false)
        const actionsControl: Ref<Array<string>> = ref([])

        const initActions = () => {
            const actions = [...new Set(props.actions)]
            actionsControl.value = actions.filter((e: string) => ['copy', 'download'].includes(e))
        }

        const getConfig = () => {
            return {
                min: 30, max: 290
            }
        }

        const adjustSize = (event: WheelEvent) => {
            if (!localValue) return

            if (isCursorInImageList.value) {

                const imagesList = document.getElementById('list_image__');
                if (imagesList) {
                    if (event.deltaY > 0) {
                        imagesList.scrollLeft += 30;
                    } else {
                        imagesList.scrollLeft -= 30;
                    }
                }

                return
            }


            // min-max image size configuration
            const { min, max } = getConfig()
            const zoomFactor = Math.abs(event.deltaY) / 50; // Adjust this factor to control zoom sensitivity

            if (event.deltaY < 0) {
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

        const updateImageSize = () => {
            const { min } = getConfig()

            const img = new Image();
            img.src = imageUrl.value;
            img.onload = () => {
                width.value = (img.naturalWidth / window.innerWidth) * 100;
                height.value = (img.naturalHeight / window.innerHeight) * 100;
                if (width.value > 90) width.value = 90;
                if (height.value > 90) height.value = 90;
                if (width.value < min) width.value = min;
                if (height.value < min) height.value = min;
            };
        };

        const focusOnImage = (index: number) => {
            const selectedImage = document.getElementById(`image___${index}`);
            if (selectedImage) {
                selectedImage.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }

        const onNavigate = (i: number) => {
            if (i == 0) {
                if (currentIndex.value > 0) {
                    currentIndex.value--;
                    imageUrl.value = (props.images[currentIndex.value] as any);
                    updateImageSize();
                    focusOnImage(currentIndex.value)
                }
            } else {
                if (currentIndex.value < props.images.length - 1) {
                    currentIndex.value++;
                    imageUrl.value = (props.images[currentIndex.value] as any);
                    updateImageSize();
                    focusOnImage(currentIndex.value)
                }
            }
        }

        const close = () => {
            emit("update:modelValue", false)
        }

        const onAction = (action: string) => {
            switch (action) {
                case 'copy':
                    utils.copy(imageUrl.value, 'Image url/path has been copied.')
                    break;

                case 'download':
                    utils.downloadFile(imageUrl.value)
                    break;

                default:
                    break;
            }
        }

        const onSelectImage = (index: number) => {
            currentIndex.value = index
            imageUrl.value = props.images[index];
            updateImageSize();
            focusOnImage(index)
        }

        onMounted(() => {
            initActions()
            window.addEventListener('wheel', adjustSize);

            document.onkeydown = (e) => {
                if ((e.key == 'Escape' || e.key == 'Esc') && localValue.value) {
                    e.preventDefault();
                    localValue.value = false;
                    emit("update:modelValue", false);
                }

                // Handle arrow keys for zoom control
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    onNavigate(e.key === 'ArrowLeft' ? 0 : 1)
                }
            };
        });

        watch(() => props.actions, (_) => {
            initActions()
        })

        watch(() => props.modelValue, (value) => {
            localValue.value = value;
            width.value = 10
            height.value = 10

            if (value && props.images.length != 0) {
                imageUrl.value = props.active ?? props.images[0];
                updateImageSize();

                // find and update "currentIndex.value" base on data in props.images
                const index = props.images.findIndex((e: any) => e == props.active);
                currentIndex.value = index < 0 ? 0 : index
            }

            document.body.style.overflow = value ? 'hidden' : 'auto'
        });

        return {
            localValue,
            currentIndex,
            width,
            height,
            imageUrl,
            isCursorInImageList,
            actionsControl,
            onAction,
            adjustSize,
            updateImageSize,
            onNavigate,
            close,
            onSelectImage,
            imageStyle: computed(() => ({
                backgroundImage: `url(${imageUrl.value})`,
                width: `${width.value}%`,
                height: `${height.value}%`
            }))
        };
    }
};
</script>


<style lang="scss" scoped>
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

    &.show {
        opacity: 1;
        pointer-events: all;
    }

    .navigator {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100vh;

        span {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: #ccc;
            transition: .1s;
            z-index: 99;

            &.disabled {
                opacity: 0;
                pointer-events: none;
            }

            .ti {
                --tblr-icon-size: 2.3rem;
                width: var(--tblr-icon-size);
                height: var(--tblr-icon-size);
                font-size: var(--tblr-icon-size);
            }

            &:hover {
                color: white;
            }
        }

        .left {
            margin-left: 25px;
        }

        .right {
            margin-right: 25px;
        }
    }

    .image {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }

    .controls {
        position: fixed;
        top: 20px;
        right: 15px;

        span {
            cursor: pointer;
            color: white;
            transition: .1s;
            padding: 15px;

            &:hover {
                opacity: .7;
            }

            .ti {
                --tblr-icon-size: 1.0rem;
                width: var(--tblr-icon-size);
                height: var(--tblr-icon-size);
                font-size: var(--tblr-icon-size);
            }
        }
    }

    .list-images {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
        max-width: 50%;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50px; // Width of the gradient effect
            z-index: 1;
            pointer-events: none;
        }

        &::before {
            left: 0;
            // background: linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent);
            border-radius: 10px;
        }

        &::after {
            right: 0;
            // background: linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent);
            border-radius: 10px;
        }

        ul {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            display: inline-block;
            padding: 10px;
            scrollbar-width: none;
        }

        li {
            height: 53px;
            display: inline-block;
            margin-right: 5px;
            cursor: pointer;

            img {
                width: 50px;
                height: 50px;
                border-radius: 5px;
                transition: 0.2s;
                object-fit: cover;
            }

            &.active {
                img {
                    border: 2px solid #fff;
                    width: 65px;
                    height: 65px;
                }
            }
        }
    }

}
</style>