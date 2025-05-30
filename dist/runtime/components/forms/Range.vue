<template>
    <div>
        <div :class="['range-slider', { 'disabled': disabled }]" ref="slider">
            <div class="background"></div>
            <div class="bar"
                :style="{ left: multiple ? startValue + '%' : '0%', width: multiple ? (endValue - startValue) + '%' : endValue + '%' }">
            </div>

            <!-- thumb x -->
            <div :class="['thumb-1', { 'active': mousedown === 'end', 'indicator': !indicator, 'priority': lastTouched == 'start' }]"
                ref="thumb1"
                :style="{ left: Math.min(100, Math.max(0, ((endValue - range[0]) / (range[1] - range[0])) * 100)) + '%' }"
                :data="endValue"></div>

            <!-- thumb y -->
            <div v-if="multiple"
                :class="['thumb-2', { 'active': mousedown === 'start', 'indicator': !indicator, 'priority': lastTouched == 'end' }]"
                ref="thumb2"
                :style="{ left: Math.min(100, Math.max(0, ((startValue - range[0]) / (range[1] - range[0])) * 100)) + '%' }"
                :data="startValue"></div>
        </div>
    </div>
</template>


<script>
import { onMounted, ref, watch } from "vue";
export default {
  inheritAttrs: false,
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      default: 0,
      type: [Number, Array]
    },
    range: {
      type: Array,
      default: () => [0, 100]
    },
    step: {
      type: Number,
      default: 1
    },
    indicator: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const startValue = ref(props.multiple ? Array.isArray(props.modelValue) ? props.modelValue[0] : 0 : 0);
    const endValue = ref(props.multiple ? Array.isArray(props.modelValue) ? props.modelValue[1] : props.modelValue : props.modelValue);
    const thumb1 = ref(null);
    const thumb2 = ref(null);
    const slider = ref(null);
    const mousedown = ref(false);
    const lastTouched = ref("end");
    watch(() => props.modelValue, (value) => {
      if (props.multiple && Array.isArray(value)) {
        startValue.value = value[0];
        endValue.value = value[1];
      } else {
        endValue.value = value;
      }
    });
    const updateValue = (event, thumb) => {
      if (mousedown.value && slider.value) {
        const rect = slider.value.getBoundingClientRect();
        const offsetX = event.clientX + 7 - rect.left;
        const percent = Math.min(Math.max(offsetX / (rect.width + 10), 0), 1);
        const min = props.range.length === 0 ? 0 : props.range[0];
        const max = props.range.length === 1 ? 100 : props.range[1];
        const newValue = Math.round(percent * (max - min) + min);
        const steppedValue = Math.round(newValue / props.step) * props.step;
        if (thumb === "start") {
          startValue.value = Math.min(steppedValue, endValue.value);
        } else {
          endValue.value = Math.max(steppedValue, startValue.value);
        }
        if (props.multiple) {
          emit("update:modelValue", [startValue.value, endValue.value]);
        } else {
          emit("update:modelValue", endValue.value);
        }
      }
    };
    const onMouseMove = (event) => {
      if (mousedown.value) {
        updateValue(event, mousedown.value);
      }
    };
    const onMouseUp = () => {
      mousedown.value = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    onMounted(() => {
      [thumb1, thumb2].forEach((el, i) => {
        if (el.value) {
          el.value.addEventListener("mousedown", () => {
            const thumb = i == 0 ? "start" : "end";
            mousedown.value = thumb;
            lastTouched.value = thumb;
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          });
        }
      });
      if (slider.value) {
        slider.value.addEventListener("mousedown", (e) => {
          if (props.multiple) {
            const rect = slider.value.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percent = Math.min(Math.max(offsetX / rect.width, 0), 1);
            const clickedValue = Math.round(percent * (props.range[1] - props.range[0]) + props.range[0]);
            const startDiff = Math.abs(clickedValue - startValue.value);
            const endDiff = Math.abs(clickedValue - endValue.value);
            mousedown.value = startDiff < endDiff ? "start" : "end";
          } else {
            mousedown.value = "end";
          }
          updateValue(e, mousedown.value);
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        });
      }
    });
    return { startValue, endValue, thumb1, thumb2, slider, mousedown, lastTouched };
  }
};
</script>


<style scoped>
.range-slider {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  border-radius: 15px;
  cursor: pointer;
}
.range-slider.disabled {
  pointer-events: none;
}
.range-slider.disabled .thumb-1,
.range-slider.disabled .thumb-2,
.range-slider.disabled .bar {
  background-color: #a9b4bd;
}
.range-slider .background {
  height: 0.24rem;
  width: 100%;
  background: #dadfe5;
  border-radius: 15px;
}
.range-slider .bar {
  position: absolute;
  height: 0.24rem;
  background-color: #0054a6;
  border-radius: 15px;
}
.range-slider .thumb-1,
.range-slider .thumb-2 {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #0054a6;
  border: 0.2rem #fff solid;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 0px 0px 1px rgba(1, 89, 177, 0.3);
  transform: translateX(-50%);
}
.range-slider .thumb-1.priority,
.range-slider .thumb-2.priority {
  z-index: 15 !important;
}
.range-slider .thumb-1.active,
.range-slider .thumb-2.active {
  box-shadow: 0 0px 0px 3px rgba(1, 89, 177, 0.3);
}
.range-slider .thumb-1.active.indicator::after, .range-slider .thumb-1.active.indicator::before,
.range-slider .thumb-2.active.indicator::after,
.range-slider .thumb-2.active.indicator::before {
  opacity: 1;
}
.range-slider .thumb-1:hover,
.range-slider .thumb-2:hover {
  box-shadow: 0 0px 0px 3px rgba(1, 89, 177, 0.3);
}
.range-slider .thumb-1:hover.indicator::after, .range-slider .thumb-1:hover.indicator::before,
.range-slider .thumb-2:hover.indicator::after,
.range-slider .thumb-2:hover.indicator::before {
  opacity: 1;
}
.range-slider .thumb-1:active,
.range-slider .thumb-2:active {
  background-color: #3b74aa;
}
.range-slider .thumb-1.indicator::after, .range-slider .thumb-1.indicator::before,
.range-slider .thumb-2.indicator::after,
.range-slider .thumb-2.indicator::before {
  position: absolute;
  opacity: 0;
  transition: 0.2s;
}
.range-slider .thumb-1.indicator::after,
.range-slider .thumb-2.indicator::after {
  content: attr(data);
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 25px;
  padding: 0 6px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
}
.range-slider .thumb-1.indicator::before,
.range-slider .thumb-2.indicator::before {
  content: "";
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
}

[data-bs-theme=dark] .background {
  background: #26374b;
}
</style>
