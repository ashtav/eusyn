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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>