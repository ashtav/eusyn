import type { PropType, Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    columns: {
        type: PropType<Array<Column>>;
        default: () => never[];
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
    pagination: {
        type: PropType<TablePagination>;
        default: {
            client: boolean;
            meta: Meta;
            length: number;
            paginate: (page: number) => void;
        };
    };
    entries: {
        type: PropType<TableEntries>;
        default: {
            entries: number[];
            entry: (value: number) => void;
        };
    };
}, {
    keys: any[];
    headers: Ref<Record<string, any>[]>;
    dataTable: Ref<Record<string, any>>;
    doSortBy: (data: Record<string, any>) => void;
    entries: Ref<number[]>;
    onEntries: (data: any) => void;
    meta: Ref<any>;
    entry: Ref<any>;
    active: Ref<number>;
    onNavigate: (page: number) => void;
    pageNumber: () => Array<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: PropType<Array<Column>>;
        default: () => never[];
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
    pagination: {
        type: PropType<TablePagination>;
        default: {
            client: boolean;
            meta: Meta;
            length: number;
            paginate: (page: number) => void;
        };
    };
    entries: {
        type: PropType<TableEntries>;
        default: {
            entries: number[];
            entry: (value: number) => void;
        };
    };
}>>, {
    entries: any;
    columns: Column[];
    rows: Record<string, any>[];
    pagination: any;
}, {}>;
export default _default;
