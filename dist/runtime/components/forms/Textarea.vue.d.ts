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
    disabled: {
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
    maxHeight: {
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
    formatters: {
        type: StringConstructor;
        default: string;
    };
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<string>;
    inputSuffixs: import("vue").Ref<any[]>;
    textarea: import("vue").Ref<null>;
    onInput: (event: any) => void;
    onSuffix: (data: any) => void;
    onKeyPress: (event: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("blur" | "update:modelValue" | "enter" | "suffix")[], "blur" | "update:modelValue" | "enter" | "suffix", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    disabled: {
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
    maxHeight: {
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
    formatters: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onBlur?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
    onSuffix?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    disabled: boolean;
    required: boolean;
    modelValue: string;
    prefix: string;
    hint: string;
    autofocus: boolean;
    maxLength: number;
    formatters: string;
    suffixs: any[];
    maxHeight: number;
}, {}>;
export default _default;
