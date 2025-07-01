<template>
    <div>
        <PageHeader title="Cropper" />

        <div class="row">
            <div class="col-6 space-y-3">
                <FileHandler @select="handleFile" />

                <Code code='<Cropper ref="cropper" />
<Button icon="ti-crop" @click="onCrop" />' />

                <Code class="mt-2 mb-5" code='onCrop() {
    const cropper = this.$refs.cropper as any
    cropper?.init({
        data: <your-base-64-image>, onCrop: (result?: string) => {
            
        }
    })
}' />
            </div>

            <Row v-if="image.data" :gap="15" class="position-relative">
                <div style="width: 350px">
                    <img :src="preview" alt="" class="rounded mb-3 d-block" style="object-fit: cover">
                    <code
                        class="ps-0">{{ image.name }} | {{ image.type }} | {{ image.size }} | {{ image.dimension }}</code>
                </div>
                <Button theme="btn position-absolute t-10 l-20" icon="hgi-crop" @click="onCrop" />
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

            if (data.errors && data.errors.length > 0) {
                this.$toast.error(data.errors[0].message)
                return
            }

            console.log('Selected file:', data)
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