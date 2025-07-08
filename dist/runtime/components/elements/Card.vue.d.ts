import { type PropType, type Ref } from 'vue';
interface TabData {
    label?: string;
    icon?: string;
}
interface TabAction {
    icon: string;
    click?: (data: any) => void;
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
    icon: {
        type: StringConstructor;
        default: string;
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
    titleStyle: {
        type: StringConstructor;
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
    tabActive: {
        type: NumberConstructor;
        default: number;
    };
    colors: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
}, {
    card: Ref<HTMLElement | null>;
    currentTab: Ref<number>;
    onTab: (i: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("onTab" | "update:tabActive")[], "onTab" | "update:tabActive", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    icon: {
        type: StringConstructor;
        default: string;
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
    titleStyle: {
        type: StringConstructor;
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
    tabActive: {
        type: NumberConstructor;
        default: number;
    };
    colors: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
}>> & {
    onOnTab?: ((...args: any[]) => any) | undefined;
    "onUpdate:tabActive"?: ((...args: any[]) => any) | undefined;
}, {
    icon: string;
    stacked: boolean;
    elevation: boolean;
    dense: boolean;
    ribbon: RibbonCard;
    actions: TabAction[];
    tabs: TabData[];
    tabPos: string;
    tabActive: number;
    colors: Record<string, string>;
}, {}>;
export default _default;
