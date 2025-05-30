import type { Ref } from 'vue';
interface Config {
    maxSize?: number;
    width?: Array<number>;
    height?: Array<number>;
    label?: string;
    hint?: string;
    required?: boolean;
}
/**
 * FileHandler is a file input component with drag & drop.
 */
declare const _default: import("vue").DefineComponent<{
    accept: {
        type: StringConstructor;
        default: string;
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    output: {
        type: StringConstructor;
        default: string;
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
        type: StringConstructor;
        default: string;
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    output: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    onDragged?: ((...args: any[]) => any) | undefined;
}, {
    output: string;
    accept: string;
    multiple: boolean;
    config: Config;
    draggable: boolean;
    disabled: boolean;
}, {}>;
export default _default;
