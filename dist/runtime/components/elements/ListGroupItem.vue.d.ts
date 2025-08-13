declare const _default: import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: StringConstructor;
        default: null;
    };
    thumbnail: {
        type: StringConstructor;
        default: null;
    };
    tsize: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: {
            (arrayLength: number): {
                icon: string;
                key: any;
            }[];
            (...items: {
                icon: string;
                key: any;
            }[]): {
                icon: string;
                key: any;
            }[];
            new (arrayLength: number): {
                icon: string;
                key: any;
            }[];
            new (...items: {
                icon: string;
                key: any;
            }[]): {
                icon: string;
                key: any;
            }[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => {
            icon: string;
            key: string;
        }[];
    };
    hoverAction: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    emit: (event: string, ...args: any[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: StringConstructor;
        default: null;
    };
    thumbnail: {
        type: StringConstructor;
        default: null;
    };
    tsize: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: {
            (arrayLength: number): {
                icon: string;
                key: any;
            }[];
            (...items: {
                icon: string;
                key: any;
            }[]): {
                icon: string;
                key: any;
            }[];
            new (arrayLength: number): {
                icon: string;
                key: any;
            }[];
            new (...items: {
                icon: string;
                key: any;
            }[]): {
                icon: string;
                key: any;
            }[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => {
            icon: string;
            key: string;
        }[];
    };
    hoverAction: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    label: string;
    value: string;
    active: boolean;
    thumbnail: string;
    options: {
        icon: string;
        key: any;
    }[];
    tsize: string;
    inline: boolean;
    hoverAction: boolean;
}, {}>;
export default _default;
