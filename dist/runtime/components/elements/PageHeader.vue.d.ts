interface PageHeaderActions {
    url?: string;
    label?: string;
    icon?: string;
    theme?: string;
    visible?: boolean;
    submit?: boolean;
    click?: Function;
}
interface BreadcrumbItem {
    label: string;
    path: string;
    active?: boolean;
    icon?: string;
}
declare const _default: import("vue").DefineComponent<{
    pretitle: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    actions: {
        type: {
            (arrayLength: number): PageHeaderActions[];
            (...items: PageHeaderActions[]): PageHeaderActions[];
            new (arrayLength: number): PageHeaderActions[];
            new (...items: PageHeaderActions[]): PageHeaderActions[];
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
    breadcrumb: {
        type: {
            (arrayLength: number): BreadcrumbItem[];
            (...items: BreadcrumbItem[]): BreadcrumbItem[];
            new (arrayLength: number): BreadcrumbItem[];
            new (...items: BreadcrumbItem[]): BreadcrumbItem[];
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
}, {
    emit: (event: string, ...args: any[]) => void;
    utils: import("../../types/utils").default;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    pretitle: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    actions: {
        type: {
            (arrayLength: number): PageHeaderActions[];
            (...items: PageHeaderActions[]): PageHeaderActions[];
            new (arrayLength: number): PageHeaderActions[];
            new (...items: PageHeaderActions[]): PageHeaderActions[];
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
    breadcrumb: {
        type: {
            (arrayLength: number): BreadcrumbItem[];
            (...items: BreadcrumbItem[]): BreadcrumbItem[];
            new (arrayLength: number): BreadcrumbItem[];
            new (...items: BreadcrumbItem[]): BreadcrumbItem[];
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
}>>, {
    title: string;
    actions: PageHeaderActions[];
    pretitle: string;
    breadcrumb: BreadcrumbItem[];
}, {}>;
export default _default;
