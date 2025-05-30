<template>
    <div>
        <!-- header -->
        <PageHeader title="Spinner" />

        <div class="row">
            <div class="col-lg-6">

                <div class="mb-5">
                    <div class="mb-3">
                        <Spinner class="me-2" /> Loading...
                    </div>
                    <Code class="mb-5" code='<Spinner class="me-2" /> Loading...' />

                    <div class="mb-3">
                        <Spinner label="On progress..." />
                    </div>
                    <Code class="mb-5" code='<Spinner label="On progress..." />' />

                    <div class="mb-3">
                        <Spinner size="md" class="text-orange" />
                    </div>
                    <Code class="mb-5" code='<Spinner size="md" class="text-orange" />' />

                    <div class="mb-3">
                        <Button label="Show Loader" @click="onLoading" />
                    </div>
                    <Code class="mb-5" code='this.$e.overlay("In progress, please wait...");
this.$e.overlay(false) // close' />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    methods: {
        onLoading() {
            this.$e.overlay('In progress, please wait...')

            setTimeout(() => {
                this.$e.overlay(false)
            }, 3000);
        }
    }
}
</script>