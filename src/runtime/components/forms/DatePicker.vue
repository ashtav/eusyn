<template>
    <div>
        <label class="form-label" :class="{ required }" v-if="label">{{ label }}</label>
        <div class="date-picker" ref="trigger" :class="{ disabled }">
            <input class="form-control" :placeholder="hint" :value="selected" readonly :disabled="disabled" />

            <!-- suffix -->
            <div class="suffix">
                <span @click="show = !show">
                    <Icon icon="hgi-calendar-02" />
                </span>
            </div>

            <!-- calendar -->
            <div class="calendar" :class="{ show: show, above: calendarAbove }" ref="calendar">
                <div class="header">
                    <h4 class="d-flex gap-1" @wheel="onWheelHeader">
                        <span @click="focusAt(0)" :class="{ focused: focused == 0, disabled: focused != null }">{{
                            date.m
                            }}</span>
                        <span @click="focusAt(1)" :class="{ focused: focused == 1, disabled: focused != null }">{{
                            date.y
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
                    <ul v-for="(week, i) in dates" :key="i">
                        <li v-for="(day, j) in week" :key="j" :title="day?.full ?? ''"
                            :class="{ 'today': day?.full === utils.now() && day?.full != selected, 'selected': day?.full == selected, 'out': day?.out, 'disabled': day?.disabled }"
                            @click="onSelect(day?.full)">
                            {{ day?.display ?? '' }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { nextTick, onMounted, watch } from 'vue';
import { utils } from '../../plugins/utils';

export default {
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const hint = ref('----/--/--')
        const dates = ref<any>([])
        const month = ref(utils.now())
        const focused = ref<number | null>(null)
        const selected = ref(props.modelValue)
        const show = ref(false)
        const calendarAbove = ref(false)

        const calendar = ref(null)
        const trigger = ref(null)

        const date = computed((): { m: string, y: string } => {
            const m = utils.dateFormat(month.value, 'MMMM')
            const y = utils.dateFormat(month.value, 'Y')
            return { m, y }
        })

        function generateCalendar(monthStr?: string): Array<Array<{ full: string, display: string, out?: boolean, disabled?: boolean }>> {
            const today = new Date()
            const [year, month] = monthStr
                ? monthStr.split('-').map(Number)
                : [today.getFullYear(), today.getMonth() + 1]

            const currentMonthStart = new Date(year, month - 1, 1)
            const currentMonthEnd = new Date(year, month, 0)
            const daysInMonth = currentMonthEnd.getDate()
            const startDay = currentMonthStart.getDay() // 0 = Sunday

            const min = props.minDate ? new Date(props.minDate) : null
            const max = props.maxDate ? new Date(props.maxDate) : null

            const days: Array<{ full: string, display: string, out?: boolean, disabled?: boolean }> = []

            if (startDay > 0) {
                const prevMonth = new Date(year, month - 2, 1)
                const prevMonthDays = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate()

                for (let i = prevMonthDays - startDay + 1; i <= prevMonthDays; i++) {
                    const d = i.toString().padStart(2, '0')
                    const mStr = (prevMonth.getMonth() + 1).toString().padStart(2, '0')
                    const full = `${prevMonth.getFullYear()}-${mStr}-${d}`
                    const fullDate = new Date(full)
                    const isDisabled = (min && fullDate < min) || (max && fullDate > max)

                    days.push({
                        full,
                        display: d,
                        out: true,
                        disabled: isDisabled
                    })
                }
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const d = i.toString().padStart(2, '0')

                const mStr = month.toString().padStart(2, '0')
                const full = `${year}-${mStr}-${d}`
                const fullDate = new Date(`${year}-${mStr}-${d}`)
                const isDisabled = (min && fullDate < min) || (max && fullDate > max)

                days.push({
                    full,
                    display: d,
                    disabled: isDisabled
                })
            }

            const totalCells = 42 // Math.ceil(days.length / 7) * 7
            const nextMonth = new Date(year, month, 1)
            for (let i = 1; days.length < totalCells; i++) {
                const d = i.toString().padStart(2, '0')
                const mStr = (nextMonth.getMonth() + 1).toString().padStart(2, '0')
                const full = `${nextMonth.getFullYear()}-${mStr}-${d}`
                const fullDate = new Date(full)
                const isDisabled = (min && fullDate < min) || (max && fullDate > max)

                days.push({
                    full,
                    display: d,
                    out: true,
                    disabled: isDisabled
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
            const formatted = `${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, '0')}`

            // Apply min/max date constraints
            const min = props.minDate ? utils.dateFormat(new Date(props.minDate), 'Y-m') : null
            const max = props.maxDate ? utils.dateFormat(new Date(props.maxDate), 'Y-m') : null

            if ((min && formatted < min) || (max && formatted > max)) return

            month.value = utils.dateFormat(current)
            dates.value = generateCalendar(formatted)
        }

        const onWeel = (e: WheelEvent) => {
            e.preventDefault()

            const direction = e.deltaY < 0 ? -1 : 1
            const current = new Date(month.value)
            current.setMonth(current.getMonth() + direction)

            const newMonthStr = utils.dateFormat(current, 'Y-m')
            const min = props.minDate ? utils.dateFormat(new Date(props.minDate), 'Y-m') : null
            const max = props.maxDate ? utils.dateFormat(new Date(props.maxDate), 'Y-m') : null

            if ((min && newMonthStr < min) || (max && newMonthStr > max)) return

            month.value = utils.dateFormat(current)
            dates.value = generateCalendar(newMonthStr)
        }

        const onWheelHeader = (e: WheelEvent) => {
            e.preventDefault();
            const i = focused.value
            if (i != null) {
                const dateObj = new Date(month.value)
                let newDateObj = new Date(dateObj)

                if (i == 0) {
                    // Month
                    newDateObj.setMonth(dateObj.getMonth() - (e.deltaY < 0 ? 1 : -1))
                } else {
                    // Year
                    newDateObj.setFullYear(dateObj.getFullYear() + (e.deltaY < 0 ? 1 : -1))
                }

                // Format for comparison
                const newMonthStr = utils.dateFormat(newDateObj, 'Y-m')
                const min = props.minDate ? utils.dateFormat(new Date(props.minDate), 'Y-m') : null
                const max = props.maxDate ? utils.dateFormat(new Date(props.maxDate), 'Y-m') : null

                if ((min && newMonthStr < min) || (max && newMonthStr > max)) return

                month.value = utils.dateFormat(newDateObj)
                dates.value = generateCalendar(newMonthStr)
            }
        }

        const focusAt = (index?: any) => {
            focused.value = index
        }

        const onSelect = (dateStr: string) => {
            if (!dateStr) return

            const date = new Date(dateStr)
            const formattedDate = utils.dateFormat(date, 'Y-m-d')

            emit('update:modelValue', formattedDate)
            selected.value = formattedDate
            focused.value = null
            show.value = false
        }

        onMounted(() => {
            dates.value = generateCalendar()
            month.value = utils.now('MMMM Y')

            // add listeners for click outside .date
            document.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.date-picker')) {
                    show.value = false
                }
            })
        })

        watch(() => show.value, (newValue) => {
            if (newValue) {
                focused.value = null

                if (selected.value) {
                    const date = new Date(selected.value);
                    dates.value = generateCalendar(utils.dateFormat(date, 'Y-m'));
                    month.value = utils.dateFormat(date, 'Y-m-d');
                } else {
                    month.value = utils.now('MMMM Y');
                }

                nextTick(() => {
                    const triggerEl = (trigger.value as HTMLElement)
                    const calendarEl = (calendar.value as HTMLElement)

                    if (!triggerEl || !calendarEl) return

                    const triggerRect = triggerEl.getBoundingClientRect()
                    const calendarHeight = calendarEl.offsetHeight
                    const spaceBelow = window.innerHeight - triggerRect.bottom
                    const spaceAbove = triggerRect.top

                    calendarAbove.value = spaceBelow < calendarHeight && spaceAbove > calendarHeight
                })
            }
        })

        watch(() => props.modelValue, (newValue) => {
            selected.value = newValue
        })

        return { show, hint, dates, date, focused, selected, utils, calendarAbove, calendar, trigger, onChangeMonth, onWeel, onWheelHeader, focusAt, onSelect }
    },

    props: {
        modelValue: {
            type: String,
            default: () => ''
        },

        label: {
            type: String
        },

        minDate: {
            type: String
        },

        maxDate: {
            type: String
        },

        disabled: {
            type: Boolean,
            default: false
        },

        required: {
            type: Boolean,
            default: false
        },
    }
}
</script>

<style lang="scss" scoped>
.date-picker {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;

    &.disabled {
        pointer-events: none;

        .suffix {
            opacity: .5;
        }
    }

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
        top: 120%;
        padding: 5px;
        background-color: var(--background-color);
        user-select: none;
        opacity: 0;
        transition: .2s cubic-bezier(0.34, 1.86, 0.64, 1);
        transform: scale(.9);
        pointer-events: none;

        &.show {
            opacity: 1;
            transform: scale(1);
            top: 110%;
            pointer-events: all;

            &.above {
                top: auto;
                bottom: 110%;
            }
        }

        &.above {
            top: auto;
            bottom: 120%;
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
                    border: 1px dashed var(--light-border-color);
                }

                &.selected {
                    background: var(--border-color);
                }

                &.out {
                    opacity: .3;
                }

                &.disabled {
                    pointer-events: none;
                    opacity: 0.4;
                    cursor: not-allowed;
                }
            }
        }
    }
}
</style>