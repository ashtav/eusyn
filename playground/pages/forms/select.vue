<template>
    <div>
        <PageHeader title="Select Option" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <p>
                    This is how the select option is displayed and how to use it along with some additional information.
                    Here are
                    the
                    details on its functionalities, advantages, and usage scenarios.
                </p>


                <Props
                    :attrs="['label', 'hint', 'type', 'disabled', 'required', 'autofocus', 'busy', 'prefix', 'suffix', 'options', 'v-model']" />

                <Select v-model="forms.hobby" label="Hobby" hint="Select your hobby" :options="hobbies"
                    :busy="isLoading" @enter="onEnter" />
                <Code class="mb-5" description="Using label as input."
                    code='<Select label="Hobby" hint="Select your hobby" :options="hobbies" v-model="forms.hobby" :busy="isLoading" @enter="onEnter" />' />


                <Select label="Province" hint="Select your province" suffix="hgi-map-pinpoint-02" required
                    :options="provinces" v-model="forms.province" :busy="isLoadingProvince" />
                <Code class="mb-5" description="Using value as input."
                    code='<Select label="Province" hint="Select your province" suffix="ti-map-2" required :options="provinces" v-model="forms.province" />' />

                <Select label="From Api" hint="Select your data" suffix="ti-file" required :options="options"
                    v-model="forms.option" ref="select" />

                <div>
                    <Button label="Get Data" @click="onSubmit" />
                    <Button label="Auto Fill" theme="white ms-2" @click="onFill" />
                    <Button label="Set Loading" theme="white ms-2" @click="setLoading" ref="el" />
                </div>
                <code> {{ forms }} </code>
                <br>

                <Select label="Search" hint="Type category name, then press enter" suffix="ti-file" required
                    :options="options" v-model="forms.option" ref="search" @enter="onSearch" />

                <Code class="mb-5"
                    description="To keep the search input focused after searching, use the ref attribute." code="this.$e.focus(this, 'search') // focus
this.$loading(true, 'search') // set busy" />

            </div>
        </div>

        <div style="margin-bottom: 300px"></div>
    </div>
</template>

<script lang="ts">
import dummy from '@/assets/json/dummy.json'

export default {
    setup() {
        const data = dummy.categories ?? []
        return { dummy, data }
    },

    data() {
        return {
            isLoading: true,
            isLoadingProvince: true,

            forms: {
                hobby: '',
                province: 3,
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

            provinces: <any>[],

            options: <any>[]
        }
    },

    mounted() {
        this.isLoading = true
        this.isLoadingProvince = true

        setTimeout(() => {
            this.isLoading = false
            this.forms.hobby = 'Traveling'

            // province data
            this.provinces = [
                { label: 'Bali', value: 1 },
                { label: 'Jakarta', value: 2 },
                { label: 'West Java', value: 3 },
                { label: 'Central Java', value: 4 },
                { label: 'Yogyakarta', value: 5 },
                { label: 'East Java', value: 6 },
                { label: 'Banten', value: 7 }
            ]

            this.isLoadingProvince = false

            // setTimeout(() => {
            //     this.forms.province = 3
            // }, 100);
        }, 1000)


    },

    methods: {
        onEnter(data: any) {
            console.log(data)
        },

        onSubmit(action: ButtonAction) {
            action.submit()

            setTimeout(() => {
                this.options = (this.dummy.categories ?? []).map((e: any) => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
                action.abort()
                this.forms.option = ''
            }, 2000);
        },

        onFill() {
            this.forms.option = ''
        },

        setLoading() {
            this.$loading(true, 'select')

            setTimeout(() => {
                this.$loading(false)
            }, 1000);
        },

        onSearch(keyword: string) {
            this.$loading(true, 'search')

            const result = this.data.filter((e: any) => {
                return e.name.toLowerCase().includes(keyword.toLowerCase())
            })

            this.options = result.map((e: any) => {
                return {
                    label: e.name,
                    value: e.id
                }
            })

            setTimeout(() => {
                this.$loading(false, 'search')
                this.$e.focus(this, 'search')
            }, 1000);
        }
    }
}
</script>

<style lang="scss" scoped></style>