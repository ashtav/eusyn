<template>
    <div class="container py-6">
        <div class="row">
            <div class="col-lg-6">
                <h2>LazyUI - Modal</h2>
                <p class="mb-5">LazyUI's modal component offers a sleek and responsive design for your web applications.
                    Easily
                    customizable and highly flexible, it ensures seamless integration with your existing UI, providing a
                    smooth user experience. Perfect for displaying alerts, forms, and other interactive content.</p>

                <Button label="Open Modal" @click="onClick" class="me-2" />
                <Button label="Open Modal 2" theme="btn" @click="$modal.show('modal-example')" />
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

                    <Input label="Modal Title" hint="Type username" v-model="forms.title" required formatters="ucwords"
                        prefix="ti-news" />
                </div>
                <div class="modal-footer border-0 bg-white">
                    <Button theme="btn" label="Close" @click="onClose" />
                    <Button theme="btn-primary" label="Save changes" submit />
                </div>
            </form>
        </Modal>

        <!-- modal example: as component -->
        <ModalExample />
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
                { icon: 'ti-bulb', disabled: true },
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
        }
    }
}
</script>

<style lang="scss" scoped></style>