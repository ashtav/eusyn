<template>
    <nav class="navbar">
        <span class="prev-page">
            <Ti icon="ti-chevron-left" size="md" />
        </span>
        <span class="url-bar me-auto">
            <ul>
                <li>
                    <NuxtLink to="/"> Dashboard </NuxtLink>
                </li>
                <li v-for="path in paths">
                    <NuxtLink :to="path.path"> {{ $_.ucwords(path.name) }} </NuxtLink>
                </li>
            </ul>
        </span>

        <span v-for="action in app.navbar.actions" @click="action?.click()">
            <Ti :icon="action.icon" class="me-1" /> {{ action.label }}
        </span>
    </nav>
</template>

<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";

export default {
    setup() {
        const app = useAppStore()
        const auth = useAuthStore()

        return {
            app,
            auth
        }
    },

    computed: {
        paths() {
            return this.app.paths
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    min-height: auto !important;
    padding: 5px 10px;
    align-items: center;
    justify-content: start;

    span {
        padding: 8px 10px;
        transition: .1s;
        border-radius: 5px;
        position: relative;
        user-select: none;

        &:not(&:last-child) {
            margin-right: 18px;
        }

        &.prev-page {
            opacity: .6;

            &::before {
                content: '';
                position: absolute;
                right: -10px;
                top: 50%;
                transform: translate(0, -50%);
                height: 70%;
                width: 1px;
                background-color: #ddd;
            }
        }

        &:not(&.url-bar) {
            &:hover {
                cursor: pointer;
                background: #f5f5f5
            }

            &:active {
                opacity: .6;
            }
        }

        ul {
            padding: 0;
            margin: 0;

            li {
                display: inline-block;
                color: #777;
                margin-right: 32px;
                position: relative;

                a {
                    text-decoration: none;
                    display: inline-block;
                }

                &:hover {
                    cursor: pointer;
                    opacity: .7;
                }

                &:not(&:last-child)::before {
                    content: '';
                    position: absolute;
                    right: -15px;
                    top: 50%;
                    transform: translate(0, -50%) rotate(15deg);
                    height: 70%;
                    width: 1px;
                    background-color: #ccc;
                }

                &:last-child {
                    font-weight: bold;
                    color: #333;
                }
            }
        }
    }
}
</style>