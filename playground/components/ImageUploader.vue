<template>
    <div>
        <div class="form-label" :class="{ required }" v-if="label">{{ label }}</div>
        <FileHandler :config="config" :accept="accept" :draggable="draggable" :disabled="disabled" :multiple="multiple"
            @select="onSelect" v-slot="{ dragged }" v-if="images.length === 0">
            <div class="file-handler" :class="{ dragged }">
                <div>
                    <h4 class="mb-0">Select File or Drag Here</h4>
                    <p>You can either click to select a file or simply drag it into this area.</p>
                </div>
            </div>
        </FileHandler>

        <ul class="image-preview" v-else>
            <li v-for="(e, i) in images" :key="i">
                <img :src="e.data" draggable="false" />

                <div class="image-actions">
                    <div>
                        <span v-for="icon in ['view', 'delete-02']" :key="icon" @click="onAction(icon, e, i)">
                            <Icon :icon="`${icon} fix`" />
                        </span>
                    </div>
                </div>
            </li>
            <li class="add-image" v-if="images.length < max">
                <FileHandler :config="config" :accept="accept" :multiple="multiple" @select="onSelect">
                    <div>
                        <Icon icon="plus-sign" />
                    </div>
                </FileHandler>
            </li>
        </ul>

        <ImageViewer ref="viewer" />
    </div>
</template>

<script lang="ts">
interface Config {
    maxSize?: number, // Megabytes
    width?: Array<number>,
    height?: Array<number>,
    label?: string,
    hint?: string,
    required?: boolean
}

export default {
    props: {
        label: {
            type: String,
            default: null
        },

        required: {
            type: Boolean,
            default: false
        },

        accept: {
            type: String,
            default: 'image:jpeg,jpg,png'
            // format could be: ['application:pdf,xlxs', 'audio:wav,mp3', 'text:plain,csv', 'video:mp4', 'image:jpeg,jpg,png']
        },

        multiple: {
            type: Boolean,
            default: false
        },

        config: {
            type: Object as () => Config,
            default: {
                maxSize: 3,
                width: [],
                height: [],
                label: null,
                hint: null,
                required: false,
            }
        },

        draggable: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        max: {
            type: Number,
            default: 10 // Maximum number of images allowed
        }
    },

    setup() {
        const nuxt = useNuxtApp()
        const images = ref<any[]>([])
        const viewer = ref(null)

        const onSelect = (event: any) => {
            event.files.forEach((e: any) => {
                if (e.type.includes('image')) {
                    images.value.push(e)
                }
            });

            let errors = event.errors ?? []
            if (errors.length > 0) {
                nuxt.$toast.warning(errors[0].message)
            }
        }

        const onAction = (action: string, image: any, index: number) => {
            if (action === 'view') {
                const imageSrc = images.value.map(img => img.data)
                openImage(imageSrc, imageSrc.indexOf(image.data))
            } else {
                images.value = images.value.filter((_, i) => i !== index)
            }
        }

        const openImage = (images: string[], index?: number) => {
            (viewer.value as any).open(images, index)
        }

        return { images, viewer, onSelect, onAction }
    }
}
</script>

<style lang="scss" scoped>
.image-preview {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    user-select: none;

    li {
        display: inline-block;
        width: 100px;
        vertical-align: top;
        position: relative;

        img {
            transition: .1s;
        }

        .image-actions {
            position: absolute;
            top: -20px;
            left: 5px;
            padding: 0;
            padding-bottom: 10px;
            opacity: 0;
            pointer-events: none;
            transition: .3s cubic-bezier(0.34, 1.86, 0.64, 1);
            transform: rotate(0deg);

            div {
                display: inline-flex;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid var(--border-color);

                span {
                    cursor: pointer;
                    display: inline-block;
                    padding: 2px 8px;
                    background-color: var(--background-color);

                    &:last-child {
                        border-left: 1px solid var(--border-color);
                    }

                    &:hover i {
                        opacity: .7;
                    }

                    &:active i {
                        opacity: 1;
                    }
                }
            }
        }

        &:hover {
            .image-actions {
                top: -45px;
                opacity: 1;
                pointer-events: all;
                transform: rotate(8deg);
            }

            img {
                transform: scale(1.2) skewY(3deg);
                z-index: 99;
                position: absolute;
                border: 1px white solid;
            }
        }
    }

    h5 {
        word-break: break-all;
        margin-top: 15px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        object-fit: cover
    }

    .add-image div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed var(--border-color);
        border-radius: 6px;
        width: 100px;
        height: 100px;
        cursor: pointer;

        &:hover {
            opacity: .7;
        }

        &:active {
            opacity: 1;
        }
    }
}
</style>