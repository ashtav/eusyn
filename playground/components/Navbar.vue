<template>
    <div :class="['app-navbar', { 'show': true }]">
        <!-- <div :class="['toggle']" @click="showFeature = !showFeature">
            <Icon :icon="showFeature ? 'hgi-arrow-left-02' : 'hgi-dashboard-square-02'" />
        </div> -->

        <div :class="['toggle']" @click="toggleTheme">
            <Icon :icon="$e.theme.get.value != 'dark' ? 'hgi-sun-03' : 'hgi-moon-02'" />
        </div>
    </div>
</template>

<script lang="ts">
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

<style lang="scss" scoped></style>