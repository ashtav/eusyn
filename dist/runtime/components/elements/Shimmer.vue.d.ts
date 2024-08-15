import type { Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    size: {
        type: (StringConstructor | NumberConstructor | {
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
        default: number[];
    };
    radius: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    iterate: {
        type: NumberConstructor;
        default: number;
    };
    gap: {
        type: StringConstructor;
        default: null;
    };
}, {
    utils: import("../../types/utils").default;
    styles: Ref<Record<string, any>[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: (StringConstructor | NumberConstructor | {
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
        default: number[];
    };
    radius: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    iterate: {
        type: NumberConstructor;
        default: number;
    };
    gap: {
        type: StringConstructor;
        default: null;
    };
}>>, {
    size: string | number | any[];
    radius: string | number;
    iterate: number;
    gap: string;
}, {}>;
export default _default;
