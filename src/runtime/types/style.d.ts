interface Style {
    image(path?: string): string;
}

declare module '#app' {
    interface NuxtApp {
        $style: Style;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $style: Style;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $style: Style;
    }
}

export default Style