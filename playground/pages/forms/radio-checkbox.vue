<template>
    <div>
        <PageHeader title="Radio & Checkbox" />

        <div class="row">
            <div class="col-lg-6">
                <p>
                    This section demonstrates how to use radio buttons and checkboxes in your form. You will find
                    examples of
                    their functionalities, advantages, and practical usage scenarios.
                </p>

                <Radio v-model="forms.gender" label="Gender" :options="['Male', 'Female']" required />
                <Radio v-model="forms.blood" label="Blood Type"
                    :options="[{ label: 'A' }, { label: 'B' }, 'AB', { label: 'O', disabled: true }]" required />

                <Code class="mb-5" code='<Radio v-model="forms.gender" label="Gender" :options="genders" required />' />

                <!--
              You can also use an array of objects like [{label: 'A', value: 1}, {label: 'B', value: 2}, etc.] for the options.
              Therefore, your `forms.blood` should be set to a value from this array, for example: forms.blood = 1.
          -->

                <Checkbox v-model="forms.favorites" label="Favorite Fruit" required :options="fruits" />

                <Code class="mb-5"
                    code='<Checkbox v-model="forms.favorites" label="Favorite Fruit" required :options="fruits" />' />

                <Checkbox v-model="forms.checked" />
                <Code class="mb-5" code='<Switch v-model="forms.accepted" inline caption="Disable|Enable" />' />

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
            fruits: ['Apple', 'Banana', 'Mango', 'Papaya', 'Orange', 'Avocado', 'Strawberry', 'Pineapple'],

            forms: {
                gender: 'Male',
                blood: 'A',
                checked: true,
                favorites: ['Banana', 'Mango'],
            }
        }
    },

    mounted() {
        setTimeout(() => {
            this.forms.gender = 'Female'
        }, 1000)
    }
}
</script>

<style lang="scss" scoped></style>