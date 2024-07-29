<template>
  <div class="playground">
    <div class="container row py-6 mb-6">

      <div class="col-lg-6">
        <h2>LazyUI</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt suscipit expedita sed cumque harum libero
          reiciendis? Enim voluptas reprehenderit alias omnis sequi corrupti est, nulla quo ea similique exercitationem
          voluptates.</p>

        <ul>
          <li>
            <NuxtLink to="/modal-toast-confirm">Modal, Toast & Confirm</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/table">Table</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/dropdown">Dropdown</NuxtLink>
          </li>
        </ul>

        <section class="section">
          <InputExample />
        </section>

        <section class="section">
          <SelectExample />
        </section>

        <section class="section">
          <RadioCheckboxExample />
        </section>

        <section class="section">
          <Button label="Submit" @click="onSubmit" theme="btn-outline-dark" icon="ti-send" />
        </section>
      </div>
    </div>
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

  setup(props, { }) {

  }
})
</script>

<style lang="scss">
.playground {
  min-height: 100vh;
  width: 100%;
  background-color: #fbfbfb;
  display: flex;
  align-items: center;
  justify-content: center;

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