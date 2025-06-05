<template>
  <div class="page">

    <PageLoader v-if="!mounted" />

    <div v-else>
      <div>
        <!-- toggle -->
        <div :class="['app-navbar', { 'show': showFeature }]">
          <div :class="['toggle']" @click="showFeature = !showFeature">
            <Icon :icon="showFeature ? 'hgi-arrow-left-02' : 'hgi-dashboard-square-02'" />
          </div>

          <div :class="['toggle']" @click="$e.theme.set()">
            <Icon :icon="$e.theme.get.value != 'dark' ? 'hgi-sun-03' : 'hgi-moon-02'" />
          </div>
        </div>

        <!-- features -->
        <div class="features" :class="{ 'show': showFeature }">

          <div class="logo">
            <img src="https://t4.ftcdn.net/jpg/04/18/46/85/360_F_418468557_n9ik8bBHAFZD339wdKOzc0XqeJFFAMSn.jpg">
            <h2>Eusyn.</h2>
          </div>

          <ul>
            <li v-for="x in features">
              <span> {{ x.label }} </span>
              <ul>
                <li v-for="y in x.features" :class="{ 'active': y.to == active }">
                  <NuxtLink :to="y.to">
                    <Icon :icon="y.icon" class="me-1" />
                    <div>{{ y.label }}</div>
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
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      features: [
        {
          label: 'Dashboard',
          features: [
            { label: 'Welcome', to: '/', icon: 'hgi-home-03' },
          ]
        },
        {
          label: 'Forms',
          features: [
            { label: 'Input', to: '/forms/input', icon: 'hgi-dashboard-square-edit' },
            { label: 'Select Option', to: '/forms/select', icon: 'hgi-cursor-rectangle-selection-01' },
            { label: 'Radio & Checkbox', to: '/forms/radio-checkbox', icon: 'hgi-checkmark-square-02' },
            { label: 'Range & Switches', to: '/forms/range-switches', icon: 'hgi-toggle-on' },
            { label: 'Button', to: '/forms/button', icon: 'hgi-cursor-magic-selection-02' },
            { label: 'File Handler', to: '/file-handler', icon: 'hgi-files-01' }
          ]
        },

        {
          label: 'Elements',
          features: [
            { label: 'Accordion', to: '/accordion', icon: 'hgi-square-arrow-down-01' },
            { label: 'Avatar', to: '/elements/avatar', icon: 'hgi-user-circle' },
            { label: 'Cards', to: '/elements/card', icon: 'hgi-credit-card' },
            { label: 'Counter', to: '/elements/counter', icon: 'hgi-arrange-by-numbers-1-9' },
            { label: 'Shimmer', to: '/shimmer', icon: 'hgi-equal-sign-square' },
            { label: 'Spinner', to: '/elements/spinner', icon: 'hgi-loading-03' },
            { label: 'Dropdown', to: '/dropdown', icon: 'hgi-align-right' },
            { label: 'Table', to: '/table', icon: 'hgi-layout-table-02' },
            { label: 'Page Header', to: '/page-header', icon: 'hgi-heading-02' },
            { label: 'Modal, Toast & Confirm', to: '/modal-toast-confirm', icon: 'hgi-archive' },
          ]
        },

        {
          label: 'Media Utilities',
          features: [
            { label: 'Carousel', to: '/media/carousel', icon: 'hgi-carousel-horizontal' },
            { label: 'Cropper', to: '/media/cropper', icon: 'hgi-crop' },
            { label: 'Image Viewer', to: '/media/image-viewer', icon: 'hgi-image-02' },
          ]
        },

        {
          label: 'Plugins',
          features: [
            { label: 'Faker Generator', to: '/plugins/faker', icon: 'hgi-pen-tool-03' },
            { label: 'Image Utilities', to: '/plugins/image', icon: 'hgi-shuffle-square' },
            { label: 'Themes', to: '/plugins/theme', icon: 'hgi-paint-brush-02' },
            { label: 'Utilities', to: '/plugins', icon: 'hgi-wrench-01' },
          ]
        }
      ],

      showFeature: true,
      active: '/',
      darkTheme: true,
      mounted: false
    }
  },

  methods: {

  },

  mounted() {
    this.$e.theme.set('system')
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
.app-navbar {
  position: fixed;
  top: 25px;
  left: calc(25px + 0px);
  transition: .2s;
  display: inline-flex;
  gap: 5px;
  z-index: 9;

  &.show {
    left: calc(25px + 240px);
  }

}

.toggle {
  width: 40px;
  height: 40px;
  border: 1px #ccc solid;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  &:hover {
    border-color: #333;
  }
}

.features {
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
  background: white;
  padding-bottom: 100px;

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

      i {
        top: 3px;
      }

      div {
        display: inline-block;
        margin-left: 10px;
      }
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

[data-bs-theme=dark] {

  .features,
  .toggle {
    background: #182433;
    border-color: #1f2d3d;

    a {
      color: #ccc
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
        li {
          &::before {
            background: #fff;
          }

          &.active {
            a {
              color: #fff;
            }
          }

          &:hover:not(&.active) {
            a {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .toggle {
    &:hover {
      border-color: #3d4e63;
    }
  }
}
</style>