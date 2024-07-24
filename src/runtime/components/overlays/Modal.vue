<template>
    <div id="modal-simple" class="modal modal-blur fade" :class="{ 'show': show }" tabindex="-1"
        :style="{ display: preShow ? 'block' : 'none' }" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="() => onClose()"></button>
                </div>
                <div class="modal-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti
                    dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit
                    tempora totam unde.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-backdrop fade" :class="{ 'show': show }" v-if="preShow"></div>

</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import eventBus from '../../plugins/mitt';

export default {
    inheritAttrs: false,
    props: {
        id: {
            type: String,
            required: true
        }
    },

    setup(props) {
        const show = ref(false)
        const preShow = ref(false)


        const onShow = (args: any) => {
            console.log(args)

            if (args.id == props.id) {
                preShow.value = true

                setTimeout(() => {
                    show.value = true
                }, 1);
            }
        }

        const onClose = (id?: string) => {
            show.value = false

            setTimeout(() => {
                preShow.value = false
            }, 250);
        }

        const closeFromBus = () => {
            
        }

        onMounted(() => {
            eventBus.on('__show_modal', onShow)
            eventBus.on('__close_modal', onShow)

        })

        return { preShow, show, onClose }
    }
}
</script>

<style lang="scss" scoped></style>