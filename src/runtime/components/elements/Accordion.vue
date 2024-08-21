<template>
    <div class="accordion" id="accordion-example">
        <div class="accordion-item" v-for="(item, i) in items" :key="i">
            <h2 class="accordion-header" :id="'heading-' + i" @click="onExpand(i)">
                <button :class="['accordion-button', { 'collapsed': !expanded.includes(i) }]" type="button"
                    :aria-expanded="expanded.includes(i)">
                    {{ item.label }}
                </button>
            </h2>
            <Transition name="accordion">
                <div v-show="expanded.includes(i)" :id="'collapse-' + i" class="accordion-collapse">
                    <div class="accordion-body pt-0">
                        {{ item.content }}
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>


<script lang="ts">
import { ref, type Ref } from 'vue';

export default {

    props: {
        items: {
            type: Array<Accordion>,
            default: []
        },

        multiple: {
            type: Boolean,
            default: false
        }
    },

    setup(props) {
        const expanded: Ref<Array<number>> = ref([])

        const onExpand = (i: number) => {
            if (props.multiple) {
                if (expanded.value.includes(i)) {
                    expanded.value = expanded.value.filter((e) => e != i)
                    return
                }

                expanded.value.push(i)
            } else {
                if (expanded.value.includes(i)) {
                    return expanded.value = []
                }

                expanded.value = []
                expanded.value.push(i)

            }
        }

        return { expanded, onExpand }
    }
}
</script>

<style lang="scss" scoped>
.accordion-enter-active, .accordion-leave-active {
    transition: max-height 1.4s ease, padding 1.4s ease;
}

.accordion-enter, .accordion-leave-to {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
}

.accordion-enter-active {
    max-height: 500px; /* Sesuaikan dengan konten maksimum yang kamu harapkan */
    overflow: hidden;
}
</style>
