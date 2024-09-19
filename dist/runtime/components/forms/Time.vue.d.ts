declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
    };
    prefix: {
        type: StringConstructor;
    };
    time: {
        type: () => Array<string>;
        default: () => never[];
    };
    format: {
        type: StringConstructor;
        default: string;
    };
    nospace: {
        type: BooleanConstructor;
        default: boolean;
    };
    shape: {
        type: StringConstructor;
        default: string;
    };
}, {
    times: import("vue").Ref<string[]>;
    hasFocus: import("vue").Ref<boolean>;
    onChange: (type: string, index: number) => void;
    onWheel: (event: WheelEvent, index: number) => void;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
    };
    prefix: {
        type: StringConstructor;
    };
    time: {
        type: () => Array<string>;
        default: () => never[];
    };
    format: {
        type: StringConstructor;
        default: string;
    };
    nospace: {
        type: BooleanConstructor;
        default: boolean;
    };
    shape: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    time: string[];
    format: string;
    modelValue: string;
    nospace: boolean;
    shape: string;
}, {}>;
export default _default;
