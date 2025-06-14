<template>
    <div class="d-inline">
        <Icon v-if="icon" :icon="`${icon} fix me-2`" />
        <span>{{ value }}</span>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        icon: {
            type: String,
            default: null
        },

        value: {
            type: String,
            default: ''
        },
    }
}
</script>

<style lang="scss" scoped></style>