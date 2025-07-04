<template>
  <div>
    <div class="row row-cards" v-if="['tile', 'card'].includes(type)">
      <div :class="$attrs.class ?? 'col-sm-6 col-lg-3'" v-for="i in iterate" :key="i">
        <div class="card card-sm">
          <div class="card-body" :class="{ 'p-3 py-2': type == 'tile' }">
            <div class="row align-items-center">
              <div class="col-auto">
                <Shimmer :size="type == 'card' ? 40 : 20" />
              </div>
              <div class="col">
                <Shimmer :size="size" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else v-for="i in iterate" :key="i" class="shimmer"
      :style="{ ...styles[i], marginBottom: `${(i == iterate) ? '0' : (gap ? gap : (iterate <= 1 ? '0' : '5'))}px` }" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { utils } from "../../plugins/utils";
export default {
  inheritAttrs: false,
  props: {
    size: {
      type: [Array, Number, String],
      default: [50, 15]
    },
    radius: {
      type: [Number, String],
      default: 5
    },
    iterate: {
      type: Number,
      default: 1
    },
    gap: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "default"
      // tile, card
    }
  },
  setup(props) {
    const styles = ref([]);
    const setSize = () => {
      styles.value = [];
      for (let i = -1; i < props.iterate; i++) {
        const isSingle = typeof props.size == "number" || typeof props.size == "string";
        let width = "50px", height = "15px";
        const format = (value) => {
          return `${value}`.includes("%") ? value : value + "px";
        };
        const numeric = (value) => {
          const numbers = `${value}`.replace(/\D/g, "");
          return parseInt(numbers, 10);
        };
        if (isSingle) {
          width = format(props.size);
          height = format(props.size);
        } else {
          const sizes = props.size;
          const apply = (array, index) => {
            const size = array[index];
            let result = "15px";
            if (typeof size === "number") {
              result = format(size);
            } else if (typeof size === "string") {
              result = format(size);
            } else {
              const sizes2 = size;
              if (!sizes2 || sizes2.length == 0) {
                return result;
              }
              if (sizes2.length == 1) {
                result = format(sizes2[0]);
              } else {
                const rand = utils.randInt(numeric(sizes2[0]), numeric(sizes2[1]));
                result = `${sizes2}`.includes("%") ? rand + "%" : rand + "px";
              }
            }
            return result;
          };
          if (sizes.length == 1) {
            width = apply(sizes, 0);
          } else {
            width = apply(sizes, 0);
            height = apply(sizes, 1);
          }
        }
        styles.value.push({
          width,
          height,
          borderRadius: getRadius(props.radius)
        });
      }
    };
    const getRadius = (value) => {
      const radius = `${value}`;
      return radius.includes("%") ? radius : radius + "px";
    };
    onMounted(() => setSize());
    watch(() => props.size, () => setSize());
    watch(() => props.radius, (value) => {
      const reStyles = styles.value.map((e) => {
        return {
          width: e.width,
          height: e.height,
          borderRadius: getRadius(value)
        };
      });
      styles.value = reStyles;
    });
    return { utils, styles };
  }
};
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.shimmer {
  background: linear-gradient(to right, #ddd 8%, #edeef1 28%, #ddd 33%);
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}

[data-bs-theme=dark] .shimmer {
  background: linear-gradient(to right, #263647 8%, #2d3e52 28%, #263647 33%);
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}
</style>