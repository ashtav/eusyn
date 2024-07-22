<template>
    <i :class="['ti', icon, size]"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        icon: {
            type: String,
            required: true
        },

        size: {
            type: String,
            default: 'sm'
        }
    }
})
</script>

<style scoped lang="scss">
.ti {
    --tblr-icon-size: 1.05rem;
    width: var(--tblr-icon-size);
    height: var(--tblr-icon-size);
    font-size: var(--tblr-icon-size);
    vertical-align: bottom;
    stroke-width: .1rem;
    margin-bottom: 1px;
    display: inline-block;

    &.xs {
        --tblr-icon-size: 0.9rem;
    }

    &.sm {
        --tblr-icon-size: 1.05rem;
    }

    &.md {
        --tblr-icon-size: 1.25rem;
    }

    &.lg {
        --tblr-icon-size: 1.5rem;
    }

    &.input-prefix {
        margin-bottom: 0px;
        margin-top: 2px;
    }
}
</style>