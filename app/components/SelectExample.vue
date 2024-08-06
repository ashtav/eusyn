<template>
    <div>
        <h4>Select Option</h4>
        <p>This is how the select option is displayed and how to use it along with some additional information. Here are
            the
            details on its functionalities, advantages, and usage scenarios.</p>

        <Select label="Hobby" hint="Select your hobby" :options="hobbies" v-model="forms.hobby" @enter="onEnter"
            :busy="isLoading" />
        <Select label="Province" hint="Select your province" suffix="ti-map-2" required :options="provinces"
            v-model="forms.province" />

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
            isLoading: true,

            forms: {
                hobby: '',
                province: '',
                city: ''
            },

            hobbies: [
                'Swimming',
                'Reading',
                'Coding',
                'Drawing',
                'Hiking',
                'Cooking',
                'Traveling',
                'Photography',
                'Gardening',
                'Cycling',
                'Writing',
                'Playing Musical Instruments',
                'Fishing',
                'Yoga',
                'Gaming'
            ],

            provinces: [
                { label: 'Bali', value: 1 },
                { label: 'Jakarta', value: 2 },
                { label: 'West Java', value: 3 },
                { label: 'Central Java', value: 4 },
                { label: 'Yogyakarta', value: 5 },
                { label: 'East Java', value: 6 },
                { label: 'Banten', value: 7 },

            ]
        }
    },

    methods: {
        onEnter(data: any) {
            console.log(data)
        }
    },

    mounted() {
        this.isLoading = true

        setTimeout(() => {
            this.isLoading = false
            this.forms.hobby = 'Traveling'
        }, 3000);
    }
}
</script>

<style lang="scss" scoped></style>