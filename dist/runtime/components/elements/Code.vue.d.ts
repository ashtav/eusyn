declare const _default: import("vue").DefineComponent<{
    code: {
        type: StringConstructor;
        required: true;
    };
    description: {
        type: StringConstructor;
        default: null;
    };
    lang: {
        type: StringConstructor;
        default: string;
    };
}, {
    codeElement: import("vue").Ref<HTMLElement | null>;
    language: import("vue").Ref<string>;
    copied: import("vue").Ref<boolean>;
    doCopy: () => Promise<void>;
    iconCheck: string;
    iconCopy: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
        required: true;
    };
    description: {
        type: StringConstructor;
        default: null;
    };
    lang: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    description: string;
    lang: string;
}, {}>;
export default _default;
