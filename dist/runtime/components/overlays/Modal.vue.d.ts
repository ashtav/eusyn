declare const _default: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    elevation: {
        type: BooleanConstructor;
        default: boolean;
    };
    actions: {
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
        default: never[];
    };
    headerless: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    modal: import("../../types/modal").default;
    preShow: import("vue").Ref<boolean>;
    show: import("vue").Ref<boolean>;
    title: import("vue").Ref<string>;
    onClose: (args: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    elevation: {
        type: BooleanConstructor;
        default: boolean;
    };
    actions: {
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
        default: never[];
    };
    headerless: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    size: string;
    actions: any[];
    elevation: boolean;
    headerless: boolean;
}, {}>;
export default _default;
