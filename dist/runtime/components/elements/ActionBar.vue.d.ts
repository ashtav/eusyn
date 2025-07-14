interface Action {
    label?: string;
    icon?: string;
    click?: (value: any) => void;
}
declare const _default: import("vue").DefineComponent<{
    actions: {
        type: {
            (arrayLength: number): Action[];
            (...items: Action[]): Action[];
            new (arrayLength: number): Action[];
            new (...items: Action[]): Action[];
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
    radius: {
        type: StringConstructor;
        default: string;
    };
}, {
    handleClick: (action: Action) => void;
    styles: {
        borderRadius: string;
        padding: string;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    actions: {
        type: {
            (arrayLength: number): Action[];
            (...items: Action[]): Action[];
            new (arrayLength: number): Action[];
            new (...items: Action[]): Action[];
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
    radius: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    actions: Action[];
    radius: string;
}, {}>;
export default _default;
