import { type Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    items: {
        type: () => Array<{
            label: string;
            content: string;
        }>;
        default: () => never[];
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    open: {
        type: () => number[];
        default: () => never[];
    };
}, {
    accordion: Ref<HTMLDivElement | null>;
    isOpen: (index: number) => boolean;
    isDefaultOpen: (index: number) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: () => Array<{
            label: string;
            content: string;
        }>;
        default: () => never[];
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    open: {
        type: () => number[];
        default: () => never[];
    };
}>>, {
    items: {
        label: string;
        content: string;
    }[];
    multiple: boolean;
    open: number[];
}, {}>;
export default _default;
