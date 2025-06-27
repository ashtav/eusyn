<template>
    <div :class="['navbar', { 'show': true }]">
        <!-- <div :class="['toggle']" @click="showFeature = !showFeature">
            <Icon :icon="showFeature ? 'hgi-arrow-left-02' : 'hgi-dashboard-square-02'" />
        </div> -->

        <div>
            <span @click="toggleTheme">
                <Icon :icon="$e.theme.get.value != 'dark' ? 'hgi-sun-03' : 'hgi-moon-02'" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import "@/assets/scss/navbar.scss";

export default {
    setup() {
        const nuxt = useNuxtApp();

        // theme toggle
        const theme = useCookie('theme');

        const toggleTheme = () => {
            const currentTheme = theme.value || 'system';
            const value = currentTheme === 'dark' ? 'light' : 'dark'

            theme.value = value;
            nuxt.$e.theme.set(value);
        };

        return { toggleTheme };
    }
}
</script>