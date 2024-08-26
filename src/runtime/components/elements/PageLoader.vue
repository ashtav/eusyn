<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
        <div class="container container-slim py-4">
            <div class="text-center">
                <div class="text-secondary mb-3" v-text="title" />
                <div class="progress progress-sm">
                    <div class="progress-bar progress-bar-indeterminate"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        title: {
            type: String,
            default: 'Preparing application'
        }
    },

    setup() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>