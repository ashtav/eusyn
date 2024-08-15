<template>
  <div class="page">
    <div class="features">
      <div class="container">
        <ul>
          <li v-for="item in features" :key="item.to">
            <NuxtLink :to="item.to">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="page-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      features: [
        { label: 'Utilities', to: '/utils' },
        { label: 'Cropper', to: '/cropper' },
        { label: 'Image Viewer', to: '/image-viewer' },
        { label: 'Form', to: '/' },
        { label: 'Modal, Toast & Confirm', to: '/modal-toast-confirm' },
        { label: 'Table', to: '/table' },
        { label: 'Dropdown', to: '/dropdown' },
        { label: 'Shimmer', to: '/shimmer' },
        { label: 'File Handler', to: '/file-handler' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.features {
    background-color: white;
    width: 100%;
    border-bottom: 1px #e5e5e5 solid;
    overflow: auto;
    scrollbar-width: none;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;

        li,
        a {
            display: inline-block;
            text-wrap: nowrap;
        }

        li {

            a {
                padding: 15px 20px
            }

            &:first-child a {
                padding-left: 0;
            }
        }
    }
}
</style>