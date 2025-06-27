<template>
  <div
    class="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center py-5"
  >
    <h1>
      {{ error.statusCode || "Error" }}
    </h1>
    <p class="text-muted m-0 strong">
      {{ error.message || "Something went wrong. Please try again later." }}
    </p>

    <div v-if="error.statusCode === 404" class="text-secondary">
      The page you're looking for might have been moved or doesn't exist.
    </div>

    <button
      @click="goBack"
      class="btn btn-pill btn-outline-primary mt-4"
      v-if="error.statusCode === 404"
    >
      Back to Previous Page
    </button>
  </div>
</template>

<script setup>
  defineProps(["error"]);

  const theme = useCookie("theme");

  useHead({
    htmlAttrs: {
      "data-bs-theme": theme.value || "light",
    },
  });

  const goBack = () => {
    if (import.meta.client) {
      window.history.length > 2 ? window.history.back() : navigateTo("/");
    }
  };
</script>
