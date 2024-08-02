<template>
    <div class="container">
        <PageHeader title="Utilities" />

        <h4>Image Quality</h4>
        <div class="row">
            <div class="col-6">
                <FileHandler @select="handleFile" />
            </div>

            <Row v-if="image.data" :gap="15">
                <div style="width: 220px" v-for="img in images" class="d-inline-block me-2">
                    <img :src="img.data" alt="" class="rounded mb-3 d-block" style="object-fit: cover">

                    <code class="ps-0">Q: {{ img.quality ?? 1 }} | {{ img.size }} | {{ img.dimension }}</code>
                </div>
            </Row>
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
            images: <any>[]
        }
    },

    methods: {
        async handleFile(data: any) {
            if (data.files.length != 0) {
                this.image = data.files[0]
                this.images = data.files

                const qualities = [.3, .01]

                qualities.forEach(async (q: number) => {
                    const image = await this.$image.quality(this.image.data, q)
                    this.images.push({ ...image, dimension: `${image.dimensions.width} x ${image.dimensions.height}` })
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>