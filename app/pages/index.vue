<template>
  <div>
    <!-- <PageHeader /> -->

    <h4>Hello World!</h4>
    <p>{{ $utils.alpha('he3ll0o! - 123Brot3her!') }}</p>

    <!-- {{ $ }} -->

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat ea possimus aut. Dolor corrupti et
      facilis aliquid esse aperiam eos nam! Facilis deserunt alias minima quia dolorem sapiente. Corrupti.
    </p>

    <button label="Click Me!" @click="test"> Click Me! </button>

  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
    }
  },

  methods: {
    test() {
      this.$toast.warning('Hello dude!');
    }
  },
})
</script>

<style lang="scss"></style>