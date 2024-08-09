<template>

    <div class="app" :class="{ 'expanded': app.sidebar.expanded }">
        <div class="page">
            <ClientOnly>
                <Sidebar />
            </ClientOnly>

            <div class="page-content">
                <Navbar />

                <slot />

                <Login />
            </div>

            <div class="backdrop" :class="{ 'show': app.backdrop }"></div>
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
    },

    watch: {
        $route: function (value) {
            this.app.navbar.actions = []
            this.app.assignPath(value.matched ?? [])
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
    }

    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        backdrop-filter: blur(3px);
        opacity: 0;
        pointer-events: none;
        transition: .4s;
        z-index: 99998;

        &.show {
            opacity: 1;
            pointer-events: all;
        }
    }
}

@media (max-width: 1600px) {
    .app {
        padding: 50px 5%;
    }
}
</style>