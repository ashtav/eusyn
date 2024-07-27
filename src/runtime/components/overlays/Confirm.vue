<template>
    <div>
        <div class="modal modal-blur fade" :class="{ 'show': show }" tabindex="-1" aria-modal="true" role="dialog"
            :style="{ display: preShow ? 'block' : 'none' }">

            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center py-4">
                        <i class="ti confirm-icon" :class="`text-${data.theme} ${data.icon}`"></i>

                        <h3 class="mt-3">{{ data.title }}</h3>
                        <div class="text-muted" v-html="data.message" />

                        <input class="form-control mt-5" :placeholder="data?.hint" v-model="input" v-show="data?.data"
                            ref="elInput" />
                    </div>

                    <!-- controls -->
                    <div class="modal-footer bg-white border-0">
                        <div class="w-100">
                            <div class="row">
                                <div class="col">
                                    <Button :label="data.cancelText ?? 'Cancel'" theme="btn w-100" @click="onHide" />
                                </div>
                                <div class="col">
                                    <Button :label="data.confirmText" :theme="`w-100 btn-${data.theme}`"
                                        :disabled="isSubmit || data?.data && data?.data != input" :submitted="isSubmit"
                                        @click="data.onConfirm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-backdrop fade" :class="{ 'show': show }" v-if="preShow"></div>
    </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import eventBus from '../../plugins/mitt';
import type { ConfirmationActions } from '../../scripts/confirm/index';

export default {
    setup() {
        const show: Ref<boolean> = ref(false);
        const preShow = ref(false)

        const data: Ref<any> = ref({});
        const isSubmit = ref(false);

        const input: Ref<string> = ref('');
        const elInput = ref(null);

        const defaultMessage = 'Are you sure want to delete this data? This action cannot be undone.'

        watch(() => show.value, (value) => {
            if (value) {
                isSubmit.value = false;
            }
        });

        const onShow = (args: Record<string, any>) => {
            input.value = '';

            let actions: ConfirmationActions = {
                submit: () => (isSubmit.value = true),
                abort: () => (isSubmit.value = false),
                close: (delay: number = 0) => {
                    setTimeout(() => onHide(), delay * 1000);
                },
            };

            let textButton: Array<string> = args.textButton ? `${args.textButton}`.split('|') : []
            let cancelText = textButton.length == 0 ? 'Cancel' : textButton[0]
            let confirmText = [0, 1].includes(textButton.length) ? 'Delete' : textButton[1]

            data.value = {
                title: args.title,
                message: args.message ?? defaultMessage,
                icon: args.icon || 'ti-exclamation-mark',
                theme: args.theme || "danger",
                cancelText: cancelText,
                confirmText: confirmText,
                data: args.data,
                hint: args.hint,
                onConfirm: !args?.onConfirm ? () => { } : () => args?.onConfirm(actions),
            };

            preShow.value = true

            setTimeout(() => {
                show.value = true
            }, 1);

            // set focus to input
            if (elInput.value) {
                setTimeout(() => {
                    (elInput.value as HTMLInputElement).focus();
                }, 250);
            }
        };

        const onHide = () => {
            show.value = false;

            setTimeout(() => {
                preShow.value = false
            }, 250);
        };

        onMounted(() => {
            eventBus.on("__show_confirm", onShow);
        })

        return { show, preShow, data, isSubmit, input, elInput, onHide };
    },
};
</script>

<style lang="scss" scoped>
.modal {
    z-index: 99998;

    .confirm-icon {
        $size: 50px;

        font-size: $size;
        width: $size;
        height: $size;
        margin-bottom: 15px;
    }

    input {
        border: none;
        border-top: 1px #ddd solid;
        border-bottom: 1px #ddd solid;
        outline: none;
        box-shadow: none;
        text-align: center;
        border-radius: 0;

        &:focus {
            border-color: #0054a6;
        }
    }
}
</style>