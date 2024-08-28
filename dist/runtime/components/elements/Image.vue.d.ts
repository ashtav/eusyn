declare const _default: import("vue").DefineComponent<{
    src: {
        type: StringConstructor;
        required: true;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor[];
    };
    height: {
        type: NumberConstructor[];
    };
    quality: {
        type: NumberConstructor;
        default: null;
    };
}, {
    img: import("vue").Ref<HTMLImageElement | null>;
    sizes: import("vue").Ref<(number | undefined)[]>;
    isLoaded: import("vue").Ref<boolean>;
    finalSrc: import("vue").Ref<string>;
    onLoad: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor[];
    };
    height: {
        type: NumberConstructor[];
    };
    quality: {
        type: NumberConstructor;
        default: null;
    };
}>>, {
    alt: string;
    quality: number;
}, {}>;
export default _default;
