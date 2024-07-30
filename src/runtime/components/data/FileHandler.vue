<template>
    <div @click="onClick">
        <slot />

        <div v-if="!$slots.default">
            <Input hint="Please select file" readonly :suffixs="[{
                text: 'Browse', kbd: true
            }]"/>
        </div>

        <input type="file" ref="fileInput" :accept="acceptFile" @change="handeFiles" class="d-none"
            :multiple="multiple" />
    </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils.js';

interface FileResult {
    error?: string,
    files?: FileList
}

interface Config {
    maxSize?: number, // Megabytes
    width?: Array<number>,
    height?: Array<number>
}

export default {
    props: {
        accept: {
            type: Array<string>,
            default: ['image:jpeg,jpg,png']
            // format can be: ['application:pdf,xlxs', 'audio:wav,mp3', 'text:plain,csv', 'video:mp4', 'image:jpeg,jpg,png']
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
                height: []
            }
        }
    },

    setup(props, { emit }) {
        const acceptFile: Ref<string> = ref('')
        const fileInput = ref(null)

        // formatting file accept, ['image:jpeg,jpg,png'] = image/jpeg, image/png, image/jpg
        const reFormat = () => {
            acceptFile.value = props.accept
                .map(format => {
                    const [type, extensions] = format.split(':');
                    return extensions.split(',').map(ext => `${type}/${ext}`).join(', ');
                })
                .join(', ');
        }

        const onClick = () => {
            if (fileInput.value) {
                (fileInput.value as HTMLElement).click()
            }
        }

        const megabytesToBytes = (value: number) => {
            return 1024 * 1024 * value
        }

        // filter files based on configuration
        const filterFiles = (files: FileList) => {

            // get config
            const maxSize = megabytesToBytes(props.config.maxSize ?? 3) // 3Mb
            const width = props.config.width ?? [] // [min, max]
            const height = props.config.height ?? [] // [min, max]

            let errors = <any>[]
            let result = <any>[]

            Array.from(files).forEach((file: File) => {
                let isValid = true

                // check max file size
                if (file.size > maxSize) {
                    errors.push({ type: 'size', error: `File size must be less than ${utils.formatBytes(maxSize)}. Your file size is ${utils.formatBytes(file.size)}` })
                }

                // validate file format
                if (!acceptFile.value.includes(file.type)) {
                    errors.push({ type: 'format', error: `File type must be ${acceptFile.value}. Your file type is ${file.type}` })
                }

                // set isValid
                isValid = file.size <= maxSize && acceptFile.value.includes(file.type)

                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {

                    if (file.type.startsWith('image/')) {

                        // check image dimension
                        let img = new Image();
                        img.src = event.target?.result as string;

                        img.onload = () => {

                            // check width image dimension
                            if (width.length != 0) {
                                const min = width[0]
                                const max = width.length > 1 ? width[1] : min

                                if (img.width < min || img.width > max) {
                                    isValid = false
                                    errors.push({
                                        type: 'dimension',
                                        error: `Your image width must be ${min === max ? `exactly ${min}px` : `between ${min}px and ${max}px`}. Current width is ${img.width}px.`
                                    });

                                }
                            }

                            // check height image dimension
                            if (height.length != 0) {
                                const min = height[0]
                                const max = height.length > 1 ? height[1] : min

                                if (img.height < min || img.height > max) {
                                    isValid = false
                                    errors.push({
                                        type: 'dimension',
                                        error: `Your image height must be ${min === max ? `exactly ${min}px` : `between ${min}px and ${max}px`}. Current height is ${img.height}px.`
                                    });
                                }
                            }

                            if (isValid) {
                                result.push({
                                    data: event.target?.result,
                                    name: file.name,
                                    type: file.type,
                                    size: utils.formatBytes(file.size),
                                    dimension: `${img.width} x ${img.height}`
                                })
                            }
                        }
                    }

                    // handle other files
                    else {
                        if (isValid) {
                            result.push({
                                data: event.target?.result,
                                name: file.name,
                                type: file.type,
                                size: utils.formatBytes(file.size),
                            })
                        }
                    }
                }

                reader.readAsDataURL(file);
            });

            (fileInput.value as any).value = ''
            return { errors, result }
        }

        const handeFiles = (e: any) => {
            const result: FileResult = {
                error: '',
            }

            // check if browser support FileReader
            if (typeof FileReader != "function") {
                result.error = 'Your browser does not support FileReader.'
            } else {
                const files: FileList = e.target.files
                let filtered = filterFiles(files)

                console.log(filtered)
            }



            emit('select', result)
        }

        onMounted(() => {
            reFormat()
        })

        watch(() => props.accept, (_) => {
            reFormat()
        })

        return { acceptFile, fileInput, onClick, handeFiles }
    }
}
</script>

<style lang="scss" scoped></style>