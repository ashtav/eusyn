<template>

    <div class="app" :class="{ 'expanded': app.sidebar.expanded }">
        <div class="page">
            <ClientOnly>
                <Sidebar />
            </ClientOnly>

            <div class="page-content">
                <Navbar />

                <slot />

                <div class="login-session">

                    <div class="content">
                        <h4> Authorization </h4>
                        <p class="mb-6">To be able to access data on this site, please enter your email and password
                            correctly. Three failed attempts, your IP will be blocked.</p>

                        <Input label="Email" hint="Enter email address" required />
                        <Input label="Password" hint="Enter password" required password />

                        <p class="mb-5">
                            <a href="#">Forgot Password!</a>
                        </p>

                        <Button label="Login" theme="w-100 btn-primary" />
                    </div>

                </div>
            </div>

            <div class="backdrop"></div>
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
        backdrop-filter: blur(3px)
    }

    .login-session {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;

        .content {
            position: absolute;
            background-color: white;
            top: 0;
            right: 0;
            width: 330px;
            height: 100%;
            z-index: 99999;
            padding: 30px;
            border-radius: 6px
        }




    }
}

@media (max-width: 1600px) {
    .app {
        padding: 50px 10%;
    }
}
</style>