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

                <Input v-model="forms.name" label="Full Name" hint="Enter your name" prefix="hgi-user" required
                    formatters="alpha|ucwords" autofocus />

                <Code class="mb-5"
                    code='<Input label="Full Name" hint="Enter your name" prefix="ti-user" required v-model="forms.name" formatters="alpha|ucwords" />' />

                <Input v-model="forms.email" label="Email Address" hint="Enter your email address" prefix="hgi-mail-01"
                    :suffixs="[
                        { icon: 'hgi-sent' },
                        { icon: 'hgi-notification-snooze-01' },
                        { icon: 'hgi-archive-01', disabled: true }
                    ]" required @suffix="onSuffix" ref="email" />

                <Code class="mb-5" description="suffixs value is Object, ex: { icon: 'ti-send', disabled: false }"
                    code='<Input label="Email Address" hint="Enter your email address" prefix="ti-mail" v-model="forms.email" :suffixs="[{}]" required @suffix="onSuffix" /> ' />

                <Input label="Phone Number" hint="Enter your phone number" prefix="hgi-contact-01" required
                    v-model="forms.phone" formatters="phone" />

                <Input label="Password" hint="Enter your password" prefix="hgi-lock" required password @enter="onEnter"
                    v-model="forms.password" />
                <Code class="mb-5"
                    code='<Input label="Password" hint="Enter your password" prefix="ti-lock" required password @enter="onEnter" v-model="forms.password" />' />

                <Input label="Date" type="date" prefix="hgi-calendar-01" />
                <Code class="mb-5" code='<Input label="Date" type="date" prefix="ti-calendar" />' />

                <Date label="Date Scroll" prefix="hgi-calendar-01" :maxDate="$e.utils.now()" />
                <Code class="mb-5" code='<Date label="Date Scroll" prefix="ti-calendar" />' />

                <Time label="Time" prefix="hgi-clock-01" format="h:i" v-model="forms.time" />
                <Code class="mb-5"
                    code='<Time label="Select Time" prefix="clock" format="h:i" v-model="forms.time" />' />


                <Input v-model="forms.price" label="Currency" hint="Enter price" prefix="hgi-coins-01" required
                    formatters="currency:," />
                <Code class="mb-5"
                    code='<Input label="Currency" hint="Enter price" prefix="ti-coins" required formatters="currency:," v-model="forms.price" />' />

                <Textarea label="Description" hint="Type description about you..." prefix="hgi-note-02"
                    formatters="ucfirst" v-model="forms.note" />

                <Code class="mb-5"
                    code='<Textarea label="Description" hint="Type description about you..." prefix="ti-note" formatters="ucfirst" />' />

                <Input label="Input Mask" prefix="hgi-calendar-02" mask="date:d/m/y" v-model="forms.date" />

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
                phone: '',
                password: 'secret-password',
                price: '',
                date: '',
                time: '',
                note: ''
            }
        }
    },

    methods: {
        onSuffix(data: any) {
            console.log(data)
            this.$e.utils.cleanMap(this, 'forms');

            // (this.$refs.email as any).doFocus() // you can use this way
            this.$e.focus(this, 'email') // or this way
        },

        onEnter(data: any) {
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped></style>