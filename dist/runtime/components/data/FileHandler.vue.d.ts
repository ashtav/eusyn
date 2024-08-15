import type { Ref } from 'vue';
interface Config {
    maxSize?: number;
    width?: Array<number>;
    height?: Array<number>;
    label?: string;
    hint?: string;
    required?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    accept: {
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
        default: string[];
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Config;
        default: {
            maxSize: number;
            width: never[];
            height: never[];
            label: null;
            hint: null;
            required: boolean;
        };
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    acceptFile: Ref<string>;
    fileInput: Ref<null>;
    input: Ref<string>;
    onClick: () => void;
    handeFiles: (e: any) => Promise<void>;
    onDragged: (event: DragEvent) => void;
    onDropped: (event: DragEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "dragged")[], "select" | "dragged", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    accept: {
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
        default: string[];
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Config;
        default: {
            maxSize: number;
            width: never[];
            height: never[];
            label: null;
            hint: null;
            required: boolean;
        };
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    onDragged?: ((...args: any[]) => any) | undefined;
}, {
    accept: string[];
    multiple: boolean;
    config: Config;
    draggable: boolean;
}, {}>;
export default _default;
