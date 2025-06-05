<template>
    <div>
        <PageHeader title="Counter" />

        <div class="row">
            <div class="col-6">
                <Counter :value="1234567" :duration="2000" v-slot="{ counter }">
                    <span>{{ $e.utils.currency(counter) }}</span>
                </Counter>

                <Code class="mt-3 mb-5" code='<Counter :value="1234567" v-slot="{ counter }">
    <span>{{ $e.utils.currency(counter) }}</span>
</Counter>' />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    setup() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>