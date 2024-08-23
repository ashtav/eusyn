<template>
    <div>
        <PageHeader title="Themes" />

        <div class="row">
            <div class="col-6 mb-5">
                <p>Change your app theme to match your preferences. You can switch between dark and light modes, or let
                    the system's theme preference dictate the appearance.</p> <br>
                <Switch @change="$ntx.theme.set()" :caption="$ntx.utils.ucwords($ntx.theme.get.value)" />

                <Code class="mb-2" code='$ntx.theme.set()' description="Toggle theme between dark and light modes." />
                <Code class="mb-2" code='$ntx.theme.set("system")'
                    description="Automatically adjusts the theme based on the system's theme preference. If your system is set to dark mode, the app will also switch to dark mode, and vice versa." />

                <Code class="mb-2" code='$ntx.theme.set("dark")'
                    description="Forces the app theme to dark mode, regardless of the system's theme preference." />

                <Code code='$ntx.theme.set("light")'
                    description="Forces the app theme to light mode, regardless of the system's theme preference." />


                <Theme :active="on">
                    <Switch @change="on = !on" caption="OFF|ON" />
                </Theme>

            </div>
        </div>

    </div>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },

    data() {
        return {
            on: false
        }
    },
}
</script>