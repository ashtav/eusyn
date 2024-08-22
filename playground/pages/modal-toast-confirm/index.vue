<template>
  <div>
    <PageHeader title="Modal, Toast & Confirm" />

    <div class="row">
      <div class="col-lg-6">
        <p class="mb-5">
          Check out these examples of how to use Modal, Toast, and Confirm components and plugins.
          They make
          it easy to display alerts, forms, and other interactive content in your web applications.
        </p>

        <Row :gap="10">
          <Button label="Open Modal" @click="onClick" />
          <Button label="Show Toast" theme="btn" @click="showToast" />
          <Button label="Show Confirm" theme="btn" @click="showConfirm" />
        </Row>

        <Code class="mt-5" code="this.$modal.show('modal', {
    title: 'New Data',
    data: { id: 1 },
    callback: (data: any) => {
        console.log('data from modal', data)
    }
})" />

        <Code class="mt-2" code="this.$toast.error('500 - Server error!')" />

        <Code class="mt-2" code="this.$confirm('Delete Product', {
    message: 'Your message...',
    textButton: 'Cancel|Yes, Do it!',
    onConfirm: (actions) => {
        actions.submit()
    },
})" />
      </div>
    </div>

    <Modal id="modal" :elevation="false" :actions="icons">
      <form @submit.prevent="onSubmit">
        <div class="modal-body">
          <p class="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus
            deleniti
            dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit
            sit
            tempora totam unde.
          </p>

          <Input v-model="forms.title" label="Modal Title" hint="Type username" required formatters="ucwords"
            prefix="ti-news" />
        </div>
        <div class="modal-footer border-0 bg-transparent">
          <Button theme="btn" label="Close" @click="onClose" />
          <Button theme="btn-primary" label="Save changes" submit />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      icons: [
        { icon: 'ti-send', tooltip: 'Send', click: this.onAction },
        { icon: 'ti-archive', tooltip: 'Archive', click: this.onAction },
        { icon: 'ti-user', click: this.onAction },
        { icon: 'ti-bulb', disabled: true }
      ],

      forms: {
        title: 'New Data'
      }
    }
  },

  methods: {
    onClick() {
      this.$modal.show('modal', {
        title: 'New Data',
        data: { id: 1 },
        callback: (data: any) => {
          console.log('data from modal', data)
        }
      })
    },

    onClose() {
      this.$modal.close()
    },

    onAction(data: any) {
      console.log(data)

      // passing data from modal dialog to the parent page
      if (data.icon == 'ti-send') {
        this.$modal.callback(data)
      }
    },

    onSubmit() {
      this.$modal.setTitle(this.forms.title)
    },

    showToast() {
      this.$toast.error('500 - Server error!', { pos: 'bottom-right' });
    },

    showConfirm() {
      this.$confirm('Delete Product', {
        message: 'Are you sure want to delete this product?, consider that this action cannot be undone.',
        textButton: 'Cancel|Yes, Do it!',
        onConfirm(actions) {
          actions.submit()

          setTimeout(() => {
            actions.close()
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>