<template>
    <div>
        <PageHeader title="Time Picker" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <Props
                    :attrs="['label:string', 'prefix:string', 'disabled:boolean', 'readonly:boolean', 'required:boolean', 'time:string', 'format:string', 'shape:string', 'v-model:string']" />
                <Time label="Time" prefix="hgi-clock-01" format="h:i" v-model="time" />
                <Code class="mb-3"
                    code='<Time label="Select Time" prefix="clock" format="h:i" v-model="forms.time" />' />

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
            time: ''
        }
    },

    methods: {

    },

    mounted() {
    }
}
</script>

<style lang="scss" scoped></style>