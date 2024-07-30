<template>
    <div class="container">
        <!-- header -->
        <PageHeader title="File Handler" />

        <!-- <InputFile /> -->
        <FileHandler @select="onFiles" :accept="['audio:wav,mp3,mpeg']"
            :config="{ maxSize: .2, width: [300, 700], height: [50] }">
            <div class="file-handler">
                <div>
                    <h4 class="mb-0">Select File or Drag Here</h4>
                    <p>You can either click to select a file or simply drag it into this area.</p>
                </div>

            </div>
        </FileHandler>
        <br>
        <FileHandler @select="onFiles" />
            

        <br>
        <!-- <pre><code>this.$</code></pre> -->
    </div>
</template>

<script lang="ts">
export default {
    setup() {


        return {}
    },

    data() {
        return {
            configs: {

            }
        }
    },

    methods: {
        onFiles(files: any) {
            console.log('file-handler', files)
        }
    }
}
</script>

<style lang="scss" scoped>
.file-handler {
    border: 1px #ccc dashed;
    width: 100%;
    height: 250px;
    background-color: #fbfbfb;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:hover {
        cursor: pointer;

        div {
            opacity: .7;
        }
    }
}
</style>