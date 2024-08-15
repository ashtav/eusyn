<template>
  <div>
    <div
      v-for="i in iterate" :key="i"
      class="shimmer"
      :style="{ ...styles[i], marginBottom: `${(i == iterate) ? '0' : (gap ? gap : (iterate <= 1 ? '0' : '5'))}px` }"
    />
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { utils } from '../../plugins/utils';

export default {
  props: {
    size: {
      type: [Array<any>, Number, String],
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
    }
  },

  setup (props) {
    const styles: Ref<Array<Record<string, any>>> = ref([])

    const setSize = () => {
      styles.value = []

      for (let i = -1; i < props.iterate; i++) {

        const isSingle = typeof props.size == 'number' || typeof props.size == 'string'
        let width: string = '50px', height: string = '15px'

        const format = (value: any) => {
          return `${value}`.includes('%') ? value : value + 'px'
        }

        const numeric = (value: any): number => {
          const numbers = `${value}`.replace(/\D/g, '')
          return parseInt(numbers, 10)
        }

        if (isSingle) {
          width = format(props.size)
          height = format(props.size)
        }

        else {
          // it's array [width, height]
          const sizes = props.size as Array<any>

          const apply = (array: Array<any>, index: number): string => {
            const size = array[index]
            let result: string = '15px'

            if (typeof size === 'number') {
              result = format(size)
            } else {
              const sizes = size as Array<any>

              if (!sizes || sizes.length == 0) {
                return result
              }

              if (sizes.length == 1) {
                result = format(sizes[0])
              }

              else {
                // set width with random value
                const rand = utils.randInt(numeric(sizes[0]), numeric(sizes[1]))
                result = `${sizes}`.includes('%') ? rand + '%' : rand + 'px'
              }
            }

            return result
          }

          if (sizes.length == 1) {
            width = apply(sizes, 0)
          }

          else {
            width = apply(sizes, 0)
            height = apply(sizes, 1)
          }
        }

        styles.value.push({
          width: width,
          height: height,
          borderRadius: getRadius(props.radius)
        })
      }
    }

    const getRadius = (value: any) => {
      // if radius contains '%' use entire value, else add 'px'
      const radius = `${value}`
      return radius.includes('%') ? radius : radius + 'px'
    }

    onMounted(() => setSize())

    watch(() => props.size, () => setSize())

    watch(() => props.radius, (value) => {
      const reStyles = styles.value.map((e: any) => {
        return {
          width: e.width,
          height: e.height,
          borderRadius: getRadius(value)
        }
      })

      styles.value = reStyles
    })

    return { utils, styles }
  }
}
</script>

<style lang="scss" scoped>
@keyframes shimmer {
    0% {
        background-position: -100% 0;
    }

    100% {
        background-position: 100% 0;
    }
}

@mixin shimmer($color: #ddd, $highlight: #edeef1, $duration: 1.5s) {
    background: linear-gradient(to right,
            $color 8%,
            $highlight 28%,
            $color 33%);
    background-size: 200% 100%;
    animation: shimmer $duration linear infinite;
}

.shimmer {
    @include shimmer();
}
</style>