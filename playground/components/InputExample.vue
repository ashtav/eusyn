<template>
  <div>
    <h4>Input</h4>
    <p>
      This is how the input is displayed and how to use it along with some additional information. Here are the
      details on its functionalities, advantages, and usage scenarios.
    </p>

    <Input
      v-model="forms.name"
      label="Full Name"
      hint="Enter your name"
      prefix="ti-user"
      required
      formatters="alpha|ucwords"
    />

    <Input
      v-model="forms.email"
      label="Email Address"
      hint="Enter your email address"
      prefix="ti-mail"
      :suffixs="[
        { icon: 'ti-send' },
        { icon: 'ti-bell' },
        { icon: 'ti-archive', disabled: true }
      ]"
      required
      @suffix="onSuffix"
    />

    <Input
      v-model="forms.password"
      label="Password"
      hint="Enter your password"
      prefix="ti-lock"
      required
      password
      @enter="onEnter"
    />
    <Input label="Date" type="date" prefix="ti-calendar" />

    <Input
      v-model="forms.price"
      label="Currency"
      hint="Enter price"
      prefix="ti-coins"
      required
      formatters="currency:,"
    />

    <Textarea label="Description" hint="Type description about you..." prefix="ti-note" formatters="ucfirst" />

    <code>
      {{ forms }}
    </code>
  </div>
</template>

<script lang="ts">
export default {
  setup () {
    return {}
  },

  data () {
    return {
      forms: {
        name: '',
        email: '',
        password: '',
        price: ''
      }
    }
  },

  methods: {
    onSuffix (data: any) {
      console.log(data)
      this.$_.cleanMap(this, 'forms')
    },

    onEnter (data: any) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped></style>