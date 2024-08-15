<template>
  <div>
    <div
      class="modal modal-blur fade"
      :class="{ 'show': show }"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      :style="{ display: preShow ? 'block' : 'none' }"
    >
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body text-center py-4">
            <i class="ti confirm-icon" :class="`text-${data.theme} ${data.icon}`" />

            <h3 class="mt-3">
              {{ data.title }}
            </h3>
            <div class="text-muted" v-html="data.message" />

            <input
              v-show="data?.data"
              ref="elInput"
              v-model="input"
              class="form-control mt-5"
              :placeholder="data?.hint"
            >
          </div>

          <!-- controls -->
          <div class="modal-footer bg-white border-0">
            <div class="w-100">
              <div class="row">
                <div class="col">
                  <Button :label="data.cancelText ?? 'Cancel'" theme="btn w-100" @click="onHide" />
                </div>
                <div class="col">
                  <Button
                    :label="data.confirmText"
                    :theme="`w-100 btn-${data.theme}`"
                    :disabled="isSubmit || data?.data && data?.data != input"
                    :submitted="isSubmit"
                    @click="data.onConfirm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="preShow" class="modal-backdrop fade" :class="{ 'show': show }" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import eventBus from "../../plugins/mitt";
export default {
  setup() {
    const show = ref(false);
    const preShow = ref(false);
    const data = ref({});
    const isSubmit = ref(false);
    const input = ref("");
    const elInput = ref(null);
    const defaultMessage = "Are you sure want to delete this data? This action cannot be undone.";
    watch(() => show.value, (value) => {
      if (value) {
        isSubmit.value = false;
      }
    });
    const onShow = (args) => {
      input.value = "";
      const actions = {
        submit: () => isSubmit.value = true,
        abort: () => isSubmit.value = false,
        close: (delay = 0) => {
          setTimeout(() => onHide(), delay * 1e3);
        }
      };
      const textButton = args.textButton ? `${args.textButton}`.split("|") : [];
      const cancelText = textButton.length == 0 ? "Cancel" : textButton[0];
      const confirmText = [0, 1].includes(textButton.length) ? "Delete" : textButton[1];
      data.value = {
        title: args.title,
        message: args.message ?? defaultMessage,
        icon: args.icon || "ti-exclamation-mark",
        theme: args.theme || "danger",
        cancelText,
        confirmText,
        data: args.data,
        hint: args.hint,
        onConfirm: !args?.onConfirm ? () => {
        } : () => args?.onConfirm(actions)
      };
      preShow.value = true;
      setTimeout(() => {
        show.value = true;
      }, 1);
      if (elInput.value) {
        setTimeout(() => {
          elInput.value.focus();
        }, 250);
      }
    };
    const onHide = () => {
      show.value = false;
      setTimeout(() => {
        preShow.value = false;
      }, 250);
    };
    onMounted(() => {
      eventBus.on("__show_confirm", onShow);
    });
    return { show, preShow, data, isSubmit, input, elInput, onHide };
  }
};
</script>

<style scoped>
.modal {
  z-index: 99998;
}
.modal .confirm-icon {
  font-size: 50px;
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}
.modal input {
  border: none;
  border-top: 1px #ddd solid;
  border-bottom: 1px #ddd solid;
  outline: none;
  box-shadow: none;
  text-align: center;
  border-radius: 0;
}
.modal input:focus {
  border-color: #0054a6;
}
</style>