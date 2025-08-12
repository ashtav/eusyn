<template>
    <div class="image-viewer">

    </div>
</template>

<script lang="ts">
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.image-viewer {
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    &.show {
        display: flex;
    }
}
</style>