<template>
    <div class="page-header d-print-none mb-5">
        <div class="row g-2 align-items-center">
            <div class="col">
                <!-- Page pre-title -->
                <div class="page-pretitle"> Overview </div>
                <h2 class="page-title d-inline" :class="utils.on($attrs?.onClick_ != null, 'hoverable')" v-text="title"
                    @click="emit('click')" />
            </div>
            <!-- Page title actions -->
            <div class="col-auto ms-auto d-print-none">
                <div class="btn-list">

                    <template v-for="action in actions">
                        <template v-if="action?.url && (action?.visible ?? true)">
                            <a :href="action?.url" target="_blank" :class="[action.theme ?? 'btn-primary']"
                                class="btn d-none d-sm-inline-block"
                                v-if="action?.url && `${action?.url}`.includes('http')">
                                <i :class="['ti', action.icon, utils.on(action.label, 'me-2')]" v-if="action.icon"></i>
                                <span v-if="`${action.label}`.trim() != ''">{{ action.label }}</span>
                            </a>

                            <NuxtLink :to="action?.url" :class="[action.theme ?? 'btn-primary']"
                                class="btn d-none d-sm-inline-block" v-else>
                                <i :class="['ti', action.icon, utils.on(action.label, 'me-2')]" v-if="action.icon"></i>
                                <span v-if="`${action.label}`.trim() != ''">{{ action.label }}</span>
                            </NuxtLink>
                        </template>

                        <button :class="[action.theme ?? 'btn-primary']" class="btn" :disabled="action.submit"
                            v-if="!action?.url && (action?.visible ?? true)" @click="action?.click?.call()">

                            <span class="spinner-border spinner-border-sm" v-if="action.submit"></span>
                            <i :class="['ti', action.icon]" v-if="action.icon && !action.submit"></i>

                            <span v-if="`${action.label}`.trim() != ''"
                                :class="[utils.on(action.label, 'ms-2'), 'd-none d-md-block']">{{
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
import { utils } from '../../utils';

export default {
    inheritAttrs: false,

    setup(_, { emit }) {
        return { emit, utils }
    },

    props: {
        title: {
            type: String,
            default: 'Dashboard'
        },

        actions: {
            type: Array<any>,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped></style>