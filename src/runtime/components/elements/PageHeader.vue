<template>
  <div class="page-header mb-5">
    <div class="row g-2 align-items-center">
      <div class="col">

        <!-- Page pre-title -->
        <div class="page-pretitle" v-text="pretitle" />
        <h2 class="page-title d-inline" :class="utils.on($attrs?.onClick != null, 'hoverable')" @click="emit('click')"
          v-text="title" />


        <ol class="breadcrumb mt-2" v-if="breadcrumb.length > 0">
          <li class="breadcrumb-item" v-for="(e, i) in breadcrumb" :class="{ 'active': e.path == null }">
            <NuxtLink :to="e.path">
              <Icon :icon="`${e.icon} fix me-2`" v-if="e.icon" /> {{ e.label }}
            </NuxtLink>
          </li>
        </ol>
      </div>

      <!-- Page title actions -->
      <div class="col-auto ms-auto d-print-none">
        <div class="btn-list">
          <template v-for="(action, i) in actions" :key="i">
            <template v-if="action?.url && (action?.visible ?? true)">
              <a v-if="action?.url && `${action?.url}`.includes('http')" :href="action?.url" target="_blank"
                :class="[action.theme ?? 'btn-primary']" class="btn d-none d-sm-inline-flex align-items-center">
                <Icon v-if="action.icon" :icon="`${action.icon}`" :class="{ 'me-1': action.label }" />
                <span v-if="`${action.label}`.trim() != ''">{{ action.label }}</span>
              </a>

              <NuxtLink v-else :to="action?.url" :class="[action.theme ?? 'btn-primary']"
                class="btn d-none d-sm-inline-flex align-items-center">
                <Icon v-if="action.icon" :icon="`${action.icon}`" :class="{ 'me-1': action.label }" />
                <span v-if="`${action.label}`.trim() != ''">{{ action.label }}</span>
              </NuxtLink>
            </template>

            <Dropdown v-else-if="action?.options && (action?.visible ?? true)" :options="action.options" placement="end"
              @select="(option) => action?.click?.(option)">
              <button :class="[action.theme ?? 'btn-primary']" class="btn" :disabled="action.submit ?? false">
                <span v-if="action.submit" class="spinner-border spinner-border-sm" />
                <Icon v-if="action.icon && !action.submit" :icon="`${action.icon}`" :class="{ 'me-1': action.label }" />

                <span v-if="`${action.label}`.trim() != ''"
                  :class="[utils.on(action.label != null, 'ms-1'), 'd-none d-md-block']">{{
                    action.label
                  }}</span>
              </button>
            </Dropdown>

            <button v-else-if="!action?.url && (action?.visible ?? true) && !action?.options"
              :class="[action.theme ?? 'btn-primary']" class="btn" :disabled="action.submit ?? false"
              @click="action?.click?.()">
              <span v-if="action.submit" class="spinner-border spinner-border-sm" />
              <Icon v-if="action.icon && !action.submit" :icon="`${action.icon}`" :class="{ 'me-1': action.label }" />

              <span v-if="`${action.label}`.trim() != ''"
                :class="[utils.on(action.label != null, 'ms-1'), 'd-none d-md-block']">{{
                  action.label
                }}</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { utils } from '../../plugins/utils';

interface Dropdown {
  label: string,
  icon?: string,
  danger?: boolean
}

interface PageHeaderActions {
  url?: string,
  label?: string,
  icon?: string,
  theme?: string,
  visible?: boolean,
  submit?: boolean,
  click?: Function,
  options?: Array<Dropdown>
}

interface BreadcrumbItem {
  label: string,
  path?: string,
  icon?: string
}

export default {
  inheritAttrs: false,

  setup(_, { emit }) {
    return { emit, utils }
  },

  props: {
    pretitle: {
      type: String,
      default: 'overview'
    },

    title: {
      type: String,
      default: 'Dashboard'
    },

    actions: {
      type: Array<PageHeaderActions>,
      default: () => []
    },

    breadcrumb: {
      type: Array<BreadcrumbItem>,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  .hoverable {
    user-select: none;

    &:hover {
      opacity: .7;
      cursor: pointer
    }
  }
}

[data-bs-theme=dark] {
  .breadcrumb {
    a {
      color: #ddd
    }
  }
}
</style>