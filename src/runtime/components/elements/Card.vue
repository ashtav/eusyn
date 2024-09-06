<template>
    <div
        :class="tabs.length != 0 ? ['card-tabs', { 'reverse': tabPos == 'bottom' }] : ['card', { 'card-stacked': stacked }]">

        <!-- card navigation for tabs -->
        <ul class="nav nav-tabs" :class="{ 'nav-tabs-bottom': tabPos == 'bottom' }" v-if="tabs.length != 0">
            <li class="nav-item" v-for="(tab, i) in tabs"><span @click="onTab(i)"
                    :class="['nav-link', { 'active': tabActive == i }]">
                    <Ti v-if="tab.icon" :icon="tab.icon" class="me-2" size="xs" /> {{ tab.label }}
                </span></li>
        </ul>

        <!-- tab content -->
        <div class="tab-content" v-if="tabs.length != 0">
            <div id="tab-top-1" class="card tab-pane active show">
                <slot :tab="tabActive" />
            </div>
        </div>

        <!-- <div class="card-status-top bg-danger"></div> -->
        <div v-if="tabs.length == 0">
            <div v-if="thumbnail" class="img-responsive card-img-top"
                :style="{ backgroundImage: `url('${thumbnail}')` }">
            </div>
            <div>
                <div :class="['card-header', { 'border-0': !elevation, 'pb-0': dense }]">
                    <h3 class="card-title" :class="titleStyle"> {{ title }} </h3>
                    <div class="card-actions btn-actions" v-if="actions.length != 0">
                        <span class="btn-action" v-for="action in actions" @click="action?.click(action)">
                            <Ti :icon="action.icon" />
                        </span>
                    </div>
                </div>

                <!-- <h3 class="card-title" v-if="title">{{ title }}</h3> -->
                <div :class="['card-body', { 'pt-0': !elevation }]">
                    <slot />
                </div>
            </div>
        </div>

        <div :class="['ribbon', `ribbon-${ribbon?.position}`, ribbon?.background ?? 'bg-red']"
            v-if="tabs.length == 0 && actions.length == 0 && ribbon">
            <Ti v-if="ribbon?.content.toString().includes(':')" :icon="ribbon?.content.toString().split(':')[1]" />
            <span v-else>{{ ribbon?.content }}</span>
        </div>
    </div>

</template>

<script lang="ts">
import { ref, type PropType, type Ref } from 'vue';

interface TabData {
    label?: string,
    icon?: string
}

interface TabAction {
    icon: string,
    click?: (data: TabAction) => {}
}

interface RibbonCard {
    background?: string,
    content: string | number,
    position?: string
}

export default {
    props: {
        title: {
            type: String,
        },

        thumbnail: {
            type: String
        },

        elevation: {
            type: Boolean,
            default: false
        },

        stacked: {
            type: Boolean,
            default: false
        },

        dense: {
            type: Boolean,
            default: false
        },

        titleStyle: {
            type: String
        },

        ribbon: {
            type: Object as PropType<RibbonCard>,
            default: null
        },

        actions: {
            type: Array<TabAction>,
            default: []
        },

        tabs: {
            type: Array<TabData>,
            default: []
        },

        tabPos: {
            type: String,
            default: 'top'
        }
    },

    setup() {
        const tabActive: Ref<number> = ref(0)

        const onTab = (i: number) => tabActive.value = i

        return { tabActive, onTab }
    }
}
</script>

<style lang="scss" scoped>
.nav-item span,
.btn-action {
    cursor: pointer;
    user-select: none;
}

.card-tabs {
    &.reverse {
        display: flex;
        flex-direction: column-reverse;

        .tab-content .tab-pane {
            border-radius: 4px 4px 4px 0;
        }
    }
}
</style>