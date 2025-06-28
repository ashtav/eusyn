<template>
    <div>
        <PageHeader title="Page Header" :breadcrumb="[
            { label: 'Back to Dashboard', path: '/' },
            { label: 'Page Header' },
        ]" :actions="actions" @click="onRefresh" />

        <div class="row">
            <div class="col-7">
                <Code
                    code='<PageHeader title="Page Header" :breadcrumb="[{label, path}]" :actions="[{label, icon, click}]" />' />
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
                { icon: 'hgi-settings-01', theme: 'btn-white', submit: false },
                { label: 'Create New', icon: 'hgi-add-01', click: this.createNew },
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

            setTimeout(() => {
                this.actions[0].submit = false
            }, 3000);
        }
    }
}
</script>

<style lang="scss" scoped></style>