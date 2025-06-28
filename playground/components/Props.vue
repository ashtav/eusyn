<template>
    <div class="mb-3">
        <h4> &mdash; &nbsp; Props</h4>
        <p>
            <code class="me-1 mb-1 d-inline-block" v-for="(e, i) in attrs" :key="i">{{ e }}</code>
        </p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        attrs: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>