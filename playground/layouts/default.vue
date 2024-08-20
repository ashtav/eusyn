<template>
  <div class="page">
    <div>
      <!-- toggle -->
      <div :class="['toggle', { 'show': showFeature }]" @click="showFeature = !showFeature">
        <Ti :icon="showFeature ? 'arrow-left' : 'category'" />
      </div>

      <!-- features -->
      <div class="features" :class="{ 'show': showFeature }">

        <div class="logo">
          <img src="https://t4.ftcdn.net/jpg/04/18/46/85/360_F_418468557_n9ik8bBHAFZD339wdKOzc0XqeJFFAMSn.jpg">
          <h2>NTX.</h2>
        </div>


        <ul>
          <li v-for="x in features">
            <span> {{ x.label }} </span>
            <ul>
              <li v-for="y in x.features" :class="{ 'active': y.to == active }">
                <NuxtLink :to="y.to">
                  <Ti :icon="y.icon" class="me-1" />
                  {{ y.label }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="page-body" :class="{ 'expanded': showFeature }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      features: [
        {
          label: 'Forms',
          features: [
            { label: 'Input', to: '/forms/input', icon: 'forms' },
            { label: 'Select Option', to: '/forms/select', icon: 'select' },
            { label: 'Radio & Checkbox', to: '/forms/radio-checkbox', icon: 'checkbox' },
            { label: 'Range & Switches', to: '/forms/range-switches', icon: 'toggle-right' },
            { label: 'Button', to: '/forms/button', icon: 'click' },
            { label: 'File Handler', to: '/file-handler', icon: 'files' }
          ]
        },

        {
          label: 'Elements',
          features: [
            { label: 'Cropper', to: '/cropper', icon: 'crop' },
            { label: 'Image Viewer', to: '/image-viewer', icon: 'photo' },
            { label: 'Shimmer', to: '/shimmer', icon: 'wash-dry-shade' },
            { label: 'Dropdown', to: '/dropdown', icon: 'align-justified' },
            { label: 'Table', to: '/table', icon: 'table' },
            { label: 'Modal, Toast & Confirm', to: '/modal-toast-confirm', icon: 'square-chevron-up' },
          ]
        },

        {
          label: 'Plugins',
          features: [
            { label: 'Faker Generator', to: '/plugins/faker', icon: 'writing' },
            { label: 'Image Utilities', to: '/plugins/image', icon: 'layout-collage' },
            { label: 'Utilities', to: '/plugins', icon: 'category' },
          ]
        }
      ],

      showFeature: true,
      active: '/'
    }
  },

  watch: {
    $route(value) {
      this.active = value.path
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px #ccc solid;
  border-radius: 5px;
  cursor: pointer;
  top: 25px;
  left: calc(25px + 0px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
  background-color: white;
  z-index: 9;

  &:hover {
    border-color: #333;
  }

  &.show {
    left: calc(25px + 240px);
  }
}

.features {
  background-color: white;
  width: 240px;
  overflow: auto;
  scrollbar-width: none;
  position: fixed;
  height: 100%;
  left: -240px;
  top: 0;
  transition: .2s;
  z-index: 999;
  border-right: 1px #f1f1f1 solid;

  &.show {
    left: 0;
  }

  .logo {
    display: flex;
    padding: 20px;

    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 5px;
    }

    h2 {
      margin: 0;
      margin-left: 15px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li,
    a {
      text-wrap: nowrap;
    }

    li {
      display: block;

      span {
        display: inline-block;
        padding: 15px 20px;
        text-transform: uppercase;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 1px;
        color: #888;
        margin-top: 25px;
      }

      a {
        display: block;
        padding: 10px 20px;
        text-decoration: none;
        color: #555;
        font-size: 13px;
      }

      li {
        position: relative;


        &::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 100%;
          right: 0;
          background: #0054a6;
          opacity: 0;
          transition: .2s;
        }

        &.active {
          a {
            color: #0054a6;
          }

          &::before {
            opacity: 1;
          }
        }

        &:hover:not(&.active) {
          a {
            color: #222;
          }
        }
      }
    }
  }
}

.page-body {
  transition: .5s;
  padding: 26px;
  padding-top: 70px;

  &.expanded {
    margin-left: 240px;
  }
}
</style>