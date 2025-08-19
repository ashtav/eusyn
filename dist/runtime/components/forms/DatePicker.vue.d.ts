declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | {
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
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    minDate: {
        type: StringConstructor;
    };
    maxDate: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    dateRef: import("vue").Ref<null>;
    show: import("vue").Ref<boolean>;
    hint: import("vue").Ref<string>;
    dates: import("vue").Ref<any>;
    date: any;
    focused: import("vue").Ref<number | null>;
    selected: import("vue").Ref<string | {
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
    utils: import("../../types/utils").default;
    calendarAbove: import("vue").Ref<boolean>;
    calendar: import("vue").Ref<null>;
    trigger: import("vue").Ref<null>;
    inRangeDates: import("vue").Ref<never[]>;
    preRangeDates: import("vue").Ref<never[]>;
    display: import("vue").Ref<string>;
    onChangeMonth: (index: number) => void;
    onWeel: (e: WheelEvent) => void;
    onWheelHeader: (e: WheelEvent) => void;
    focusAt: (index?: any) => void;
    onSelect: (dateStr: string) => void;
    onHover: (dateStr: string) => void;
    watchInRange: (date: any) => string;
    watchPraInRange: (date: any) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | {
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
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    minDate: {
        type: StringConstructor;
    };
    maxDate: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    multiple: boolean;
    disabled: boolean;
    required: boolean;
    modelValue: string | String[];
}, {}>;
export default _default;
