<template>
    <div>
        <PageHeader title="Textarea" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <Props
                    :attrs="['label:string', 'hint:string', 'disabled:boolean', 'readonly:boolean', 'required:boolean', 'autofocus:boolean', 'maxLength:number', 'prefix:string', 'suffix:[{icon:string}]', 'formatters:string', 'v-model:string']" />

                <Textarea label="Description" hint="Type description about you..." prefix="hgi-note-02" :suffix="[
                    { icon: 'hgi-information-circle', tooltip: 'Information' },
                    { icon: 'hgi-copy-02' }
                ]" formatters="ucfirst" v-model="note" required />


                <Code class="mb-3"
                    code='<Textarea label="Description" hint="Type description about you..." prefix="ti-note" formatters="ucfirst" />' />

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
            note: ''
        }
    },

    methods: {

    },

    mounted() {
    }
}
</script>

<style lang="scss" scoped></style>