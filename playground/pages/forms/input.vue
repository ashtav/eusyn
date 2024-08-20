<template>
    <div>
        <PageHeader title="Input" />

        <div class="row">
            <div class="col-lg-6">
                <p>
                    This is how the input is displayed and how to use it along with some additional information. Here
                    are the
                    details on its functionalities, advantages, and usage scenarios.
                </p>

                <Input v-model="forms.name" label="Full Name" hint="Enter your name" prefix="ti-user" required
                    formatters="alpha|ucwords" />

                <Code class="mb-5"
                    code='<Input label="Full Name" hint="Enter your name" prefix="ti-user" required v-model="forms.name" formatters="alpha|ucwords" />' />

                <Input v-model="forms.email" label="Email Address" hint="Enter your email address" prefix="ti-mail"
                    :suffixs="[
                        { icon: 'ti-send' },
                        { icon: 'ti-bell' },
                        { icon: 'ti-archive', disabled: true }
                    ]" required @suffix="onSuffix" />

                <Code class="mb-5"
                description="suffixs value is Object, ex: { icon: 'ti-send', disabled: false }"
                    code='<Input label="Email Address" hint="Enter your email address" prefix="ti-mail" v-model="forms.email" :suffixs="[{}]" required @suffix="onSuffix" /> ' />

                <Input label="Password" hint="Enter your password" prefix="ti-lock" required password @enter="onEnter"
                    v-model="forms.password" />
                <Code class="mb-5"
                    code='<Input label="Password" hint="Enter your password" prefix="ti-lock" required password @enter="onEnter" v-model="forms.password" />' />

                <Input label="Date" type="date" prefix="ti-calendar" />
                <Code class="mb-5" code='<Input label="Date" type="date" prefix="ti-calendar" />' />

                <Input v-model="forms.price" label="Currency" hint="Enter price" prefix="ti-coins" required
                    formatters="currency:," />
                <Code class="mb-5"
                    code='<Input label="Currency" hint="Enter price" prefix="ti-coins" required formatters="currency:," v-model="forms.price" />' />

                <Textarea label="Description" hint="Type description about you..." prefix="ti-note"
                    formatters="ucfirst" />

                <Code class="mb-5"
                    code='<Textarea label="Description" hint="Type description about you..." prefix="ti-note" formatters="ucfirst" />' />

                <Input label="Input Mask" prefix="calendar-event" mask="date:d/m/y" v-model="forms.date" />

                <Code class="mb-5"
                    code='<Input label="Input Mask" prefix="calendar-event" mask="date:d/m/y" v-model="forms.date" />' />

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
            forms: {
                name: '',
                email: '',
                password: '',
                price: '',
                date: ''
            }
        }
    },

    methods: {
        onSuffix(data: any) {
            console.log(data)
            this.$ntx.utils.cleanMap(this, 'forms')
        },

        onEnter(data: any) {
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped></style>