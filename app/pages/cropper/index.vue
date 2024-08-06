<template>
    <div class="container">
        <PageHeader title="Cropper" />

        <div class="row">
            <div class="col-6">
                <FileHandler @select="handleFile" />
            </div>

            <Row v-if="image.data" :gap="15">
                <div style="width: 350px">
                    <img :src="preview" alt="" class="rounded mb-3 d-block" style="object-fit: cover">
                    <code
                        class="ps-0">{{ image.name }} | {{ image.type }} | {{ image.size }} | {{ image.dimension }}</code>
                </div>
                <Button label="Crop" theme="btn" icon="ti-crop" @click="onCrop" />
            </Row>
        </div>

        <Cropper ref="cropper" />
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    data() {
        return {
            preview: '',
            image: <any>{}
        }
    },

    methods: {
        handleFile(data: any) {
            if (data.files.length != 0) {
                this.image = data.files[0]
                this.preview = this.image.data
            }
        },

        onCrop() {
            const cropper = this.$refs.cropper as any
            cropper?.init({
                data: this.image.data, onCrop: (result?: string) => {
                    if (result) {
                        this.preview = result
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>