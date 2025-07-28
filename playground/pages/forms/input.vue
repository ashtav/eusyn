<template>
    <div>
        <PageHeader title="Input" />

        <div class="row">
            <div class="col-lg-6 col-xl-4 space-y-3">
                <p>
                    This is how the input is displayed and how to use it along with some additional information. Here
                    are the
                    details on its functionalities, advantages, and usage scenarios.
                </p>

                <Props
                    :attrs="['label:string', 'hint:string', 'type:string', 'disabled:boolean', 'readonly:boolean', 'required:boolean', 'autofocus:boolean', 'maxLength:number', 'prefix:string', 'suffix:array<object>', 'password:boolean', 'minDate:string', 'maxDate:string', 'formatters:string (ucwords,ucfirst,lower,upper,trim,numeric,currency,alpha,alphanumeric,date,address,hashtag,decimal,phone,email,url)', 'mask:string', 'v-model:string']" />

                <Input v-model="forms.name" label="Full Name" hint="Enter your name" prefix="hgi-user" required
                    formatters="alpha|ucwords" autofocus @focus="onFocus" :suffix="[
                        { icon: 'hgi-sent', tooltip: 'Tooltip example' },
                        { icon: 'hgi-notification-snooze-01' },
                        { icon: 'hgi-archive-01', disabled: true }
                    ]" @suffix="onSuffix" ref="name" />

                <Code class="mb-3"
                    code='<Input label="Full Name" hint="Enter your name" prefix="ti-user" required v-model="forms.name" formatters="alpha|ucwords" />' />

                <Input label="Phone Number" hint="Enter your phone number" prefix="hgi-contact-01" required
                    v-model="forms.phone" formatters="phone" />
                <Code class="mb-3" code='<Input label="Phone Number" hint="Enter your phone number" prefix="hgi-contact-01" required
v-model="forms.phone" formatters="phone" />' />
                <Input label="Password" hint="Enter your password" prefix="hgi-lock" required password @enter="onEnter"
                    v-model="forms.password" />
                <Code class="mb-3"
                    code='<Input label="Password" hint="Enter your password" prefix="ti-lock" required password @enter="onEnter" v-model="forms.password" />' />

                <Input v-model="forms.price" label="Currency" hint="Enter price" prefix="hgi-coins-01" required
                    formatters="currency:," />
                <Code class="mb-3"
                    code='<Input label="Currency" hint="Enter price" prefix="ti-coins" required formatters="currency:," v-model="forms.price" />' />

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
                name: null,
                phone: '',
                password: 'secret-password',
                price: '',
                note: '',
                quantity: 2
            }
        }
    },

    methods: {
        onSuffix(data: any) {
            console.log(data)
            this.$e.utils.cleanMap(this, 'forms');

            // (this.$refs.email as any).doFocus() // you can use this way
            this.$e.focus(this, 'name') // or this way
        },

        onEnter(data: any) {
            console.log(data)
        },

        onFocus(value: boolean) {
            console.log('Focus:', value)

        }
    }
}
</script>

<style lang="scss" scoped></style>