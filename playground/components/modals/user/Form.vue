<template>
  <Modal :id="id" :elevation="false">
    <form @submit.prevent="onSubmit">
      <div class="modal-body space-y-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, praesentium deserunt. Voluptatem
          voluptatibus officiis maxime perspiciatis voluptates a, vel maiores delectus incidunt iure alias aperiam
          non id magni, sit perferendis!
        </p>

        <Input hint="Enter your name" v-model="forms.name" required autofocus />

        <Card title="Tabbed Card" :tabs="tabs" tab-pos="top" v-slot="{ tab }" v-model:tab-active="tab">
          <div class="card-body">
            <div class="card-title">Content of tab #{{ tab }}</div>
            <p class="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
              distinctio
              dolorem expedita, fugiat hic magni molestiae molestias odit.
            </p>
          </div>
        </Card>
      </div>

      <div class="modal-footer">
        <Button label="Submit" ref="el" submit />
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
        name: 'John Doe',
        hobby: ''
      },

      tabs: [
        { label: 'Biodata', icon: 'hgi-user-circle-02' },
        { label: 'Education', icon: 'hgi-pencil' },
        { label: 'Works', icon: 'hgi-briefcase-08' },
      ],

      tab: 0
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