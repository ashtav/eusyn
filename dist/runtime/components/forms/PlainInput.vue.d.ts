declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor)[];
    };
    hint: {
        type: StringConstructor;
        default: null;
    };
    type: {
        type: StringConstructor;
        default: string;
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
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxLength: {
        type: NumberConstructor;
        default: number;
    };
    minDate: {
        type: StringConstructor;
        default: null;
    };
    maxDate: {
        type: StringConstructor;
        default: null;
    };
    formatters: {
        type: StringConstructor;
        default: string;
    };
    mask: {
        type: StringConstructor;
        default: null;
    };
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<string | number>;
    inputType: import("vue").Ref<string>;
    input: import("vue").Ref<null>;
    onInput: (event: any) => void;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
    onMouseDown: (event: any) => void;
    onKeyPress: (event: any) => void;
    doFocus: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "focus" | "suffix" | "enter")[], "update:modelValue" | "focus" | "suffix" | "enter", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor)[];
    };
    hint: {
        type: StringConstructor;
        default: null;
    };
    type: {
        type: StringConstructor;
        default: string;
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
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxLength: {
        type: NumberConstructor;
        default: number;
    };
    minDate: {
        type: StringConstructor;
        default: null;
    };
    maxDate: {
        type: StringConstructor;
        default: null;
    };
    formatters: {
        type: StringConstructor;
        default: string;
    };
    mask: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
    onSuffix?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    type: string;
    mask: string;
    readonly: boolean;
    modelValue: string | number;
    required: boolean;
    minDate: string;
    maxDate: string;
    hint: string;
    autofocus: boolean;
    maxLength: number;
    formatters: string;
}, {}>;
export default _default;
