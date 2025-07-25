<template>
    <div>
        <PageHeader title="Number" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <Props
                    :attrs="['label:string', 'hint:string', 'prefix:string', 'required:boolean', 'disabled:boolean', 'readonly:boolean', 'min:number', 'max:number', 'v-model:string']" />
                <Number label="Number" hint="Enter quantity" prefix="hgi-arrange-by-numbers-1-9" required
                    v-model="quantity" :min="-10" />

                <Code class="mb-3"
                    code='<Number label="Number" hint="Enter quantity" prefix="hgi-arrange-by-numbers-1-9" required v-model="quantity" /> ' />
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
            quantity: 10
        }
    }
}
</script>

<style lang="scss" scoped></style>