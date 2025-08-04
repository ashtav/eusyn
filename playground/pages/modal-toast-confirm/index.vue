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
          <Button label="Show Confirm" theme="btn-danger" @click="showConfirm" />
        </Row>

        <Code class="mt-5" code="this.$modal.show('modal', {
    title: 'New Data',
    data: { id: 1 },
    callback: (data: any) => {
        console.log('data from modal', data.name) // John Doe
    }
})
    
// in your modal, call
this.$modal.callback({name: 'John Doe'})
" />

        <Code class="mt-2" code="this.$toast.error('500 - Server error!')" />

        <Code class="mt-2" code="this.$confirm('Delete Product', {
    message: 'Your message...',
    textButton: 'Cancel|Yes, Do it!',
    onConfirm: (actions) => {
        actions.submit()
    },
})" />

        <div class="mt-5 mb-3">
          If you have multiple modals, use <code>Modals</code> component to wrap your modals.
          It will keep your performance optimal and prevent memory leaks.
        </div>

        <Row :gap="10" class="mb-5">
          <Button label="Form User" @click="onModal('form-user')" />
          <Button label="User Details" @click="onModal('user-details')" theme="btn-outline-primary" />
          <Button label="Form Product" @click="$modal.show('form-product', 'New Product')" theme="btn-link" />
        </Row>

        <Code class="mt-2" code="<Modals>
  <ModalsUserForm />
  <ModalsUserDetails />
</Modals>

// 1. to show the modal, use: this.$modal.show('form-user')

// 2. inside your modal component (<ModalsUserForm />), use: props: {id: {default: 'form-user'}}
// <Modal :id='id'>
" />
      </div>
    </div>

    <Modal id="modal" :elevation="false" :actions="icons" @init="onInit" icon="hgi-book-open-02">
      <Form @submit="onSubmit" ref="form">
        <div class="modal-body space-y-3">
          <p class="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus
            deleniti
            dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit
            sit
            tempora totam unde.
          </p>

          <p class="mb-5">
            If you want to get data from the modal, you can use <code>$modal.data()</code> to get the data. <br> <br>
            {{ $modal.data() }}
          </p>

          <Input hint="Type something..." />

          <Input v-model="forms.title" label="Modal Title" hint="Type username" required formatters="ucwords"
            prefix="hgi-news" :suffix="[
              { icon: 'hgi-books-01', tooltip: 'Tooltip example' }
            ]" @focus="(value) => ($refs.form as any).enterable(value)" @enter="onEnter" />

          <Button label="Show Confirm" @click="onConfirm" />
        </div>
        <div class="modal-footer border-0 bg-transparent">
          <Button theme="btn" label="Close" @click="onClose" />
          <Button theme="btn-primary" label="Save changes" submit />
        </div>
      </Form>
    </Modal>

    <Modals>
      <ModalsUserForm />
      <ModalsUserDetails />
      <ModalsProductForm />
    </Modals>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      icons: [
        { icon: 'hgi-sent', tooltip: 'Send', click: this.onAction },
        {
          icon: 'hgi-archive-01', tooltip: 'Archive', click: this.onAction, options: [
            { label: 'All Items', separate: true },
            { label: 'Last 30 Days' },
            { label: 'Last 60 Days' },
          ]
        },
        { icon: 'hgi-user-circle-02', click: this.onAction },
        { icon: 'hgi-idea-01', disabled: true }
      ],

      forms: {
        title: 'New Data'
      },

      modal: ''
    }
  },

  methods: {
    onInit(data: any) {
      console.log(data)
    },

    onEnter() {
      console.log('Enter pressed')
    },

    onConfirm() {
      this.$confirm('Alert Dialog', {
        onConfirm(actions) {
          actions.submit()

          setTimeout(() => {
            actions.close()
          }, 1000)
        }
      })
    },

    onClick() {
      this.$modal.show('modal', {
        title: 'New Data',
        data: { id: 1 },
        callback: (data: any) => {
          console.log('data from modal', data)
        }
      })
    },

    onModal(id: string) {
      this.$modal.show(id, {
        title: this.$e.case.capital(id),
        callback: (data: any) => {
          console.log('another modal')
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
      console.log('submit', this.forms)
      this.$modal.setTitle(this.forms.title)
      this.$modal?.callback(this.forms)
    },

    showToast() {
      this.$toast.error('500 - Server error!', { align: 'bottom-right' });
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