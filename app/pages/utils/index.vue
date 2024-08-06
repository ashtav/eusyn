<template>
    <div class="container">
        <PageHeader title="Utilities" />

        <div class="row">
            <div class="col-6">
                <FileHandler @select="handleFile" />
            </div>

            <div v-if="image.data">
                <h4>Image Quality</h4>
                <Row :gap="15">
                    <div style="width: 200px" v-for="img in images" class="d-inline-block me-2">
                        <img :src="img.data" alt="" class="rounded mb-3 d-block" style="object-fit: cover">

                        <code class="ps-0">Q: {{ img.quality ?? 1 }} | {{ img.size }} | {{ img.dimension }}</code>
                    </div>
                </Row>
            </div>

            <div class="mt-5" v-if="image.data">
                <h4>Image Resize</h4>
                <Row :gap="15">
                    <div style="width: 200px" v-for="img in image_resizes" class="d-inline-block me-2">
                        <img :src="img.data" alt="" class="rounded mb-3 d-block" style="object-fit: cover">

                        <code class="ps-0">{{ img.size }} | {{ img.dimension }}</code>
                    </div>
                </Row>

                <br>
                <Row :gap="5">
                    <Button label="Flip H" icon="ti-flip-vertical" @click="onFlip('horizontal')" />
                    <Button label="Flip V" icon="ti-flip-horizontal" @click="onFlip('vertical')" />
                    <Button label="Rotate" icon="ti-rotate" @click="onRotate" />
                </Row>
            </div>
        </div>

        <!-- <div class="mb-2">
            {{ $_.ucwords('hello world!') }}
        </div>
        <pre><code>$_.ucwords('hello world!')</code></pre>

        $image.quality(base64, .9) -->

    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    data() {
        return {
            image: <any>{},
            images: <any>[],
            image_resizes: <any>[],
        }
    },

    methods: {
        async handleFile(data: any) {
            if (data.files.length != 0) {
                this.image = data.files[0]
                this.images = data.files
                this.image_resizes = []

                const qualities = [.3, .1]
                const sizes = [[500], [250], [100, 100]]

                qualities.forEach(async (q: number) => {
                    const image = await this.$image.quality(this.image.data, q)
                    this.images.push({ ...image, dimension: `${image.dimensions.width} x ${image.dimensions.height}` })
                });

                sizes.forEach(async (size: Array<number>) => {
                    const image_resizes = await this.$image.resize(this.image.data, size)
                    this.image_resizes.push({ ...image_resizes, dimension: `${image_resizes.dimensions.width} x ${image_resizes.dimensions.height}` })
                })
            }
        },

        onFlip(type: string) {
            this.image_resizes.forEach(async (image: any) => {
                const result = await this.$image.flip(image.data, type)
                image.data = result.data
            })
        },

        onRotate() {
            this.image_resizes.forEach(async (image: any) => {
                const result = await this.$image.rotate(image.data, 'right')
                image.data = result.data
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>