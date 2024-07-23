<template>
    <div>
        <h4>Radio & Checkbox</h4>
        <p>This section demonstrates how to use radio buttons and checkboxes in your form. You will find examples of
            their functionalities, advantages, and practical usage scenarios.</p>

        <Radio label="Gender" :options="['Male', 'Female']" v-model="forms.gender" required />
        <Radio label="Blood Type" :options="[{ label: 'A' }, { label: 'B' }, 'AB', { label: 'O', disabled: true }]"
            v-model="forms.blood" required />

        <!-- 
            You can also use an array of objects like [{label: 'A', value: 1}, {label: 'B', value: 2}, etc.] for the options.
            Therefore, your `forms.blood` should be set to a value from this array, for example: forms.blood = 1.
        -->

        <Checkbox label="Favorite Fruit" required v-model="forms.favorites" :options="fruits" />
        <Checkbox v-model="forms.checked" />


        <code>
            {{ forms }}
        </code>
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
                favorites: ['Banana', 'Mango']
            }
        }
    },

    mounted() {
        setTimeout(() => {
            this.forms.gender = 'Female'
        }, 1000);
    }
}
</script>

<style lang="scss" scoped></style>