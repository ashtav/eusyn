<template>
  <div class="login-form" :class="{ 'show': !auth.isLogged }">
    <div class="content">
      <h4> Authorization </h4>
      <p class="mb-6">
        To be able to access data on this site, please enter your email and password
        correctly. Three failed attempts, your IP will be blocked.
      </p>

      <form @submit.prevent="onSubmit">
        <Input v-model="forms.email" label="Email" hint="Enter email address" required />
        <Input v-model="forms.password" label="Password" hint="Enter password" required password />

        <p class="mb-5">
          <a href="#">Forgot Password!</a>
        </p>

        <Button label="Login" theme="w-100 btn-primary" submit :submitted="isSubmit" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

export default {
  setup () {
    const app = useAppStore()
    const auth = useAuthStore()

    return {
      app, auth
    }
  },

  data () {
    return {
      forms: {
        email: 'ashtaaav@gmail.com',
        password: 'secretly-1111'
      },

      isSubmit: false
    }
  },

  watch: {
    $route: function (value) {
      this.app.assignPath(value.matched ?? [])
    }
  },

  methods: {
    onSubmit () {
      this.isSubmit = true
      this.auth.login(this.forms).then(ok => {
        this.isSubmit = false

        if (ok) {
          this.app.backdrop = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: .3s;
    z-index: 99999;

    &.show {
        pointer-events: all;

        .content {
            right: 0;
        }
    }

    .content {
        position: absolute;
        background-color: white;
        top: 0;
        right: -330px;
        width: 330px;
        height: 100%;
        z-index: 99999;
        padding: 30px;
        border-radius: 6px;
        transition: .3s;
    }
}
</style>