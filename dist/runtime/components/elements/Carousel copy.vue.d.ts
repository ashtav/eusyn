import { type PropType } from 'vue';
interface CarouselConfig {
    autoPlay?: boolean;
    autoPlayInterval?: number;
    maxDots?: number;
    draggable?: boolean;
    infinite?: boolean;
    slideToShow?: number;
}
declare const _default: import("vue").DefineComponent<{
    images: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: true;
    };
    initIndex: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    config: {
        type: PropType<CarouselConfig>;
        default: {
            autoPlay: boolean;
            autoPlayInterval: number;
            maxDots: number;
            draggable: boolean;
            infinite: boolean;
            slideToShow: number;
        };
    };
}, {
    carousel: import("vue").Ref<HTMLElement | null>;
    track: import("vue").Ref<HTMLElement | null>;
    currentIndex: import("vue").Ref<number>;
    prevButton: import("vue").Ref<HTMLButtonElement | null>;
    nextButton: import("vue").Ref<HTMLButtonElement | null>;
    moveToSlide: (index: number, animate?: boolean) => void;
    displayedDots: import("vue").ComputedRef<number[]>;
    dotStyle: (i: number) => {
        transform: string;
        opacity: number;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    images: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: true;
    };
    initIndex: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    config: {
        type: PropType<CarouselConfig>;
        default: {
            autoPlay: boolean;
            autoPlayInterval: number;
            maxDots: number;
            draggable: boolean;
            infinite: boolean;
            slideToShow: number;
        };
    };
}>>, {
    config: CarouselConfig;
    initIndex: number;
    height: string | number;
}, {}>;
export default _default;
