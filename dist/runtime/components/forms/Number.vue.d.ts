declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor)[];
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
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<number>;
    onControl: (i: number) => void;
    onWheel: (e: WheelEvent) => void;
    onInput: (e: any) => void;
    onPress: (e: any) => void;
    onChange: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor)[];
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
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    modelValue: string | number;
    min: number;
    max: number;
    prefix: string;
}, {}>;
export default _default;
