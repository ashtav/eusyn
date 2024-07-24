<template>
    <div class="container py-6">
        <div class="row">
            <div class="col-lg-6">
                <h2>LazyUI - Modal</h2>
                <p class="mb-5">LazyUI's modal component offers a sleek and responsive design for your web applications.
                    Easily
                    customizable and highly flexible, it ensures seamless integration with your existing UI, providing a
                    smooth user experience. Perfect for displaying alerts, forms, and other interactive content.</p>

                <Button label="Open Modal" @click="onClick" />
            </div>

        </div>

        <Modal id="modal"></Modal>
    </div>
</template>

<script lang="ts">
export default {
    setup() {


        return {}
    },

    methods: {
        onClick() {
            this.$modal.show('modal', {
                title: 'New Data',
                data: { id: 1 }
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>