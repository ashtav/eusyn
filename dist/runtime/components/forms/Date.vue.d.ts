declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    prefix: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    minDate: {
        type: StringConstructor;
        default: null;
    };
    maxDate: {
        type: StringConstructor;
        default: null;
    };
}, {
    utils: import("../../types/utils").default;
    focused: import("vue").Ref<number>;
    date: () => {
        d: string;
        m: string;
        y: string;
    };
    onControl: (i: number) => void;
    onWheel: (e: WheelEvent) => void;
    onFocus: (index: number) => -1 | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    prefix: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    minDate: {
        type: StringConstructor;
        default: null;
    };
    maxDate: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    disabled: boolean;
    readonly: boolean;
    modelValue: string;
    required: boolean;
    prefix: string;
    minDate: string;
    maxDate: string;
}, {}>;
export default _default;
