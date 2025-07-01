declare const _default: import("vue").DefineComponent<{
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    justify: {
        type: StringConstructor;
        default: string;
    };
    reversed: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    rowStyle: import("vue").ComputedRef<{
        display: string;
        justifyContent: any;
        alignItems: string;
        gap: string;
    }>;
    childStyle: import("vue").ComputedRef<{
        flex: string | number;
    }>;
    slots: import("vue").ComputedRef<import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    justify: {
        type: StringConstructor;
        default: string;
    };
    reversed: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    reversed: boolean;
    gap: string | number;
    expanded: boolean;
    align: string;
    justify: string;
}, {}>;
export default _default;
