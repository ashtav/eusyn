<template>
    <div>
        <PageHeader title="Radio & Checkbox" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <p>
                    This section demonstrates how to use radio buttons and checkboxes in your form. You will find
                    examples of
                    their functionalities, advantages, and practical usage scenarios.
                </p>

                <Props :attrs="['label', 'value', 'disabled', 'required', 'emptyMessage', 'options', 'v-model']" />

                <Radio v-model="forms.gender" label="Gender" :options="['Male', 'Female']" required nospace ref="el" />

                <a href="javascript:void(0)" class="d-inline-block" @click="setLoading">Loading example</a>
                <Code class="mb-5" code='this.$loading(true, "radio") // set busy' />

                <Radio v-model="forms.blood" label="Blood Type"
                    :options="[{ label: 'A', value: 1 }, { label: 'B' }, 'AB', { label: 'O', disabled: true }]"
                    required />

                <Code class="mb-5" code='<Radio v-model="forms.gender" label="Gender" :options="genders" required />' />

                <!--
              You can also use an array of objects like [{label: 'A', value: 1}, {label: 'B', value: 2}, etc.] for the options.
              Therefore, your `forms.blood` should be set to a value from this array, for example: forms.blood = 1.
          -->

                <Checkbox v-model="forms.favorites" label="Favorite Fruit" required :options="fruits" />

                <Code class="mb-5"
                    code='<Checkbox v-model="forms.favorites" label="Favorite Fruit" required :options="fruits" />' />

                <Checkbox v-model="forms.checked" />
                <Code class="mb-5" code='<Checkbox v-model="forms.checked" />'
                    description="A simple checkbox with true/false value" />

                <ul class="list-unstyled d-flex flex-wrap">
                    <li v-for="(e, i) in 5" class="d-inline-block me-2">
                        <Checkbox v-model="selected" :value="i" />
                    </li>

                    <code>{{ selected }}</code>
                </ul>

                <Code class="mb-5" code='<Checkbox v-model="selected" :value="i" />'
                    description="A checkbox for each item in the list" />

                <div>
                    <code class="mb-5 d-block">
          {{ forms }}
        </code>

                    <Checkbox v-model="forms.category" label="Checkbox With Value" :options="categories" required />

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
            categories: [
                { label: 'Food', value: 1 },
                { label: 'Drink', value: 2 },
                { label: 'Fruit', value: 3 },
                { label: 'Vegetable', value: 4, disabled: true }
            ],

            fruits: ['Apple', 'Banana', 'Mango', 'Papaya', 'Orange', 'Avocado', 'Strawberry', 'Pineapple'],

            forms: <any>{
                gender: 'Male',
                blood: 'A',
                checked: true,
                favorites: ['Banana', 'Mango'],
                category: [1, 6]
            },

            selected: []
        }
    },

    methods: {
        setLoading() {
            this.$loading(true)

            setTimeout(() => {
                this.$loading(false)
            }, 3000)
        }
    },

    mounted() {
        this.forms.blood = 1

        setTimeout(() => {
            this.forms.gender = 'Female'
        }, 1000)
    }
}
</script>

<style lang="scss" scoped></style>