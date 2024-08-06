<template>

    <div class="app" :class="{ 'expanded': app.sidebar.expanded }">
        <div class="page">
            <ClientOnly>
                <Sidebar />
            </ClientOnly>

            <div class="page-content">
                <nav class="navbar">
                    <span class="prev-page">
                        <Ti icon="ti-chevron-left" size="md" />
                    </span>
                    <span class="url-bar me-auto">
                        <ul>
                            <li>Dashboard</li>
                            <li>Notification</li>
                        </ul>
                    </span>

                    <span>
                        <Ti icon="ti-plus" class="me-1" /> New Tab
                    </span>
                </nav>

                <slot />
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { useAppStore } from "@/stores/app";

export default {
    setup() {
        const app = useAppStore()

        return {
            app
        }
    }
}
</script>

<style lang="scss" scoped>
.app {
    padding: 50px 15%;
    transition: .2s;

    &.expanded {
        padding: 0px 0%;

        .page {
            border-width: 0px;
            height: 100vh;
            border-radius: 0px;
        }
    }

    .page {
        position: relative;
        border: 5px rgba(255, 255, 255, .7) solid;
        border-radius: 10px;
        height: calc(100vh - 100px);
        box-shadow: 0px 15px 50px 1px #ddd;
        transition: .2s;
    }

    .page-content {
        position: absolute;
        right: 10px;
        background-color: white;
        width: calc(100% - (250px + 10px));
        height: calc(100% - 20px);
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;

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
    }
}

@media (max-width: 1600px) {
    .app {
        padding: 50px 10%;
    }
}
</style>