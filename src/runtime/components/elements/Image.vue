<template>
    <div class="img-container" :style="{ width: `${width}px`, height: `${height}px` }">
        <img :src="finalSrc" loading="lazy" :alt="alt" @load="onLoad" ref="img" :style="{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'cover'
    }">
        <div class="shimmer" v-if="!isLoaded"></div>
    </div>
</template>

<script lang="ts">
import { onMounted, watch } from "vue";
import { utils } from '../../plugins/utils';

export default {
    props: {
        src: {
            type: String,
            required: true
        },

        alt: {
            type: String,
            default: ''
        },

        width: {
            type: [Number, String]
        },

        height: {
            type: [Number, String]
        },

        quality: {
            type: Number,
            default: null
        }
    },

    setup(props) {
        const img = ref<HTMLImageElement | null>(null);
        const isLoaded = ref(false);
        const finalSrc = ref(props.src);

        const onLoad = () => {
            if (img.value) {
                img.value.classList.add('loaded');
                isLoaded.value = true;
            }
        }

        const dataURLtoBlob = (dataURL: string) => {
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], { type: mimeString });
        };

        const getImageSize = async (url: string) => {
            const response = await fetch(url, { method: 'HEAD' });
            const contentLength = response.headers.get('Content-Length');
            return contentLength ? parseInt(contentLength, 10) : null;
        };


        const resetImageQuality = async () => {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.alt = props.alt
            image.src = props.src

            image.addEventListener("load", () => resizeImage(image), false);
        }

        const resizeImage = (image: HTMLImageElement) => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            const width: number = parseInt(`${props.width ?? image.width}`);
            const height: number = parseInt(`${props.height ?? image.height}`);

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Calculate the aspect ratio of the image
            const imgAspectRatio = image.width / image.height;
            const canvasAspectRatio = width / height;

            let drawWidth, drawHeight;

            if (imgAspectRatio > canvasAspectRatio) {
                // Image is wider relative to its height than the canvas
                drawWidth = width;
                drawHeight = width / imgAspectRatio;
            } else {
                // Image is taller relative to its width than the canvas
                drawHeight = height;
                drawWidth = height * imgAspectRatio;
            }

            // Calculate the position to center the image
            const x = (width - drawWidth) / 2;
            const y = (height - drawHeight) / 2;

            console.log(x, y, drawWidth, drawHeight);

            // Clear the canvas before drawing
            context?.clearRect(0, 0, width, height);

            // Draw the image on the canvas
            context?.drawImage(image, x, y, drawWidth, drawHeight);

            // Get data URL
            const dataURL = canvas.toDataURL('image/jpeg', .1); // quality only affected in jpeg format

            finalSrc.value = dataURL;
            const blob = dataURLtoBlob(dataURL);
            const sizeInBytes = blob.size;

            console.log(`Image size in bytes: ${utils.formatBytes(sizeInBytes)}`);
        };


        const renderImage = () => {
            if (img.value && img.value?.complete) {
                if (props.quality) {
                    resetImageQuality()
                } else {
                    img.value.classList.add('loaded');
                    isLoaded.value = true;
                }
            }
        }

        watch(() => props.src, (value) => {
            renderImage()
        });

        onMounted(() => {
            renderImage()
        });

        // onMounted(() => {
        //     if (img.value && img.value?.complete) {
        //         img.value.classList.add('loaded');
        //         isLoaded.value = true;
        //     }
        // })

        // watch([props.src, props.alt], (src, alt) => {

        // })

        return { img, isLoaded, finalSrc, onLoad }
    }
}
</script>

<style lang="scss" scoped>
.img-container {
    position: relative;
    border: 1px #ddd solid;
}

img {
    width: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

img.loaded {
    opacity: 1;
}

.shimmer {
    $color: #ddd;
    $highlight: #edeef1;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right,
            $color 8%,
            $highlight 18%,
            $color 33%);
    background-size: 200% 100%;
    animation: shimmer 3.5s linear infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>