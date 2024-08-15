declare const _default: import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    submitted: {
        type: BooleanConstructor;
        default: boolean;
    };
    submit: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: null;
    };
    iconAlign: {
        type: StringConstructor;
        default: string;
    };
    to: {
        type: StringConstructor;
        default: null;
    };
}, {
    isSubmit: import("vue").Ref<boolean>;
    utils: import("../../types/utils").default;
    click_: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    submitted: {
        type: BooleanConstructor;
        default: boolean;
    };
    submit: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: null;
    };
    iconAlign: {
        type: StringConstructor;
        default: string;
    };
    to: {
        type: StringConstructor;
        default: null;
    };
}>>, {
    label: string;
    submit: boolean;
    icon: string;
    disabled: boolean;
    submitted: boolean;
    theme: string;
    iconAlign: string;
    to: string;
}, {}>;
export default _default;
