interface Image {
    quality: (base64: string, quality: number) => Promise<{
        data: string;
        size: string;
        quality: number;
        dimensions: {
            width: number;
            height: number;
        };
    }>;
    resize: (base64: string, sizes: Array<number>) => Promise<{
        data: string;
        size: string;
        dimensions: {
            width: number;
            height: number;
        };
    }>;
    flip: (base64: string, direction: string) => Promise<{
        data: string;
        size: string;
        dimensions: {
            width: number;
            height: number;
        };
    }>;
    rotate: (base64: string, angle: string) => Promise<{
        data: string;
        size: string;
        dimensions: {
            width: number;
            height: number;
        };
    }>;
}
declare module '#app' {
    interface NuxtApp {
        $image: Image;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $image: Image;
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $image: Image;
    }
}
declare const _default: any;
export default _default;
