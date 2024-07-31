<template>
    <div @click="onClick" @dragover="onDragged" @dragleave="onDragged" @drop="onDropped">
        <slot />

        <div v-if="!$slots.default">
            <Input :label="config.label" :hint="config.hint ?? 'Please select file'" readonly :required="config.required" :suffixs="[{
        text: 'Browse', kbd: true
    }]" v-model="input" />
        </div>

        <input type="file" ref="fileInput" :accept="acceptFile" @change="handeFiles" class="d-none"
            :multiple="multiple" />
    </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils.js';

interface Config {
    maxSize?: number, // Megabytes
    width?: Array<number>,
    height?: Array<number>,
    label?: string,
    hint?: string,
    required?: boolean
}

export default {
    emits: ['select', 'dragged'],

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
                height: [],
                label: null,
                hint: null,
                required: false,
            }
        },

        draggable: {
            type: Boolean,
            default: false
        }
    },

    setup(props, { emit, slots }) {
        const acceptFile: Ref<string> = ref('')
        const fileInput = ref(null)
        const input = ref('');

        let dragging = false

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

        const onDragged = (event: DragEvent) => {
            if (!props.draggable) return

            event.stopPropagation();
            event.preventDefault();
            dragging = event.type === 'dragover';
            event.dataTransfer.dropEffect = 'copy';

            emit('dragged', { dragover: dragging })
        }

        const onDropped = async (event: DragEvent) => {
            if (!props.draggable) return

            event.stopPropagation();
            event.preventDefault();
            dragging = false;

            const result = await filterFiles(event.dataTransfer.files);
            emit('dragged', { dragover: dragging, errors: result.errors, files: result.files })
        }

        const megabytesToBytes = (value: number) => {
            return 1024 * 1024 * value
        }

        // filter files based on configuration
        const filterFiles = (files: FileList) => {
            return new Promise<{ errors: any[], files: any[] }>(async (resolve) => {
                // get config
                const maxSize = megabytesToBytes(props.config.maxSize ?? 3) // 3Mb
                const width = props.config.width ?? [] // [min, max]
                const height = props.config.height ?? [] // [min, max]

                let errors = []
                let result = []

                const promises = Array.from(files).map((file) => {
                    return new Promise<void>((resolve) => {
                        let isValid = true

                        // check max file size
                        if (file.size > maxSize) {
                            errors.push({ type: 'size', file: file.name, message: `File size must be less than ${utils.formatBytes(maxSize)}. Your file size is ${utils.formatBytes(file.size)}` })
                        }

                        // validate file format
                        if (!acceptFile.value.includes(file.type)) {
                            errors.push({ type: 'format', file: file.name, message: `File type must be ${acceptFile.value}. Your file type is ${file.type}` })
                        }

                        // set isValid
                        isValid = file.size <= maxSize && acceptFile.value.includes(file.type)

                        const reader = new FileReader();
                        reader.onload = (event) => {

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
                                                file: file.name,
                                                message: `Your image width must be ${min === max ? `exactly ${min}px` : `between ${min}px and ${max}px`}. Current width is ${img.width}px.`
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
                                                file: file.name,
                                                message: `Your image height must be ${min === max ? `exactly ${min}px` : `between ${min}px and ${max}px`}. Current height is ${img.height}px.`
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

                                    resolve()
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
                                resolve()
                            }
                        }

                        reader.readAsDataURL(file);
                    });
                });

                // wait for all files to be processed
                await Promise.all(promises);

                // reset input file value
                (fileInput.value as any).value = '';

                // return data
                resolve({ errors: errors, files: result })
            });
        }

        const handeFiles = async (e: any) => {
            // check if browser support FileReader
            if (typeof FileReader != "function") {
                emit('select', { errors: [{ message: 'Your browser does not support FileReader.', type: 'browser' }] })
            } else {
                const files: FileList = e.target.files
                const result = await filterFiles(files)
                emit('select', result)

                if (!slots.default == true) {
                    const files = result.files

                    if (files.length == 1) {
                        input.value = files[0].name
                    } else {
                        input.value = files[0].name + ` and ${files.length - 1} other files`
                    }
                }
            }
        }

        onMounted(() => {
            reFormat()
        })

        watch(() => props.accept, (_) => {
            reFormat()
        })

        return { acceptFile, fileInput, input, onClick, handeFiles, onDragged, onDropped }
    }
}
</script>

<style lang="scss" scoped></style>