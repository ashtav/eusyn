<template>
    <div>
        <PageHeader title="Page Header" :actions="actions" @click="onRefresh" />

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
                { icon: 'settings', theme: 'white', submit: false },
                { label: 'Create New', icon: 'plus', click: this.createNew },
            ]
        }
    },

    methods: {
        onRefresh() {
            this.$toast.show('Page has been refreshed!')
        },

        createNew() {
            this.$toast.show('Create new data!')
            this.actions[0].submit = true
        }
    }
}
</script>

<style lang="scss" scoped></style>