declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: StringConstructor;
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
    localValue: import("vue").Ref<string>;
    inputType: import("vue").Ref<string>;
    input: import("vue").Ref<null>;
    onInput: (event: any) => void;
    onFocus: (event: any) => void;
    onMouseDown: (event: any) => void;
    onKeyPress: (event: any) => void;
    doFocus: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("blur" | "focus" | "update:modelValue" | "enter" | "suffix")[], "blur" | "focus" | "update:modelValue" | "enter" | "suffix", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: StringConstructor;
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
    onBlur?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
    onSuffix?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    type: string;
    mask: string;
    readonly: boolean;
    required: boolean;
    modelValue: string;
    hint: string;
    autofocus: boolean;
    maxLength: number;
    minDate: string;
    maxDate: string;
    formatters: string;
}, {}>;
export default _default;
