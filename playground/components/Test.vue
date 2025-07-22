<template>
    <div class="date-picker">
        <input class="form-control" :placeholder="hint" :value="value" readonly />

        <!-- suffix -->
        <div class="suffix">
            <span @click="show = !show">
                <Icon icon="hgi-calendar-02" />
            </span>
        </div>

        <!-- calendar -->
        <div class="calendar" :class="{ show: show }">
            <div class="header">
                <h4 class="d-flex gap-1" @wheel="onWheelHeader">
                    <span @click="focusAt(0)" :class="{ focused: focused == 0, disabled: focused != null }">{{ date.m
                        }}</span>
                    <span @click="focusAt(1)" :class="{ focused: focused == 1, disabled: focused != null }">{{ date.y
                        }}</span>
                </h4>
                <div>
                    <span v-for="(e, i) in ['up', 'down']" @click="onChangeMonth(i)">
                        <Icon :icon="`hgi-arrow-${e}-01`" />
                    </span>
                </div>
            </div>
            <div class="dates" @wheel="onWeel" @click="focusAt(null)" :class="{ disabled: focused != null }">
                <ul class="week" v-for="(week, i) in ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']" :key="i">
                    <li>
                        {{ week }}
                    </li>
                </ul>
                <ul v-for="(week, i) in calendar" :key="i">
                    <li v-for="(day, j) in week" :key="j" :title="day?.full ?? ''"
                        :class="{ 'today': day?.full === $e.utils.now() || day?.full == value, 'out': day?.out }"
                        @click="onSelect(day?.full)">
                        {{ day?.display ?? '' }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, watch } from 'vue';

export default {
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const nuxt = useNuxtApp()
        const hint = ref('--/--/----')
        const calendar = ref<any>([])
        const month = ref(nuxt.$e.utils.now())
        const focused = ref<number | null>(null)
        const value = ref(props.modelValue)
        const show = ref(false)

        const date = computed((): { m: string, y: string } => {
            const m = nuxt.$e.utils.dateFormat(month.value, 'MMMM')
            const y = nuxt.$e.utils.dateFormat(month.value, 'Y')
            return { m, y }
        })

        function generateCalendar(monthStr?: string): Array<Array<{ full: string, display: string, out?: boolean }>> {
            const today = new Date()
            const [year, month] = monthStr
                ? monthStr.split('-').map(Number)
                : [today.getFullYear(), today.getMonth() + 1]

            const currentMonthStart = new Date(year, month - 1, 1)
            const currentMonthEnd = new Date(year, month, 0)
            const daysInMonth = currentMonthEnd.getDate()
            const startDay = currentMonthStart.getDay() // 0 = Sunday

            const days: Array<{ full: string, display: string, out?: boolean }> = []

            if (startDay > 0) {
                const prevMonth = new Date(year, month - 2, 1)
                const prevMonthDays = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate()

                for (let i = prevMonthDays - startDay + 1; i <= prevMonthDays; i++) {
                    const d = i.toString().padStart(2, '0')
                    const m = (prevMonth.getMonth() + 1).toString().padStart(2, '0')
                    days.push({
                        full: `${prevMonth.getFullYear()}-${m}-${d}`,
                        display: d,
                        out: true
                    })
                }
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const d = i.toString().padStart(2, '0')
                const m = month.toString().padStart(2, '0')
                days.push({
                    full: `${year}-${m}-${d}`,
                    display: d
                })
            }

            const totalCells = 42 // Math.ceil(days.length / 7) * 7
            const nextMonth = new Date(year, month, 1)
            for (let i = 1; days.length < totalCells; i++) {
                const d = i.toString().padStart(2, '0')
                const m = (nextMonth.getMonth() + 1).toString().padStart(2, '0')
                days.push({
                    full: `${nextMonth.getFullYear()}-${m}-${d}`,
                    display: d,
                    out: true
                })
            }

            const weeks: Array<Array<{ full: string, display: string, out?: boolean }>> = []
            for (let i = 0; i < days.length; i += 7) {
                weeks.push(days.slice(i, i + 7))
            }

            return weeks
        }

        const onChangeMonth = (index: number) => {
            focused.value = null

            const current = new Date(month.value)
            current.setMonth(current.getMonth() + (index !== 0 ? 1 : -1))
            month.value = nuxt.$e.utils.dateFormat(current)

            const formatted = `${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, '0')}`
            calendar.value = generateCalendar(formatted)
        }

        const onWeel = (e: WheelEvent) => {
            e.preventDefault()
            if (e.deltaY < 0) {
                onChangeMonth(0)
            } else {
                onChangeMonth(1)
            }
        }

        const onWheelHeader = () => {
            const i = focused.value
            if (i != null) {
                const date = new Date(month.value)

                if (i == 0) {
                    date.setMonth(date.getMonth() - 1)
                }

                else {
                    date.setFullYear(date.getFullYear() + 1)
                }

                month.value = nuxt.$e.utils.dateFormat(date)
                calendar.value = generateCalendar(month.value)

            }
        }

        const focusAt = (index?: any) => {
            focused.value = index
        }

        const onSelect = (dateStr: string) => {
            if (!dateStr) return

            const date = new Date(dateStr)
            const formattedDate = nuxt.$e.utils.dateFormat(date, 'Y-m-d')

            emit('update:modelValue', formattedDate)
            value.value = formattedDate
            focused.value = null
            show.value = false
        }

        onMounted(() => {
            calendar.value = generateCalendar()
            month.value = nuxt.$e.utils.now('MMMM Y')

            // add listeners for click outside .date
            document.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.date-picker')) {
                    show.value = false
                }
            })
        })

        watch(() => props.modelValue, (newValue) => {

        })

        return { show, hint, calendar, date, focused, value, onChangeMonth, onWeel, onWheelHeader, focusAt, onSelect }
    },

    props: {
        modelValue: {
            type: String,
            default: () => ''
        },

        label: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.date-picker {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;

    .suffix {
        position: absolute;
        right: 12px;
        top: 9px;
        cursor: pointer;

        &:hover {
            opacity: .7;
        }

        &:active {
            opacity: 1;
        }
    }

    .calendar {
        position: absolute;
        z-index: 10000;
        left: 0;
        bottom: 40px;
        padding: 5px;
        background-color: var(--background-color);
        user-select: none;
        opacity: 0;
        transition: .2s cubic-bezier(0.34, 1.86, 0.64, 1);
        transform: scale(.9);

        &.show {
            opacity: 1;
            bottom: 46px;
            transform: scale(1);
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 10px;
            padding-top: 5px;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 10px;

            h4 {
                margin: 0;
            }

            div {
                display: flex;
                gap: 5px;

                span {
                    cursor: pointer;

                    &:hover {
                        opacity: .7;
                    }
                }
            }

            span {
                cursor: pointer;

                &.focused {
                    opacity: 1 !important;
                }

                &.disabled {
                    opacity: .5;
                }
            }
        }

        .dates {
            &.disabled {
                opacity: .5;
            }
        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;

            &.week {
                display: inline-block;
                text-transform: capitalize;

                li {
                    pointer-events: none;
                    opacity: .7;
                }
            }

            li {
                display: inline-block;
                cursor: pointer;
                border: 1px solid transparent;
                width: 30px;
                height: 30px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    opacity: .7;
                    border: 1px solid var(--border-color);
                }

                &.today {
                    background: var(--border-color);
                }

                &.out {
                    opacity: .3;
                }
            }
        }
    }
}
</style>