declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | {
            (arrayLength: number): String[];
            (...items: String[]): String[];
            new (arrayLength: number): String[];
            new (...items: String[]): String[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        })[];
        default: string;
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
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    dateRef: any;
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
    inRangeDates: any;
    preRangeDates: any;
    display: any;
    onChangeMonth: (index: number) => void;
    onWeel: (e: WheelEvent) => void;
    onWheelHeader: (e: WheelEvent) => void;
    focusAt: (index?: any) => void;
    onSelect: (dateStr: string) => void;
    onHover: (dateStr: string) => void;
    watchInRange: (date: any) => string;
    watchPraInRange: (date: any) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | {
            (arrayLength: number): String[];
            (...items: String[]): String[];
            new (arrayLength: number): String[];
            new (...items: String[]): String[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        })[];
        default: string;
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
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    multiple: boolean;
    disabled: boolean;
    required: boolean;
    modelValue: string | String[];
}, {}>;
export default _default;
