<template>
    <div class="date cursor-pointer d-inline" :class="{ focused: focused }" @click="onFocus">
        <span class="child">
            <Icon icon="hgi-calendar-02" v-if="!$slots.default" />
            <slot v-else />
        </span>

        <!-- date range picker -->
        <div class="date-picker">
            <div @wheel="onWheel($event, 0)">
                <span v-for="(e, i) in [date(dates[0]).date, date(dates[0]).month, date(dates[0]).year]" :class="{
                    'blurred': focusAt[0] != -1,
                    'active': focusAt[0] == 0 && focusAt[1] == i,
                }" @click="focusTo(0, i)">{{ e }}</span>
            </div>
            <span>&mdash;</span>
            <div @wheel="onWheel($event, 1)">
                <span v-for="(e, i) in [date(dates[1]).date, date(dates[1]).month, date(dates[1]).year]" :class="{
                    'blurred': focusAt[0] != -1,
                    'active': focusAt[0] == 1 && focusAt[1] == i,
                }" @click="focusTo(1, i)">{{ e }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const focused = ref(false);
    const nuxt = useNuxtApp();
    const dates = ref(props.modelValue || []);
    const focusAt = ref([-1, -1]);
    const onFocus = (e) => {
      if (focused.value) {
        const target = e.target;
        if (target.closest(".child")) {
          focusAt.value = [-1, -1];
          return focused.value = false;
        }
      }
      focused.value = true;
    };
    const focusTo = (dateIndex, focusIndex) => {
      if (focusAt.value[0] === dateIndex && focusAt.value[1] === focusIndex) {
        return focusAt.value = [-1, -1];
      }
      focusAt.value = [dateIndex, focusIndex];
    };
    const date = (date2) => {
      const d = new Date(date2);
      return {
        date: d.getDate().toString().padStart(2, "0"),
        month: (d.getMonth() + 1).toString().padStart(2, "0"),
        year: d.getFullYear().toString()
      };
    };
    const dateChange = (date2, amount, unit) => {
      const d = typeof date2 === "string" ? new Date(date2) : new Date(date2);
      if (isNaN(d.getTime()))
        throw new Error("Invalid date");
      switch (unit) {
        case "days":
          d.setDate(d.getDate() + amount);
          break;
        case "months":
          d.setMonth(d.getMonth() + amount);
          break;
        case "years":
          d.setFullYear(d.getFullYear() + amount);
          break;
        default:
          throw new Error("Invalid unit");
      }
      return d.toISOString().split("T")[0];
    };
    const onWheel = (e, index) => {
      e.preventDefault();
      if (focused.value) {
        const delta = Math.sign(e.deltaY);
        const newDates = [...dates.value];
        if (focusAt.value[0] == -1) {
          const newDate = dateChange(newDates[index], delta < 0 ? 1 : -1, "days");
          newDates[index] = newDate;
          if (newDates[0] > newDates[1] && index === 0) {
            newDates[1] = newDates[0];
          }
          if (newDates[1] < newDates[0] && index === 1) {
            newDates[0] = newDates[1];
          }
        } else {
          const unit = focusAt.value[1] === 0 ? "days" : focusAt.value[1] === 1 ? "months" : "years";
          const newDate = dateChange(newDates[index], delta < 0 ? 1 : -1, unit);
          newDates[index] = newDate;
          if (newDates[0] > newDates[1] && index === 0) {
            newDates[1] = newDates[0];
          }
          if (newDates[1] < newDates[0] && index === 1) {
            newDates[0] = newDates[1];
          }
        }
        dates.value = newDates;
        emit("update:modelValue", newDates);
      }
    };
    onMounted(() => {
      if (dates.value.length < 2) {
        dates.value = [
          nuxt.$e.utils.now("Y-m-d"),
          nuxt.$e.utils.now("Y-m-d")
          // now('Y-m-d', { add: { days: 30 } })
        ];
      }
      document.addEventListener("click", (e) => {
        const target = e.target;
        if (!target.closest(".date")) {
          focused.value = false;
          focusAt.value = [-1, -1];
        }
      });
    });
    watch(() => props.modelValue, (newValue) => {
      dates.value = newValue;
    });
    return { focused, focusAt, onFocus, dates, date, onWheel, focusTo };
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.date {
  position: relative;
  user-select: none;
}
.date.focused .date-picker {
  top: -60px;
  opacity: 1;
}

.date-picker {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  display: flex;
  gap: 10px;
  z-index: 10000;
  opacity: 0;
  transition: 0.2s cubic-bezier(0.34, 1.86, 0.64, 1);
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
}
.date-picker div {
  display: flex;
  gap: 7px;
}
.date-picker div span {
  border-radius: 6px;
  transition: 0.1s;
}
.date-picker div span.blurred {
  opacity: 0.3;
}
.date-picker div span.active {
  opacity: 1;
  transform: scale(1.2);
}
.date-picker::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 9px solid transparent;
  border-top-color: var(--background-color);
}
</style>