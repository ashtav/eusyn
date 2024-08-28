interface Avatar {
    url?: string;
    alt?: string;
}
declare const _default: import("vue").DefineComponent<{
    url: {
        type: StringConstructor;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    alt: {
        type: StringConstructor;
    };
    radius: {
        type: StringConstructor;
        default: string;
    };
    list: {
        type: {
            (arrayLength: number): Avatar[];
            (...items: Avatar[]): Avatar[];
            new (arrayLength: number): Avatar[];
            new (...items: Avatar[]): Avatar[];
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
    stacked: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    url: {
        type: StringConstructor;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    alt: {
        type: StringConstructor;
    };
    radius: {
        type: StringConstructor;
        default: string;
    };
    list: {
        type: {
            (arrayLength: number): Avatar[];
            (...items: Avatar[]): Avatar[];
            new (arrayLength: number): Avatar[];
            new (...items: Avatar[]): Avatar[];
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
    stacked: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    size: string;
    radius: string;
    list: Avatar[];
    stacked: boolean;
}, {}>;
export default _default;
