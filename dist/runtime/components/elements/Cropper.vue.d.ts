import type { Ref } from 'vue';
interface Config {
    x: number | null;
    y: number | null;
    size: number | null;
    minCropSize: number;
}
interface CropData {
    data: string;
    config?: Config;
    onCrop?: Function;
}
declare const _default: import("vue").DefineComponent<{}, {
    show: Ref<boolean>;
    init: (data: CropData) => void;
    doCrop: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
