<template>
    <div>
        <PageHeader title="Page Header" :actions="actions" />

        <div class="row">
            <div class="col-7">
                <Code code='<PageHeader title="Page Header" :actions="actions" />' />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    data() {
        return {
            actions: [
                { label: 'Create New', icon: 'ti-plus' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped></style>