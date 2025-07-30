declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: () => string;
    };
    label: {
        type: StringConstructor;
    };
    minDate: {
        type: StringConstructor;
    };
    maxDate: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    show: any;
    hint: any;
    dates: any;
    date: any;
    focused: any;
    selected: any;
    utils: import("../../types/utils").default;
    calendarAbove: any;
    calendar: any;
    trigger: any;
    onChangeMonth: (index: number) => void;
    onWeel: (e: WheelEvent) => void;
    onWheelHeader: (e: WheelEvent) => void;
    focusAt: (index?: any) => void;
    onSelect: (dateStr: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: () => string;
    };
    label: {
        type: StringConstructor;
    };
    minDate: {
        type: StringConstructor;
    };
    maxDate: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: string;
    required: boolean;
}, {}>;
export default _default;
