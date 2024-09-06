import { type PropType, type Ref } from 'vue';
interface TabData {
    label?: string;
    icon?: string;
}
interface TabAction {
    icon: string;
    click?: (data: TabAction) => {};
}
interface RibbonCard {
    background?: string;
    content: string | number;
    position?: string;
}
declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
    thumbnail: {
        type: StringConstructor;
    };
    elevation: {
        type: BooleanConstructor;
        default: boolean;
    };
    stacked: {
        type: BooleanConstructor;
        default: boolean;
    };
    dense: {
        type: BooleanConstructor;
        default: boolean;
    };
    ribbon: {
        type: PropType<RibbonCard>;
        default: null;
    };
    actions: {
        type: {
            (arrayLength: number): TabAction[];
            (...items: TabAction[]): TabAction[];
            new (arrayLength: number): TabAction[];
            new (...items: TabAction[]): TabAction[];
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
    tabs: {
        type: {
            (arrayLength: number): TabData[];
            (...items: TabData[]): TabData[];
            new (arrayLength: number): TabData[];
            new (...items: TabData[]): TabData[];
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
    tabPos: {
        type: StringConstructor;
        default: string;
    };
}, {
    tabActive: Ref<number>;
    onTab: (i: number) => number;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    thumbnail: {
        type: StringConstructor;
    };
    elevation: {
        type: BooleanConstructor;
        default: boolean;
    };
    stacked: {
        type: BooleanConstructor;
        default: boolean;
    };
    dense: {
        type: BooleanConstructor;
        default: boolean;
    };
    ribbon: {
        type: PropType<RibbonCard>;
        default: null;
    };
    actions: {
        type: {
            (arrayLength: number): TabAction[];
            (...items: TabAction[]): TabAction[];
            new (arrayLength: number): TabAction[];
            new (...items: TabAction[]): TabAction[];
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
    tabs: {
        type: {
            (arrayLength: number): TabData[];
            (...items: TabData[]): TabData[];
            new (arrayLength: number): TabData[];
            new (...items: TabData[]): TabData[];
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
    tabPos: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    stacked: boolean;
    elevation: boolean;
    dense: boolean;
    ribbon: RibbonCard;
    actions: TabAction[];
    tabs: TabData[];
    tabPos: string;
}, {}>;
export default _default;
