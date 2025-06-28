<template>
    <div>
        <PageHeader title="Input" />

        <div class="row">
            <div class="col-lg-6 space-y-3">
                <p>
                    This is how the input is displayed and how to use it along with some additional information. Here
                    are the
                    details on its functionalities, advantages, and usage scenarios.
                </p>

                <Props
                    :attrs="['label', 'hint', 'type', 'disabled', 'readonly', 'required', 'autofocus', 'maxLength', 'prefix', 'suffix', 'password', 'minDate', 'maxDate', 'formatters', 'mask', 'v-model']" />

                <Input v-model="forms.name" label="Full Name" hint="Enter your name" prefix="hgi-user" required
                    formatters="alpha|ucwords" autofocus />

                <Code class="mb-3"
                    code='<Input label="Full Name" hint="Enter your name" prefix="ti-user" required v-model="forms.name" formatters="alpha|ucwords" />' />

                <Input v-model="forms.email" label="Email Address" hint="Enter your email address" prefix="hgi-mail-01"
                    :suffixs="[
                        { icon: 'hgi-sent' },
                        { icon: 'hgi-notification-snooze-01' },
                        { icon: 'hgi-archive-01', disabled: true }
                    ]" required @suffix="onSuffix" ref="email" />

                <Code class="mb-3" description="suffixs value is Object, ex: { icon: 'ti-send', disabled: false }"
                    code='<Input label="Email Address" hint="Enter your email address" prefix="ti-mail" v-model="forms.email" :suffixs="[{}]" required @suffix="onSuffix" /> ' />

                <Input label="Phone Number" hint="Enter your phone number" prefix="hgi-contact-01" required
                    v-model="forms.phone" formatters="phone" />

                <Input label="Password" hint="Enter your password" prefix="hgi-lock" required password @enter="onEnter"
                    v-model="forms.password" />
                <Code class="mb-3"
                    code='<Input label="Password" hint="Enter your password" prefix="ti-lock" required password @enter="onEnter" v-model="forms.password" />' />

                <Input label="Date" type="date" prefix="hgi-calendar-01" />
                <Code class="mb-3" code='<Input label="Date" type="date" prefix="ti-calendar" />' />

                <Input v-model="forms.price" label="Currency" hint="Enter price" prefix="hgi-coins-01" required
                    formatters="currency:," />
                <Code class="mb-3"
                    code='<Input label="Currency" hint="Enter price" prefix="ti-coins" required formatters="currency:," v-model="forms.price" />' />

                <Input label="Input Mask" prefix="hgi-calendar-02" mask="date:d/m/y" v-model="forms.date" />

                <Code class="mb-3"
                    code='<Input label="Input Mask" prefix="calendar-event" mask="date:d/m/y" v-model="forms.date" />' />

                <h2 class="mt-5">Number</h2>
                <Props
                    :attrs="['label', 'hint', 'prefix', 'required', 'disabled', 'readonly', 'min', 'max', 'v-model']" />
                <Number label="Number" hint="Enter quantity" prefix="hgi-arrange-by-numbers-1-9" required
                    v-model="forms.quantity" />

                <Code class="mb-3"
                    code='<Number label="Number" hint="Enter quantity" prefix="hgi-arrange-by-numbers-1-9" required v-model="forms.quantity" /> ' />


                <h2 class="mt-5">Date</h2>
                <Props
                    :attrs="['label', 'prefix', 'disabled', 'readonly', 'required', 'minDate', 'maxDate', 'v-model']" />

                <Date label="Date Scroll" prefix="hgi-calendar-01" :maxDate="$e.utils.now()" />
                <Code class="mb-3" code='<Date label="Date Scroll" prefix="ti-calendar" />' />

                <h2 class="mt-5">Time</h2>
                <Props
                    :attrs="['label', 'prefix', 'disabled', 'readonly', 'required', 'time', 'format', 'shape', 'v-model']" />
                <Time label="Time" prefix="hgi-clock-01" format="h:i" v-model="forms.time" />
                <Code class="mb-3"
                    code='<Time label="Select Time" prefix="clock" format="h:i" v-model="forms.time" />' />

                <h2 class="mt-5">Textarea</h2>
                <Props
                    :attrs="['label', 'hint', 'disabled', 'readonly', 'required', 'autofocus', 'maxLength', 'prefix', 'suffix', 'formatters', 'v-model']" />

                <Textarea label="Description" hint="Type description about you..." prefix="hgi-note-02"
                    formatters="ucfirst" v-model="forms.note" />

                <Code class="mb-3"
                    code='<Textarea label="Description" hint="Type description about you..." prefix="ti-note" formatters="ucfirst" />' />

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
            this.$e.focus(this, 'email') // or this way
        },

        onEnter(data: any) {
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped></style>