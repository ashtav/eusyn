import type { Ref } from 'vue';
interface Config {
    min?: number;
    max?: number;
    loop?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
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
        default: () => never[];
    };
    active: {
        type: StringConstructor;
        default: () => null;
    };
    /**
     * allowed: ['copy', 'download']
     */
    actions: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
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
    config: {
        type: () => Config;
        default: {
            min: null;
            max: null;
            loop: boolean;
        };
    };
    onDownload: FunctionConstructor;
}, {
    localValue: Ref<boolean>;
    currentIndex: Ref<number>;
    width: Ref<number>;
    height: Ref<number>;
    imageUrl: Ref<string>;
    isCursorInImageList: Ref<boolean>;
    actionsControl: Ref<string[]>;
    resizeToDefault: () => void;
    onAction: (action: string) => Promise<void> | undefined;
    adjustSize: (event: WheelEvent) => void;
    updateImageSize: () => void;
    onNavigate: (i: number) => void;
    close: () => void;
    onSelectImage: (index: number) => void;
    imageStyle: import("vue").ComputedRef<{
        backgroundImage: string;
        width: string;
        height: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("download" | "update:modelValue")[], "download" | "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
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
        default: () => never[];
    };
    active: {
        type: StringConstructor;
        default: () => null;
    };
    /**
     * allowed: ['copy', 'download']
     */
    actions: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
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
    config: {
        type: () => Config;
        default: {
            min: null;
            max: null;
            loop: boolean;
        };
    };
    onDownload: FunctionConstructor;
}>> & {
    onDownload?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    active: string;
    actions: string[];
    images: any[];
    config: Config;
    modelValue: boolean;
}, {}>;
export default _default;
