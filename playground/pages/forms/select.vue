<template>
    <div>
        <PageHeader title="Select Option" />

        <div class="row">
            <div class="col-lg-6">
                <p>
                    This is how the select option is displayed and how to use it along with some additional information.
                    Here are
                    the
                    details on its functionalities, advantages, and usage scenarios.
                </p>

                <Select v-model="forms.hobby" label="Hobby" hint="Select your hobby" :options="hobbies"
                    :busy="isLoading" @enter="onEnter" />
                <Code class="mb-5" description="Using label as input."
                    code='<Select label="Hobby" hint="Select your hobby" :options="hobbies" v-model="forms.hobby" :busy="isLoading" @enter="onEnter" />' />


                <Select label="Province" hint="Select your province" suffix="ti-map-2" required :options="provinces"
                    v-model="forms.province" />
                <Code class="mb-5" description="Using value as input."
                    code='<Select label="Province" hint="Select your province" suffix="ti-map-2" required :options="provinces" v-model="forms.province" />' />

                <Select label="From Api" hint="Select your data" suffix="ti-file" required :options="options"
                    v-model="forms.option" />

                <Button label="Get Data" @click="onSubmit" /> <br> <br>
                <code>
        {{ forms }}
      </code>
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
            isLoading: true,

            forms: {
                hobby: '',
                province: '',
                city: '',
                option: ''
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
                { label: 'Banten', value: 7 }
            ],

            options: []
        }
    },

    mounted() {
        this.isLoading = true

        setTimeout(() => {
            this.isLoading = false
            this.forms.hobby = 'Traveling'
        }, 3000)
    },

    methods: {
        onEnter(data: any) {
            console.log(data)
        },

        onSubmit(action: ButtonAction) {
            action.submit()
            $fetch('https://api.igsa.pw/api/dummy').then((result: any) => {
                this.options = (result.data ?? []).map((e: any) => {
                    return {
                        label: e.description,
                        value: e.id
                    }
                })
                action.abort()
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>