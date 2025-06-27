<template>
  <div class="page">
    <PageLoader v-if="!mounted" />

    <div v-else>
      <Navbar />
      <Sidebar />

      <div class="page-body" :class="{ 'expanded': showFeature }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authMiddleware from "~/middleware/auth";

export default {
  setup() {
    const nuxt = useNuxtApp();
    const route = useRoute();
    const from = ref(route);

    authMiddleware(route, from.value);

    // theme toggle
    const theme = useCookie('theme');

    const toggleTheme = () => {
      const currentTheme = theme.value || 'system';
      const value = currentTheme === 'dark' ? 'light' : 'dark'

      theme.value = value;
      nuxt.$e.theme.set(value);
    };

    return { toggleTheme };
  },

  data() {
    return {
      showFeature: true,
      active: '/',
      darkTheme: true,
      mounted: false
    }
  },

  methods: {

  },

  mounted() {
    this.active = this.$route.path
    this.mounted = true
  },

  watch: {
    $route(value) {
      this.active = value.path
    }
  }
}
</script>

<style lang="scss" scoped>
.page-body {
  transition: .5s;
  padding: 26px 50px;
  padding-top: 70px;

  &.expanded {
    margin-left: 240px;
  }
}
</style>