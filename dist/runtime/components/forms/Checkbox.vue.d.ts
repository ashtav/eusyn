interface CheckboxOption {
    label?: string;
    value?: string | number;
    disabled?: boolean;
    crossed?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | {
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
        })[];
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
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
    options: {
        type: {
            (arrayLength: number): (string | number | CheckboxOption)[];
            (...items: (string | number | CheckboxOption)[]): (string | number | CheckboxOption)[];
            new (arrayLength: number): (string | number | CheckboxOption)[];
            new (...items: (string | number | CheckboxOption)[]): (string | number | CheckboxOption)[];
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
    emptyMessage: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    utils: import("../../types/utils").default;
    localValue: import("vue").Ref<boolean | any[]>;
    localOptions: import("vue").Ref<(string | number | {
        label?: string;
        value?: string | number;
        disabled?: boolean;
        crossed?: boolean;
    })[]>;
    inputName: import("vue").Ref<string>;
    single: import("vue").Ref<boolean>;
    isLoading: import("vue").Ref<boolean>;
    setLoading: (loading: boolean) => void;
    onInput: (event: any, option: any, single?: boolean) => void;
    textOption: (option: any, prioritizeValue?: boolean) => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | {
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
        })[];
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
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
    options: {
        type: {
            (arrayLength: number): (string | number | CheckboxOption)[];
            (...items: (string | number | CheckboxOption)[]): (string | number | CheckboxOption)[];
            new (arrayLength: number): (string | number | CheckboxOption)[];
            new (...items: (string | number | CheckboxOption)[]): (string | number | CheckboxOption)[];
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
    emptyMessage: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    value: string | number | boolean;
    disabled: boolean;
    required: boolean;
    options: (string | number | CheckboxOption)[];
    emptyMessage: string;
    inline: boolean;
    modelValue: boolean | any[];
}, {}>;
export default _default;
