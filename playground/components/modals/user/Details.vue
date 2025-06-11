<template>
  <Modal :id="id" :elevation="false">
    <div class="modal-body">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, praesentium deserunt. Voluptatem
        voluptatibus officiis maxime perspiciatis voluptates a, vel maiores delectus incidunt iure alias aperiam
        non
        id magni, sit perferendis!
      </p>
    </div>
  </Modal>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      default: 'user-details'
    }
  },

  setup() {
    return {}
  }
}
</script>