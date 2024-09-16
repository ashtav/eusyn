<template>
    <div class="time-picker" :class="{ 'has-prefix': prefix != null }">
        <label class="form-label" v-if="label">{{ label }}</label>

        <div class="input d-flex align-items-center justify-content-between">
            <Ti v-if="prefix" :icon="prefix" style="margin: 0 10px; color: #999" />
            <ul>
                <li v-for="(time, i) in times" :key="i" @wheel="onWheel($event, i)">
                    <span class="up" @click="onChange('up', i)"></span>
                    <span class="down" @click="onChange('down', i)"></span>
                    <span class="time"> {{ time }} </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { handleChanges } from "../../scripts/time";
export default {
  inheritAttrs: false,
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      default: "",
      type: String
    },
    label: {
      type: String
    },
    prefix: {
      type: String
    },
    time: {
      type: Array,
      default: () => []
    },
    format: {
      type: String,
      default: "h:i"
      // support h:i and h:i:s
    }
  },
  setup(props, { emit }) {
    const localValue = ref(props.modelValue);
    const initialTimes = () => {
      if (props.format == "h:i") {
        return ["00", "00"];
      } else if (props.format == "h:i:s") {
        return ["00", "00", "00"];
      }
      return ["00", "00"];
    };
    const times = ref(initialTimes());
    const padTime = (time) => time < 10 ? `0${time}` : `${time}`;
    const setTime = () => {
      if (props.time.length === 2 && props.format === "h:i") {
        times.value = props.time.map((t) => padTime(parseInt(t)));
      } else if (props.time.length === 3 && props.format === "h:i:s") {
        times.value = props.time.map((t) => padTime(parseInt(t)));
      } else {
        const currentDate = /* @__PURE__ */ new Date();
        times.value = props.format === "h:i" ? [padTime(currentDate.getHours()), padTime(currentDate.getMinutes())] : [padTime(currentDate.getHours()), padTime(currentDate.getMinutes()), padTime(currentDate.getSeconds())];
      }
    };
    const onChange = (type, index) => {
      const result = handleChanges(times.value, props.format, type, index);
      times.value[index] = padTime(result);
      emit("update:modelValue", times.value.join(":"));
    };
    const onWheel = (event, index) => {
      onChange(event.deltaY < 0 ? "up" : "down", index);
    };
    onMounted(() => setTime());
    watch(() => props.format, () => {
      times.value = initialTimes();
      setTime();
    });
    return { times, onChange, onWheel };
  }
};
</script>

<style scoped>
.time-picker.has-prefix ul li:first-child {
  padding-left: 0px;
}
.time-picker .input {
  border: 1px #ddd solid;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
}
.time-picker ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
}
.time-picker ul::after {
  content: "Scroll";
  position: absolute;
  right: 14px;
  color: #888;
  top: 50%;
  transform: translate(0, -50%);
  transition: 0.2s;
  opacity: 0;
}
.time-picker ul li {
  display: inline-block;
  padding: 10px 0px;
  transition: 0.2s;
  border-left: 1px transparent solid;
  user-select: none;
  position: relative;
}
.time-picker ul li:not(:first-child) {
  padding-left: 3px;
}
.time-picker ul li:not(:first-child)::before, .time-picker ul li:not(:first-child)::after {
  content: "";
  width: 2px;
  height: 2px;
  left: 0;
  position: absolute;
  background-color: #888;
}
.time-picker ul li:not(:first-child)::before {
  top: 41%;
}
.time-picker ul li:not(:first-child)::after {
  bottom: 41%;
}
.time-picker ul li:first-child {
  padding-left: 10px;
}
.time-picker ul li span.time {
  pointer-events: none;
  position: relative;
  z-index: 3;
}
.time-picker ul li span.up,
.time-picker ul li span.down {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  transition: 0.2s;
}
.time-picker ul li span.up:hover,
.time-picker ul li span.down:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.time-picker ul li span.up:active,
.time-picker ul li span.down:active {
  background-color: #ddd;
  cursor: pointer;
}
.time-picker ul li span.up {
  top: 0;
}
.time-picker ul li span.down {
  bottom: 0;
}
.time-picker ul:hover li {
  padding: 10px 20px !important;
}
.time-picker ul:hover li:not(:first-child) {
  border-color: #ddd;
}
.time-picker ul:hover li:not(:first-child)::before, .time-picker ul:hover li:not(:first-child)::after {
  content: "";
  width: 2px;
  height: 2px;
  left: 0;
  position: absolute;
  background-color: transparent !important;
}
.time-picker ul:hover li:not(:first-child)::before {
  top: 41%;
}
.time-picker ul:hover li:not(:first-child)::after {
  bottom: 41%;
}
.time-picker ul:hover::after {
  opacity: 1;
}

[data-bs-theme=dark] .time-picker .input {
  background-color: #151f2c;
  border-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker ul li:not(:first-child) {
  padding-left: 3px;
}
[data-bs-theme=dark] .time-picker ul li:not(:first-child)::before {
  content: "";
  width: 2px;
  height: 2px;
  background-color: #888;
  position: absolute;
  left: 0;
  top: 41%;
}
[data-bs-theme=dark] .time-picker ul li:not(:first-child)::after {
  content: "";
  width: 2px;
  height: 2px;
  background-color: #777;
  position: absolute;
  left: 0;
  bottom: 41%;
}
[data-bs-theme=dark] .time-picker ul li span.up:hover,
[data-bs-theme=dark] .time-picker ul li span.down:hover {
  background-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker ul li span.up:active,
[data-bs-theme=dark] .time-picker ul li span.down:active {
  background-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker ul:hover li:not(:first-child) {
  border-color: #2d3d50;
}
</style>