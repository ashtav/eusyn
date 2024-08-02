<template>
    <div class="img-container" :style="{ width: `${sizes[0]}px`, height: `${sizes[1]}px` }">
        <img :src="finalSrc" loading="lazy" :alt="alt" @load="onLoad" ref="img" />

        <div class="shimmer" v-if="!isLoaded"></div>
    </div>

    <!-- try to use with comparation -->
    <!-- <div class="mb-3 mt-5">
            <code> &lt;img width="{{ img[0] }}" height="{{ img[1] }}" /&gt; </code>
        </div>
        <img height="350" src="https://i.imgur.com/5fQUPDl.jpg" alt="" @load="onLoad">

        <div class="mb-3 mt-5">
            <code> &lt;Image /&gt; </code>
        </div>
        <Image :height="350" src="https://i.imgur.com/5fQUPDl.jpg" :quality=".01" /> 

        onLoad(e: any) {
            const image = e.target

            const oriWidth = image.naturalWidth;
            const oriHeight = image.naturalHeight;

            const width = image.offsetWidth;
            const height = image.offsetHeight;

            this.img = [width, height]

            console.log(`<img> origin: ${oriWidth} x ${oriHeight} | current: ${width} x ${height}`);

        }
        
        
        -->
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
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
            type: [Number]
        },

        height: {
            type: [Number]
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

        const sizes = ref([props.width, props.height])

        const onLoad = () => {

            if (img.value) {
                renderImage()
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

        // const getImageSize = async (url: string) => {
        //     const response = await fetch(url, { method: 'HEAD' });
        //     const contentLength = response.headers.get('Content-Length');
        //     return contentLength ? parseInt(contentLength, 10) : null;
        // };

        // const resetImageQuality = async () => {
        //     let image = new Image();
        //     image.crossOrigin = "anonymous";
        //     image.alt = props.alt
        //     image.src = props.src

        //     image.addEventListener("load", () => resizeImage(image), false);
        // }

        const renderWithQuality = (image: HTMLImageElement) => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            const width: number = sizes.value[0] ?? 0;
            const height: number = sizes.value[1] ?? 0;

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

            // console.log(x, y, drawWidth, drawHeight);

            // Clear the canvas before drawing
            context?.clearRect(0, 0, width, height);

            // Draw the image on the canvas
            context?.drawImage(image, x, y, drawWidth, drawHeight);

            // get data URL
            const dataURLorigin = canvas.toDataURL('image/jpeg');
            const dataURL = canvas.toDataURL('image/jpeg', props.quality); // quality only affected in jpeg format

            // set image data url to image source
            finalSrc.value = dataURL;

            if (img.value) {
                img.value.classList.add('loaded');
                isLoaded.value = true;

                // calculate image size after reset quality
                const sizeOrigin = dataURLtoBlob(dataURLorigin);
                const blob = dataURLtoBlob(dataURL);
                console.log(`Current image size is: ${utils.formatBytes(blob.size)} with ${props.quality} quality, original: ${utils.formatBytes(sizeOrigin.size)}`);
            }
        };

        const adjustImageSize = (image: HTMLImageElement) => {
            const originalWidth = image.naturalWidth;
            const originalHeight = image.naturalHeight;

            let width = props.width
            let height = props.height

            if (width && !height) {
                // Calculate height proportionally
                height = (width * originalHeight) / originalWidth;
            } else if (!width && height) {
                // Calculate width proportionally
                width = (height * originalWidth) / originalHeight;
            } else if (!width && !height) {
                // Default to original size if neither width nor height are provided
                width = originalWidth;
                height = originalHeight;
            }

            sizes.value = [width, height]

            if (img.value) {

                if (props.quality) {
                    renderWithQuality(image)
                } else {
                    img.value.style.width = `${width}px`;
                    img.value.style.height = `${height}px`;

                    img.value.classList.add('loaded');
                    isLoaded.value = true;
                }
            }

            // calculate size here
            console.log(`<img component> origin: ${originalWidth} x ${originalHeight} | adjusted: ${width} x ${height}`);
        }

        const renderImage = () => {
            if (img.value && img.value?.complete) {
                console.log('rendering...')

                let image = new Image();
                image.crossOrigin = "anonymous";
                image.alt = props.alt
                image.src = props.src

                image.addEventListener("load", () => adjustImageSize(image), false);
            } else {
                console.log('img undefined!')
            }
        }

        watch(
            [() => props.src, () => props.width, () => props.height, () => props.quality],
            (value) => {
                console.log(value)
                renderImage();
            }
        );

        onMounted(() => {
            renderImage()
        });

        return { img, sizes, isLoaded, finalSrc, onLoad }
    }
}
</script>

<style lang="scss" scoped>
.img-container {
    position: relative;
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