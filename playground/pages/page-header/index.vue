<template>
    <div>
        <PageHeader title="Page Header" :breadcrumb="[
            { label: 'Back to Dashboard', path: '/' },
            { label: 'Page Header' },
        ]" :actions="actions" @click="onRefresh" />

        <div class="row mb-3">
            <div class="col-7 space-y-3">
                <Props :attrs="['pretitle', 'title', 'actions', 'breadcrumb']" />

                <Code
                    code='<PageHeader title="Page Header" :breadcrumb="[{label, path}]" :actions="[{label, icon, click}]" />' />

                <Code code='// another example
<PageHeader actions: [{label: "Dropdown",  options: [{
label: "Profile", icon: "hgi-user-circle", separate: true},
}], click: (e) => {}}] />' />
            </div>
        </div>

        <Button label="Show/Hide Action" @click="toggleActions" />

    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    computed: {
        actions() {
            return [
                { icon: 'hgi-link-01', url: '/', theme: 'btn-white' },
                {
                    icon: 'hgi-settings-01', theme: 'btn-white', options: [
                        { label: 'Profile', icon: 'hgi-user-circle', separate: true },
                        { label: 'History', icon: 'hgi-files-01' },
                        { label: 'Task', icon: 'hgi-task-01' }
                    ],
                    click: this.onAction,
                    visible: this.show,
                },
                { label: 'Create New', icon: 'hgi-add-01', click: this.createNew },
            ]
        }
    },

    data() {
        return {
            show: true,
        }
    },

    methods: {
        onRefresh() {
            this.$toast.show('Page has been refreshed!')
        },

        createNew() {
        },

        onAction(action: any) {
            console.log('Action clicked:', action);
        },

        toggleActions() {
            this.show = !this.show
        }
    }
}
</script>

<style lang="scss" scoped></style>