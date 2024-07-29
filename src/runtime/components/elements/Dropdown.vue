<template>
    <ClientOnly>
        <div :class="['dropdown d-inline', dkey]">
            <span @click="toggle" ref="slot">
                <slot />
            </span>

            <div :class="[`dropdown-menu mt-2`, size, { 'show': show }]" :style="additionalStyle" ref="dropdown">
                <span class="dropdown-item text-muted disabled" v-if="options_.length == 0">No data found!</span>

                <template v-else v-for="(option, i) in options_">
                    <span :class="['dropdown-item', { 'text-danger': option?.danger }]" @click="onSelect(option)">
                        <Row justify="between" class="w-100">
                            <span>{{ textOption(option) }}</span>
                            <Ti :icon="option.icon" v-if="option?.icon" />
                        </Row>
                    </span>

                    <div class="dropdown-divider" v-if="separate.includes(i) && i < (options_.length - 1)"></div>
                </template>
            </div>
        </div>
    </ClientOnly>


</template>

<script lang="ts">
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import { utils } from '../../plugins/utils';

interface Dropdown {
    label: string,
    icon?: string,
    danger?: boolean
}

export default {
    inheritAttrs: false,
    emits: ['select'],

    props: {
        options: {
            type: Array<Dropdown>,
            default: []
        },

        icons: {
            type: Array<String>,
            default: () => []
        },

        size: {
            type: String,
            default: 'lg'
        },

        placement: {
            type: String,
            default: 'start'
        },

        separate: {
            type: Array<number>,
            default: () => []
        }
    },

    setup(props, { emit }) {
        let options_ = ref(props.options)

        let dropdown = ref(null), slot = ref(null)
        let key = ref('')

        const show: Ref<boolean> = ref(false)
        const additionalStyle: Ref<Record<string, any>> = ref({})
        let dkey: string = utils.randString()

        const toggle = () => {
            show.value = !show.value
            additionalStyle.value = {
                opacity: 0
            }

            let elSlot = slot.value as HTMLElement
            let height = elSlot.offsetHeight;

            setTimeout(() => {
                let el = dropdown.value as HTMLElement
                if (isElementOutOfScreenBottom(el)) {
                    additionalStyle.value = {
                        inset: 'auto 0px 0px auto',
                        transform: `translate(0px, -${height + 15}px)`,
                        opacity: 0
                    }
                }

                setTimeout(() => {
                    if (isElementOutOfScreenTop(el)) {
                        additionalStyle.value = {}
                    }

                    additionalStyle.value['opacity'] = 1

                    if (props.placement == 'end') {
                        additionalStyle.value['right'] = 0
                    }
                }, 1);
            }, 1);
        }

        const textOption = (data: any) => {
            return typeof data === 'string' ? data : (data?.label ?? '')
        }

        const onSelect = (option: any) => {
            show.value = false
            emit('select', option)
        }

        const isElementOutOfScreenTop = (element: HTMLElement): boolean => {
            return element.offsetTop < 0;
        }

        const isElementOutOfScreenBottom = (element: HTMLElement): boolean => {
            const rect = element.getBoundingClientRect();
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

            return rect.bottom > windowHeight;
        }

        // watch options
        watch(() => props.options, (value) => {
            options_.value = value
        })

        onMounted(() => {
            key.value = utils.randString()

            // listen click event
            document.addEventListener('click', (e) => {
                if (show.value) {
                    const parentClass = dkey;
                    let targetElement = e.target as HTMLElement;

                    // function to check if an element or its parent has the parentClass
                    const isInsideParentClass = (element: HTMLElement | null): boolean => {
                        while (element) {
                            if (element.classList.contains(parentClass)) {
                                return true;
                            }
                            element = element.parentElement;
                        }
                        return false;
                    };

                    // check if the clicked target is outside the parentClass
                    if (!isInsideParentClass(targetElement)) {
                        show.value = false;
                    }
                }
            })
        })

        return { show, utils, options_, dropdown, slot, dkey, additionalStyle, toggle, textOption, onSelect, }
    }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
    max-height: 290px;
    overflow-y: auto;
    position: absolute;

    // hide scrollbar
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */

    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
        /* Chrome/Safari/Webkit */
    }

    .dropdown-item {
        color: #666;
        cursor: pointer;

        &:hover {
            background: #fafafa;
            color: #333;
        }

        &.active {
            color: #0054a6 !important;
        }
    }

    .dropdown-divider {
        margin: 4px 0;
    }

    &.sm {
        min-width: 80px !important;
        max-width: 80px !important;
        overflow: hidden;
    }

    &.md {
        min-width: 160px !important;
        max-width: 160px !important;
        overflow: hidden;
    }
}
</style>