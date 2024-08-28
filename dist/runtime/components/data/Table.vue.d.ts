import type { Ref } from 'vue';
interface Column {
    key?: string;
    label: string;
    sortable?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    columns: {
        type: {
            (arrayLength: number): Column[];
            (...items: Column[]): Column[];
            new (arrayLength: number): Column[];
            new (...items: Column[]): Column[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: never[];
    };
    rows: {
        type: {
            (arrayLength: number): Record<string, any>[];
            (...items: Record<string, any>[]): Record<string, any>[];
            new (arrayLength: number): Record<string, any>[];
            new (...items: Record<string, any>[]): Record<string, any>[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: never[];
    };
}, {
    keys: any[];
    headers: Ref<Record<string, any>[]>;
    dataTable: Ref<Record<string, any>>;
    doSortBy: (data: Record<string, any>) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: {
            (arrayLength: number): Column[];
            (...items: Column[]): Column[];
            new (arrayLength: number): Column[];
            new (...items: Column[]): Column[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: never[];
    };
    rows: {
        type: {
            (arrayLength: number): Record<string, any>[];
            (...items: Record<string, any>[]): Record<string, any>[];
            new (arrayLength: number): Record<string, any>[];
            new (...items: Record<string, any>[]): Record<string, any>[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: never[];
    };
}>>, {
    columns: Column[];
    rows: Record<string, any>[];
}, {}>;
export default _default;
