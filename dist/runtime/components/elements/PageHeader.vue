<template>
  <div class="page-header d-print-none mb-5">
    <div class="row g-2 align-items-center">
      <div class="col">
        <!-- Page pre-title -->
        <div class="page-pretitle">
          Overview
        </div>
        <h2
          class="page-title d-inline"
          :class="utils.on($attrs?.onClick_ != null, 'hoverable')"
          @click="emit('click')"
          v-text="title"
        />
      </div>
      <!-- Page title actions -->
      <div class="col-auto ms-auto d-print-none">
        <div class="btn-list">
          <template v-for="(action, i) in actions" :key="i">
            <template v-if="action?.url && (action?.visible ?? true)">
              <a
                v-if="action?.url && `${action?.url}`.includes('http')"
                :href="action?.url"
                target="_blank"
                :class="[action.theme ?? 'btn-primary']"
                class="btn d-none d-sm-inline-block"
              >
                <i v-if="action.icon" :class="['ti', action.icon, utils.on(action.label, 'me-2')]" />
                <span v-if="`${action.label}`.trim() != ''">{{ action.label }}</span>
              </a>

              <NuxtLink
                v-else
                :to="action?.url"
                :class="[action.theme ?? 'btn-primary']"
                class="btn d-none d-sm-inline-block"
              >
                <i v-if="action.icon" :class="['ti', action.icon, utils.on(action.label, 'me-2')]" />
                <span v-if="`${action.label}`.trim() != ''">{{ action.label }}</span>
              </NuxtLink>
            </template>

            <button
              v-if="!action?.url && (action?.visible ?? true)"
              :class="[action.theme ?? 'btn-primary']"
              class="btn"
              :disabled="action.submit"
              @click="action?.click?.call()"
            >
              <span v-if="action.submit" class="spinner-border spinner-border-sm" />
              <i v-if="action.icon && !action.submit" :class="['ti', action.icon]" />

              <span
                v-if="`${action.label}`.trim() != ''"
                :class="[utils.on(action.label, 'ms-2'), 'd-none d-md-block']"
              >{{
                action.label
              }}</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../../plugins/utils";
export default {
  inheritAttrs: false,
  setup(_, { emit }) {
    return { emit, utils };
  },
  props: {
    title: {
      type: String,
      default: "Dashboard"
    },
    actions: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped></style>