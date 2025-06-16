<template>
  <Modal :id="id" :elevation="false">
    <form @submit.prevent="onSubmit">
      <div class="modal-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, praesentium deserunt. Voluptatem
          voluptatibus officiis maxime perspiciatis voluptates a, vel maiores delectus incidunt iure alias aperiam
          non
          id magni, sit perferendis!
        </p>

        <Input hint="Enter your name" v-model="forms.name" required />
      </div>

      <div class="modal-footer">
        <Button label="Submit" ref="submit" submit />
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      default: 'form-user'
    }
  },

  setup() {
    return {}
  },

  data() {
    return {
      forms: {
        name: 'John Doe'
      }
    }
  },

  methods: {
    onSubmit() {
      this.$loading()

      setTimeout(() => {
        this.$loading(false)
      }, 2000);
    }
  },
}
</script>