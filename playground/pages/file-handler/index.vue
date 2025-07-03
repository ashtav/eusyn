<template>
    <div>
        <!-- header -->
        <PageHeader title="File Handler" />

        <div class="row">
            <div class="col-lg-8 space-y-3">
                <Props :attrs="[
                    'accept',
                    'multiple',
                    'config',
                    'draggable',
                    'disabled',
                    'output:base64|file'
                ]" />


                <FileHandler accept="image:jpg,jpeg,png"
                    :config="{ maxSize: 5, width: [300, 1200], height: [300, 2000] }" draggable multiple
                    @dragged="onDragged" @select="onSelect">
                    <div class="file-handler" :class="{ 'dragover': dragover }">
                        <div>
                            <h4 class="mb-0">Select File or Drag Here</h4>
                            <p>You can either click to select a file or simply drag it into this area.</p>
                        </div>
                    </div>
                </FileHandler>

                <Code class="mt-3" code='<FileHandler draggable multiple 
    :config="{ maxSize: 5, width: [300, 1200], height: [300, 2000] }" 
    accept="image:jpg,jpeg,png|audio:mp3,wav" 
    @dragged="onDragged" @select="onSelect">
    // create you own custom style here
</FileHandler>

//  accept: 
        image:jpg,jpeg,png
        audio:mp3,wav
        text:plain,csv
        video:mp4
        application:pdf,xlxs
' />

                <Code class="mt-3" code='onDragged(event: any) {
    this.dragover = event.dragover // data: { return { dragover: false }}

    if (!event.dragover) {
        this.onSelect(event)
    }
}

onSelect(event: any) {
    this.images = event.files // data: { return { images: [] }}

    let errors = event.errors ?? []
    if (errors.length > 0) {
        this.$toast.warning(errors[0].message)
    }
}' />


                <br>
                <FileHandler @select="onSelect" :config="{ label: 'Select File', required: true }" />
                <Code code='<FileHandler :config="{}" @select="onSelect" />' />

                <br>
                <ul class="gallery">
                    <li v-for="image in images">
                        <img :src="image.data" :alt="image.name">
                        <h5>{{ image.name }}</h5>
                    </li>
                </ul>

                <br>
                <FileHandler @select="onSelect" accept="audio:mp3,wav,mpeg|video:mp4,avi,mov"
                    :config="{ label: 'Select Audio/Video', required: true }" />
                <Code
                    code='<FileHandler :config="{}" @select="onSelect" accept="audio:mp3,wav,mpeg|video:mp4,avi,mov" />' />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    data() {
        return {
            dragover: false,
            images: <any>[]
        }
    },

    methods: {
        onDragged(event: any) {
            this.dragover = event.dragover

            if (!event.dragover) {
                this.onSelect(event)
            }
        },

        onSelect(event: any) {
            console.log(event.files)

            event.files.forEach((e: any) => {
                if (e.type.includes('image')) {
                    this.images.push(e)
                }
            });

            let errors = event.errors ?? []
            if (errors.length > 0) {
                this.$toast.warning(errors[0].message)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.file-handler {
    border: 1px #ccc dashed;
    width: 100%;
    height: 200px;
    background-color: #fbfbfb;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &.dragover {
        border-color: #0054a6;

        div {
            opacity: .7;
        }
    }

    &:hover {
        cursor: pointer;

        div {
            opacity: .7;
        }
    }
}

.gallery {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        display: inline-block;
        margin-right: 10px;
        width: 100px;
        vertical-align: top;
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
}

[data-bs-theme=dark] {
    .file-handler {
        background-color: #182433;
        border-color: #344558;
    }
}
</style>