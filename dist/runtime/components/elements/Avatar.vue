<template>

    <div v-if="list.length != 0" :class="['avatar-list', {'avatar-list-stacked': stacked}]">
        <span :class="['avatar', size]" v-for="avatar in list" :style="{backgroundImage: `url('${avatar.url}')`, borderRadius: radius}" >
            {{ avatar.url ? '' : avatar.alt }}
        </span>
    </div>

    <span v-else :class="['avatar', size]" :style="{backgroundImage: `url('${url}')`, borderRadius: radius}">
        {{ url ? '' : alt }}

        <!-- <span class="badge bg-danger"></span> -->
    </span>
</template>

<script>
export default {
  props: {
    url: {
      type: String
    },
    size: {
      type: String,
      default: "md"
    },
    alt: {
      type: String
    },
    radius: {
      type: String,
      default: "5px"
    },
    list: {
      type: Array,
      default: []
    },
    stacked: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {};
  }
};
</script>

<style scoped>
.avatar.xs {
  width: 32px;
  height: 32px;
}
.avatar.sm {
  width: 40px;
  height: 40px;
}
.avatar.md {
  width: 64px;
  height: 64px;
}
.avatar.lg {
  width: 88px;
  height: 88px;
}
.avatar.xl {
  width: 112px;
  height: 112px;
}
</style>