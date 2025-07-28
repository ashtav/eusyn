<template>
    <div class="features" :class="{ 'show': true }">

        <div class="logo">
            <img src="https://t4.ftcdn.net/jpg/04/18/46/85/360_F_418468557_n9ik8bBHAFZD339wdKOzc0XqeJFFAMSn.jpg">
            <h2>Eusyn.</h2>
        </div>

        <ul>
            <li v-for="x in features">
                <span> {{ x.label }} </span>
                <ul>
                    <li v-for="y in x.features" :class="{ 'active': y.to == active }">
                        <NuxtLink :to="y.to">
                            <Icon :icon="y.icon" class="me-1" />
                            <div>{{ y.label }}</div>
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import "@/assets/scss/sidebar.scss";

export default {
    setup() {
        const features = [
            {
                label: 'Dashboard',
                features: [
                    { label: 'Welcome', to: '/', icon: 'hgi-home-03' },
                ]
            },
            {
                label: 'Forms',
                features: [
                    { label: 'Input', to: '/forms/input', icon: 'hgi-pencil' },
                    { label: 'Textarea', to: '/forms/textarea', icon: 'hgi-pencil-edit-02' },
                    { label: 'Number', to: '/forms/number', icon: 'hgi-board-math' },
                    { label: 'Date Picker', to: '/forms/date', icon: 'hgi-calendar-02' },
                    { label: 'Time Picker', to: '/forms/time', icon: 'hgi-clock-02' },
                    { label: 'Select Option', to: '/forms/select', icon: 'hgi-cursor-rectangle-selection-01' },
                    { label: 'Radio & Checkbox', to: '/forms/radio-checkbox', icon: 'hgi-checkmark-square-02' },
                    { label: 'Range & Switches', to: '/forms/range-switches', icon: 'hgi-toggle-on' },
                    { label: 'Button', to: '/forms/button', icon: 'hgi-cursor-magic-selection-02' },
                    { label: 'File Handler', to: '/file-handler', icon: 'hgi-files-01' }
                ]
            },

            {
                label: 'Elements',
                features: [
                    { label: 'Accordion', to: '/accordion', icon: 'hgi-square-arrow-down-01' },
                    { label: 'Avatar', to: '/elements/avatar', icon: 'hgi-user-circle' },
                    { label: 'Cards', to: '/elements/card', icon: 'hgi-credit-card' },
                    { label: 'Counter', to: '/elements/counter', icon: 'hgi-arrange-by-numbers-1-9' },
                    { label: 'Shimmer', to: '/shimmer', icon: 'hgi-equal-sign-square' },
                    { label: 'Spinner', to: '/elements/spinner', icon: 'hgi-loading-03' },
                    { label: 'List Group', to: '/elements/list-group', icon: 'hgi-left-to-right-list-bullet' },
                    { label: 'Dropdown', to: '/dropdown', icon: 'hgi-align-right' },
                    { label: 'Table', to: '/table', icon: 'hgi-layout-table-02' },
                    { label: 'Page Header', to: '/page-header', icon: 'hgi-heading-02' },
                    { label: 'Modal, Toast & Confirm', to: '/modal-toast-confirm', icon: 'hgi-archive' },
                ]
            },

            {
                label: 'Media Utilities',
                features: [
                    { label: 'Carousel', to: '/media/carousel', icon: 'hgi-carousel-horizontal' },
                    { label: 'Cropper', to: '/media/cropper', icon: 'hgi-crop' },
                    { label: 'Image Viewer', to: '/media/image-viewer', icon: 'hgi-image-02' },
                ]
            },

            {
                label: 'Plugins',
                features: [
                    { label: 'Faker Generator', to: '/plugins/faker', icon: 'hgi-pen-tool-03' },
                    { label: 'Image Utilities', to: '/plugins/image', icon: 'hgi-shuffle-square' },
                    { label: 'Themes', to: '/plugins/theme', icon: 'hgi-paint-brush-02' },
                    { label: 'Utilities', to: '/plugins', icon: 'hgi-wrench-01' },
                ]
            }
        ];

        const active = '/';


        return { features, active }
    }
}
</script>

<style lang="scss" scoped></style>