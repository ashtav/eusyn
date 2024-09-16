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
}, {
    times: import("vue").Ref<string[]>;
    onChange: (type: string, index: number) => void;
    onWheel: (event: WheelEvent, index: number) => void;
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
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    time: string[];
    format: string;
    modelValue: string;
}, {}>;
export default _default;
