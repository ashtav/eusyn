import { defineNuxtModule, createResolver, addPlugin, addComponentsDir, addComponent, addImportsDir } from '@nuxt/kit';

const name = "eusyn";
const version = "0.0.16";

const module = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "ui",
    compatibility: {
      nuxt: ">=3.10.0"
    }
  },
  defaults: {
    prefix: "",
    disableGlobalStyles: false,
    plugins: [],
    icon: "huge"
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias["#ui"] = runtimeDir;
    if (!nuxt.options.runtimeConfig.public.ui) {
      nuxt.options.runtimeConfig.public.ui = {
        icon: options.icon
      };
    }
    nuxt.options.runtimeConfig.public.ui.icon = options.icon;
    if (!options.disableGlobalStyles) {
      nuxt.options.css.push(resolve(runtimeDir, "assets/styles/css/tabler.min.css"));
      nuxt.options.css.push(resolve(runtimeDir, "assets/styles/css/tabler-icons.css"));
      nuxt.options.css.push(resolve(runtimeDir, "assets/styles/css/hgi-stroke-rounded.css"));
      nuxt.options.css.push(resolve(runtimeDir, "assets/styles/css/override.css"));
    }
    nuxt.options.plugins.push(resolve(runtimeDir, "scripts/confirm/setup"));
    nuxt.options.plugins.push(resolve(runtimeDir, "scripts/toast/setup"));
    nuxt.options.plugins.push({
      src: resolve(runtimeDir, "scripts/tabler"),
      mode: "client"
    });
    addPlugin({ src: resolve(runtimeDir, "plugins", "ntx") });
    addPlugin({ src: resolve(runtimeDir, "scripts", "modal") });
    addPlugin({ src: resolve(runtimeDir, "scripts", "confirm") });
    addPlugin({ src: resolve(runtimeDir, "scripts", "toast") });
    const component = (name2) => {
      return {
        path: resolve(runtimeDir, "components", name2),
        prefix: options.prefix,
        global: options.global,
        watch: false
      };
    };
    addComponentsDir(component("elements"));
    addComponentsDir(component("forms"));
    addComponentsDir(component("data"));
    addComponentsDir(component("layout"));
    addComponent({
      name: "Modal",
      filePath: resolve(runtimeDir, "components", "overlays/Modal.vue"),
      global: options.global
    });
    addImportsDir(resolve(runtimeDir, "composables"));
  }
});

export { module as default };
