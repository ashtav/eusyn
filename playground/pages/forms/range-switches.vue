<template>
    <div>
        <PageHeader title="Range & Switches" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <p>
                    This section demonstrates how to use range input and switches in your form. You will find
                    examples of
                    their functionalities, advantages, and practical usage scenarios.
                </p>

                <Props :attrs="['label', 'caption', 'disabled', 'required', 'inline', 'reversed', 'v-model']" />

                <Switch v-model="forms.accepted" inline caption="Disable|Enable" />
                <Code class="mb-5"
                    code='<Switch v-model="forms.accepted" inline caption="Disable|Enable" :reversed="false" />' />

                <Props :attrs="['range', 'step', 'indicator', 'multiple', 'disabled', 'v-model']" />

                <Range v-model="forms.range" /> <br>
                <Code class="mb-5" code='<Range v-model="forms.range" />' />

                <Range v-model="forms.ranges" multiple /> <br>
                <Code class="mb-5" code='<Range v-model="forms.range" multiple />' />

                <div>
                    <code>
          {{ forms }}
        </code>
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
            forms: {
                accepted: false,
                range: 0,
                ranges: [10, 30]
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>