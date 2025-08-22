declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor | {
            (arrayLength: number): String[];
            (...items: String[]): String[];
            new (arrayLength: number): String[];
            new (...items: String[]): String[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        })[];
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
    prefix: {
        type: StringConstructor;
        default: null;
    };
    suffix: {
        type: StringConstructor;
        default: null;
    };
    options: {
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
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    duplicate: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    utils: import("../../types/utils").default;
    labelInput: import("vue").Ref<string | number | {
        readonly [x: number]: string;
        toString: () => string;
        charAt: (pos: number) => string;
        charCodeAt: (index: number) => number;
        concat: (...strings: string[]) => string;
        indexOf: (searchString: string, position?: number) => number;
        lastIndexOf: (searchString: string, position?: number) => number;
        localeCompare: {
            (that: string): number;
            (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
            (that: string, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): number;
        };
        match: {
            (regexp: string | RegExp): RegExpMatchArray | null;
            (matcher: {
                [Symbol.match](string: string): RegExpMatchArray | null;
            }): RegExpMatchArray | null;
        };
        replace: {
            (searchValue: string | RegExp, replaceValue: string): string;
            (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
            (searchValue: {
                [Symbol.replace](string: string, replaceValue: string): string;
            }, replaceValue: string): string;
            (searchValue: {
                [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
            }, replacer: (substring: string, ...args: any[]) => string): string;
        };
        search: {
            (regexp: string | RegExp): number;
            (searcher: {
                [Symbol.search](string: string): number;
            }): number;
        };
        slice: (start?: number, end?: number) => string;
        split: {
            (separator: string | RegExp, limit?: number): string[];
            (splitter: {
                [Symbol.split](string: string, limit?: number): string[];
            }, limit?: number): string[];
        };
        substring: (start: number, end?: number) => string;
        toLowerCase: () => string;
        toLocaleLowerCase: {
            (locales?: string | string[]): string;
            (locales?: Intl.LocalesArgument): string;
        };
        toUpperCase: () => string;
        toLocaleUpperCase: {
            (locales?: string | string[]): string;
            (locales?: Intl.LocalesArgument): string;
        };
        trim: () => string;
        readonly length: number;
        substr: (from: number, length?: number) => string;
        valueOf: () => string;
        codePointAt: (pos: number) => number | undefined;
        includes: (searchString: string, position?: number) => boolean;
        endsWith: (searchString: string, endPosition?: number) => boolean;
        normalize: {
            (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
            (form?: string): string;
        };
        repeat: (count: number) => string;
        startsWith: (searchString: string, position?: number) => boolean;
        anchor: (name: string) => string;
        big: () => string;
        blink: () => string;
        bold: () => string;
        fixed: () => string;
        fontcolor: (color: string) => string;
        fontsize: {
            (size: number): string;
            (size: string): string;
        };
        italics: () => string;
        link: (url: string) => string;
        small: () => string;
        strike: () => string;
        sub: () => string;
        sup: () => string;
        padStart: (maxLength: number, fillString?: string) => string;
        padEnd: (maxLength: number, fillString?: string) => string;
        trimEnd: () => string;
        trimStart: () => string;
        trimLeft: () => string;
        trimRight: () => string;
        matchAll: (regexp: RegExp) => IterableIterator<RegExpExecArray>;
        [Symbol.iterator]: () => IterableIterator<string>;
        at: (index: number) => string | undefined;
    }[]>;
    localOptions: import("vue").Ref<any[]>;
    selected: import("vue").Ref<null>;
    isFocus: import("vue").Ref<boolean>;
    refSelect: import("vue").Ref<null>;
    refOption: import("vue").Ref<null>;
    isLoading: import("vue").Ref<boolean>;
    values: import("vue").Ref<any>;
    indexToSelect: import("vue").Ref<number>;
    onInput: (e: any) => void;
    onFocus: (event: any) => void;
    onBlur: () => void;
    onSelect: (option: any) => void;
    onKeyPress: (event: any) => void;
    onSuffix: () => void;
    textOption: (option: any, prioritizeValue?: boolean) => any;
    doFocus: () => void;
    setLoading: (value: boolean) => void;
    removeItem: (index: number) => void;
    onClean: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "focus" | "update:modelValue" | "enter")[], "change" | "focus" | "update:modelValue" | "enter", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        default: string;
        type: (NumberConstructor | StringConstructor | {
            (arrayLength: number): String[];
            (...items: String[]): String[];
            new (arrayLength: number): String[];
            new (...items: String[]): String[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        })[];
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
    prefix: {
        type: StringConstructor;
        default: null;
    };
    suffix: {
        type: StringConstructor;
        default: null;
    };
    options: {
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
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    duplicate: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    multiple: boolean;
    disabled: boolean;
    required: boolean;
    options: any[];
    prefix: string;
    suffix: string;
    modelValue: string | number | String[];
    hint: string;
    autofocus: boolean;
    duplicate: boolean;
}, {}>;
export default _default;
