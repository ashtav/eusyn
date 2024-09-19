<template>
    <div class="time-picker" :class="[shape, { 'has-prefix': prefix != null, 'mb-3': !nospace }]">
        <label class="form-label" v-if="label">{{ label }}</label>

        <div class="input" :class="{ 'focus': hasFocus }" tabindex="0" @focus="onFocus" @blur="onBlur">
            <Ti v-if="prefix && shape == 'form'" :icon="prefix" style="margin: 0 10px; color: #999" />
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
    },
    nospace: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: "form"
      // form, component
    }
  },
  setup(props, { emit }) {
    const localValue = ref(props.modelValue);
    const hasFocus = ref(false);
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
      event.preventDefault();
      onChange(event.deltaY < 0 ? "up" : "down", index);
    };
    const onFocus = (e) => {
      hasFocus.value = true;
    };
    const onBlur = (e) => {
      hasFocus.value = false;
    };
    onMounted(() => setTime());
    watch(() => props.format, () => {
      times.value = initialTimes();
      setTime();
    });
    return { times, hasFocus, onChange, onWheel, onFocus, onBlur };
  }
};
</script>

<style scoped>
.time-picker ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.time-picker.form.has-prefix ul li:first-child {
  padding-left: 0px;
}
.time-picker.form .input {
  border: 1px #ddd solid;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time-picker.form .input.focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--tblr-primary-rgb), 0.25);
  border-color: #80aad3;
}
.time-picker.form .input.focus ul {
  pointer-events: all;
}
.time-picker.form .input.focus ul li {
  padding: 10px 20px !important;
}
.time-picker.form .input.focus ul li:not(:first-child) {
  border-color: #ddd;
}
.time-picker.form .input.focus ul li:not(:first-child)::before, .time-picker.form .input.focus ul li:not(:first-child)::after {
  content: "";
  width: 2px;
  height: 2px;
  left: 0;
  position: absolute;
  background-color: transparent !important;
}
.time-picker.form .input.focus ul li:not(:first-child)::before {
  top: 41%;
}
.time-picker.form .input.focus ul li:not(:first-child)::after {
  bottom: 41%;
}
.time-picker.form .input.focus ul::after {
  opacity: 1;
}
.time-picker.form ul {
  position: relative;
  width: 100%;
  pointer-events: none;
}
.time-picker.form ul::after {
  content: "Scroll";
  position: absolute;
  right: 14px;
  color: #888;
  top: 50%;
  transform: translate(0, -50%);
  transition: 0.2s;
  opacity: 0;
}
.time-picker.form ul li {
  display: inline-block;
  padding: 10px 0px;
  transition: 0.2s;
  border-left: 1px transparent solid;
  user-select: none;
  position: relative;
}
.time-picker.form ul li:not(:first-child) {
  padding-left: 3px;
}
.time-picker.form ul li:not(:first-child)::before, .time-picker.form ul li:not(:first-child)::after {
  content: "";
  width: 2px;
  height: 2px;
  left: 0;
  position: absolute;
  background-color: #888;
}
.time-picker.form ul li:not(:first-child)::before {
  top: 41%;
}
.time-picker.form ul li:not(:first-child)::after {
  bottom: 41%;
}
.time-picker.form ul li:first-child {
  padding-left: 10px;
}
.time-picker.form ul li span.time {
  pointer-events: none;
  position: relative;
  z-index: 3;
}
.time-picker.form ul li span.up,
.time-picker.form ul li span.down {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  transition: 0.2s;
}
.time-picker.form ul li span.up:hover,
.time-picker.form ul li span.down:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.time-picker.form ul li span.up:active,
.time-picker.form ul li span.down:active {
  background-color: #ddd;
  cursor: pointer;
}
.time-picker.form ul li span.up {
  top: 0;
}
.time-picker.form ul li span.down {
  bottom: 0;
}
.time-picker.block .input {
  border: 1px #ddd solid;
  display: inline-block;
  background-color: white;
  border-radius: 4px;
}
.time-picker.block .input ul li {
  position: relative;
  display: inline-block;
  font-size: 30px;
  padding: 15px 30px;
  cursor: default;
  color: #333;
  font-weight: bold;
  transition: 0.2s;
  user-select: none;
  -webkit-text-stroke: 1px #333;
}
.time-picker.block .input ul li:not(:first-child) {
  border-left: 1px #ddd solid;
}
.time-picker.block .input ul li span.time {
  pointer-events: none;
  position: relative;
  z-index: 3;
}
.time-picker.block .input ul li span.up,
.time-picker.block .input ul li span.down {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  transition: 0.2s;
}
.time-picker.block .input ul li span.up:hover,
.time-picker.block .input ul li span.down:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.time-picker.block .input ul li span.up:active,
.time-picker.block .input ul li span.down:active {
  background-color: #ddd;
  cursor: pointer;
}
.time-picker.block .input ul li span.up {
  top: 0;
}
.time-picker.block .input ul li span.down {
  bottom: 0;
}
.time-picker.block .input ul:hover li {
  color: #888;
  -webkit-text-stroke: 1px #888;
}
.time-picker.block .input ul:hover li:hover {
  color: #333;
  -webkit-text-stroke: 1px #333;
}

[data-bs-theme=dark] .time-picker.form .input {
  background-color: #151f2c;
  border-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.form .input.focus {
  border-color: #80aad3;
}
[data-bs-theme=dark] .time-picker.form .input.focus ul li:not(:first-child) {
  border-left: 1px #2d3d50 solid !important;
}
[data-bs-theme=dark] .time-picker.form ul li:not(:first-child) {
  border-color: #2d3d50 !important;
  border-left: 1px transparent solid !important;
}
[data-bs-theme=dark] .time-picker.form ul li:not(:first-child) {
  padding-left: 3px;
}
[data-bs-theme=dark] .time-picker.form ul li:not(:first-child)::before {
  content: "";
  width: 2px;
  height: 2px;
  background-color: #888;
  position: absolute;
  left: 0;
  top: 41%;
}
[data-bs-theme=dark] .time-picker.form ul li:not(:first-child)::after {
  content: "";
  width: 2px;
  height: 2px;
  background-color: #777;
  position: absolute;
  left: 0;
  bottom: 41%;
}
[data-bs-theme=dark] .time-picker.form ul li span.up:hover,
[data-bs-theme=dark] .time-picker.form ul li span.down:hover {
  background-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.form ul li span.up:active,
[data-bs-theme=dark] .time-picker.form ul li span.down:active {
  background-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.form ul:hover li:not(:first-child) {
  border-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.block .input {
  border: 1px #ddd solid;
  background-color: #151f2c;
  border-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.block .input ul li {
  color: #fff;
  -webkit-text-stroke: 1px #fff;
  border-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.block .input ul li span.up:hover,
[data-bs-theme=dark] .time-picker.block .input ul li span.down:hover {
  background-color: #2d3d50;
}
[data-bs-theme=dark] .time-picker.block .input ul:hover li {
  color: #999;
  -webkit-text-stroke: 1px #999;
}
[data-bs-theme=dark] .time-picker.block .input ul:hover li:hover {
  color: #fff;
  -webkit-text-stroke: 1px #fff;
}
</style>