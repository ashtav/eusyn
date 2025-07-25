<template>
    <div>
        <PageHeader title="Date Picker" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <Props :attrs="[
                    'label:string',
                    'minDate:string',
                    'maxDate:string',
                    'disabled:boolean',
                    'required:boolean',
                ]" />

                <DatePicker v-model="date" :max-date="$u.now({ add: 5 })" :min-date="$u.now({ subtract: 5 })" />
                <Code class="mt-1"
                    code='<DatePicker v-model="date" :max-date="$u.now({ add: 5 })" :min-date="$u.now({ subtract: 5 })" />' />

                <hr>

                <h2>Date</h2>
                <Props
                    :attrs="['label:string', 'prefix:string', 'disabled:boolean', 'readonly:boolean', 'required:boolean', 'minDate:string', 'maxDate:string', 'v-model:string']" />

                <Date label="Date Scroll" prefix="hgi-calendar-01" :maxDate="$e.utils.now()" />
                <Code class="mb-3" code='<Date label="Date Scroll" prefix="ti-calendar" />' />

                <hr>
                <h2>Date Range Picker - Scroll</h2>
                <p class="text-secondary">
                    This example demonstrates how to use a date range picker component with scrollable selection. You
                    can select a start and end date within the allowed range.
                </p>
                <code>{{ dates }}</code>
                <div>
                    <DateRange v-model="dates" /> <br>

                    <Code class="mt-1" code='<DateRange v-model="dates" />' /> <br>
                    <DateRange v-model="dates"> Example with Text! </DateRange>
                    <Code class="mt-1" code='<DateRange v-model="dates"> Example with Text! </DateRange>' />
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

    data() {
        return {
            date: '',
            dates: []
        }
    },

    methods: {

    },

    mounted() {
        this.date = this.$u.now()
    }
}
</script>

<style lang="scss" scoped></style>