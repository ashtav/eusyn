declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
        default: null;
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
    prefix: {
        type: StringConstructor;
        default: null;
    };
    suffixs: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    password: {
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
    formatters: {
        type: StringConstructor;
        default: string;
    };
    nospace: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: StringConstructor;
        default: null;
    };
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<string>;
    inputType: import("vue").Ref<string>;
    inputSuffixs: import("vue").Ref<any[]>;
    onInput: (event: any) => void;
    onFocus: (event: any) => void;
    onMouseDown: (event: any) => void;
    onSuffix: (data: any) => void;
    onKeyPress: (event: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("blur" | "focus" | "update:modelValue" | "enter" | "suffix")[], "blur" | "focus" | "update:modelValue" | "enter" | "suffix", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
        default: null;
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
    prefix: {
        type: StringConstructor;
        default: null;
    };
    suffixs: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    password: {
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
    formatters: {
        type: StringConstructor;
        default: string;
    };
    nospace: {
        type: BooleanConstructor;
        default: boolean;
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
    type: string;
    label: string;
    mask: string;
    readonly: boolean;
    disabled: boolean;
    required: boolean;
    modelValue: string;
    password: boolean;
    nospace: boolean;
    hint: string;
    autofocus: boolean;
    maxLength: number;
    prefix: string;
    suffixs: any[];
    minDate: string;
    maxDate: string;
    formatters: string;
}, {}>;
export default _default;
