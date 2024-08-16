import * as _nuxt_schema from '@nuxt/schema';

interface ModuleOptions {
    prefix?: string;
    global?: boolean;
    disableGlobalStyles?: boolean;
    plugins?: Array<string>;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { type ModuleOptions, _default as default };
