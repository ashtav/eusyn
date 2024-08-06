<template>
  <div class="p-5">

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat ea possimus aut. Dolor corrupti et facilis aliquid esse aperiam eos nam! Facilis deserunt alias minima quia dolorem sapiente. Corrupti.

  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {

  },

  data() {
    return {
    }
  },

  methods: {
    onSubmit(e: any) {
      e.submit()

      setTimeout(() => {
        e.abort()
      }, 1500);
    }
  },
})
</script>

<style lang="scss">
.playground {
  .section {
    margin: 25px 0;
    padding: 25px 0;
    border-top: 1px #ddd solid;

    h4 {
      margin: 0;
      margin-bottom: 5px
    }

    p {
      margin-bottom: 25px
    }
  }
}
</style>