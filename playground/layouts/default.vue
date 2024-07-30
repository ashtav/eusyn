<template>
    <div class="page">
        <div class="features">
            <div class="container">
                <ul>
                    <li v-for="item in features">
                        <NuxtLink :to="item.to"> {{ item.label }} </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <div class="page-body">

            <slot />
        </div>

    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            features: [
                { label: 'Form', to: '/' },
                { label: 'Modal, Toast & Confirm', to: '/modal-toast-confirm' },
                { label: 'Table', to: '/table' },
                { label: 'Dropdown', to: '/dropdown' },
                { label: 'Shimmer', to: '/shimmer' },
                { label: 'File Handler', to: '/file-handler' },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.features {
    background-color: white;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li,
        a {
            display: inline-block;
        }

        li {

            a {
                padding: 15px 20px
            }

            &:first-child a {
                padding-left: 0;
            }
        }
    }
}
</style>