<template>
    <div>
        <h4>Input</h4>
        <p>This is how the input is displayed and how to use it along with some additional information. Here are the
            details on its functionalities, advantages, and usage scenarios.</p>

        <Input label="Full Name" hint="Enter your name" prefix="ti-user" required v-model="forms.name"
            formatters="alpha|ucwords" />

        <Input label="Email Address" hint="Enter your email address" prefix="ti-mail" :suffixs="[
            { icon: 'ti-send' },
            { icon: 'ti-bell' },
            { icon: 'ti-archive', disabled: true }
        ]" required v-model="forms.email" @suffix="onSuffix" />

        <Input label="Password" hint="Enter your password" prefix="ti-lock" required v-model="forms.password" password
            @enter="onEnter" />
        <Input label="Date" type="date" prefix="ti-calendar" />

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
            forms: {
                name: '',
                email: '',
                password: ''
            }
        }
    },

    methods: {
        onSuffix(data: any) {
            console.log(data)
            this.$_.cleanMap(this, 'forms')
        },

        onEnter(data: any) {
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped></style>