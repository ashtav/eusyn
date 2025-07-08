declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor)[];
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
        default: null;
    };
    prefix: {
        type: StringConstructor;
        default: null;
    };
    suffix: {
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
    mask: {
        type: StringConstructor;
        default: null;
    };
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<string | number>;
    inputType: import("vue").Ref<string>;
    inputSuffix: import("vue").Ref<any[]>;
    input: import("vue").Ref<null>;
    onInput: (event: any) => void;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
    onMouseDown: (event: any) => void;
    onSuffix: (data: any) => void;
    onKeyPress: (event: any) => void;
    doFocus: () => void;
    isTabler: boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focus" | "update:modelValue" | "enter" | "suffix" | "event")[], "focus" | "update:modelValue" | "enter" | "suffix" | "event", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor)[];
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
        default: null;
    };
    prefix: {
        type: StringConstructor;
        default: null;
    };
    suffix: {
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
    mask: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
    onSuffix?: ((...args: any[]) => any) | undefined;
    onEvent?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    disabled: boolean;
    type: string;
    mask: string;
    readonly: boolean;
    password: boolean;
    required: boolean;
    modelValue: string | number;
    prefix: string;
    minDate: string;
    maxDate: string;
    suffix: any[];
    hint: string;
    autofocus: boolean;
    maxLength: number;
    formatters: string;
}, {}>;
export default _default;
