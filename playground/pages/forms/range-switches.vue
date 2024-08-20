<template>
    <div>
        <PageHeader title="Range & Switches" />

        <div class="row">
            <div class="col-lg-6">
                <p>
                    This section demonstrates how to use range input and switches in your form. You will find
                    examples of
                    their functionalities, advantages, and practical usage scenarios.
                </p>
                
                <Switch v-model="forms.accepted" inline caption="Disable|Enable" />
                <Code class="mb-5" code='<Switch v-model="forms.accepted" inline caption="Disable|Enable" />' />

                <input type="range" class="form-range mb-2" value="40" min="0" max="100" step="10">

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
                accepted: false
            }
        }
    },

    mounted() {
        
    }
}
</script>

<style lang="scss" scoped></style>