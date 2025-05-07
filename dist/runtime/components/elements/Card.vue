<template>
    <div
        :class="tabs.length != 0 ? ['card-tabs', { 'reverse': tabPos == 'bottom' }] : ['card', { 'card-stacked': stacked }]">

        <!-- card navigation for tabs -->
        <ul class="nav nav-tabs" :class="{ 'nav-tabs-bottom': tabPos == 'bottom' }" v-if="tabs.length != 0">
            <li class="nav-item" v-for="(tab, i) in tabs"><span @click="onTab(i)"
                    :class="['nav-link', { 'active': tabActive == i }]">
                    <Icon v-if="tab.icon" :icon="tab.icon" class="me-2" size="xs" /> {{ tab.label }}
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
                <div :class="['card-header', { 'border-0': !elevation, 'pb-0': dense }]" v-if="title">
                    <h3 class="card-title" :class="titleStyle"> {{ title }} </h3>
                    <div class="card-actions btn-actions" v-if="actions.length != 0">
                        <span class="btn-action" v-for="action in actions" @click="action?.click(action)">
                            <Icon :icon="action.icon" />
                        </span>
                    </div>
                </div>

                <!-- <h3 class="card-title" v-if="title">{{ title }}</h3> -->
                <div :class="['card-body', { 'pt-0': !elevation && title }]">
                    <slot />
                </div>
            </div>
        </div>

        <div :class="['ribbon', `ribbon-${ribbon?.position}`, ribbon?.background ?? 'bg-red']"
            v-if="tabs.length == 0 && actions.length == 0 && ribbon">
            <Icon v-if="ribbon?.content.toString().includes(':')" :icon="ribbon?.content.toString().split(':')[1]" />
            <span v-else>{{ ribbon?.content }}</span>
        </div>
    </div>

</template>

<script>
import { ref } from "vue";
export default {
  props: {
    title: {
      type: String
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
      type: Object,
      default: null
    },
    actions: {
      type: Array,
      default: []
    },
    tabs: {
      type: Array,
      default: []
    },
    tabPos: {
      type: String,
      default: "top"
    }
  },
  setup() {
    const tabActive = ref(0);
    const onTab = (i) => tabActive.value = i;
    return { tabActive, onTab };
  }
};
</script>

<style scoped>
.nav-item span,
.btn-action {
  cursor: pointer;
  user-select: none;
}

.card-tabs.reverse {
  display: flex;
  flex-direction: column-reverse;
}
.card-tabs.reverse .tab-content .tab-pane {
  border-radius: 4px 4px 4px 0;
}
</style>