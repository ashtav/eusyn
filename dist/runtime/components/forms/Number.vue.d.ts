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
    min: {
        type: NumberConstructor;
        default: null;
    };
    max: {
        type: NumberConstructor;
        default: null;
    };
    nospace: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<number>;
    onControl: (i: number) => void;
    onWheel: (e: WheelEvent) => void;
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
    min: {
        type: NumberConstructor;
        default: null;
    };
    max: {
        type: NumberConstructor;
        default: null;
    };
    nospace: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    modelValue: string;
    min: number;
    max: number;
    nospace: boolean;
    prefix: string;
}, {}>;
export default _default;
