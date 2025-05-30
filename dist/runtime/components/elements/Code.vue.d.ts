declare const _default: import("vue").DefineComponent<{
    code: {
        type: StringConstructor;
    };
    description: {
        type: StringConstructor;
        default: null;
    };
    lang: {
        type: StringConstructor;
    };
}, {
    code: import("vue").Ref<string | undefined>;
    language: import("vue").Ref<string>;
    codeElement: import("vue").Ref<HTMLElement | null>;
    copied: import("vue").Ref<boolean>;
    doCopy: () => Promise<void>;
    iconCheck: string;
    iconCopy: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
    };
    description: {
        type: StringConstructor;
        default: null;
    };
    lang: {
        type: StringConstructor;
    };
}>>, {
    description: string;
}, {}>;
export default _default;
