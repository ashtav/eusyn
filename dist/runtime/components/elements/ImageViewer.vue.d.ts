interface ImageSrc {
    src: string;
    id: string;
}
declare const _default: import("vue").DefineComponent<{}, {
    images: import("vue").Ref<{
        src: string;
        id: string;
    }[]>;
    image: import("vue").Ref<{
        src: string;
        id: string;
    } | null>;
    imageId: import("vue").Ref<string | null>;
    loading: import("vue").Ref<boolean>;
    show: import("vue").Ref<boolean>;
    info: import("vue").Ref<string>;
    viewerImg: import("vue").Ref<HTMLImageElement | null>;
    scale: import("vue").Ref<number>;
    onImage: (e: MouseEvent, img: ImageSrc) => void;
    open: (imageSrc: string[] | ImageSrc, index?: number) => void;
    onAction: (icon: string) => void;
    onControl: (icon: string) => void;
    onWheel: (event: WheelEvent) => void;
    onDblClick: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
