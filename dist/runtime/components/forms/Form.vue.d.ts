declare const _default: import("vue").DefineComponent<{
    debug: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    disabled: import("vue").Ref<boolean>;
    onSubmit: () => void;
    enterable: (value: boolean) => void;
    handleSubmit: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "submit"[], "submit", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    debug: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSubmit?: ((...args: any[]) => any) | undefined;
}, {
    debug: boolean;
}, {}>;
export default _default;
