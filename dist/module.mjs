import { defineNuxtModule, createResolver, addPlugin, addComponentsDir, addComponent, addImportsDir } from '@nuxt/kit';

const name = "nuxt-tabler-ui";
const version = "1.0.0";

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
    toast: false,
    confirm: false
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias["#ui"] = runtimeDir;
    if (!options.disableGlobalStyles) {
      nuxt.options.css.push(resolve(runtimeDir, "styles/tabler/css/tabler.min.css"));
      nuxt.options.css.push(resolve(runtimeDir, "styles/tabler/css/tabler-icons.css"));
      nuxt.options.css.push(resolve(runtimeDir, "styles/customs/override.css"));
    }
    nuxt.options.plugins.push(resolve(runtimeDir, "scripts/confirm/setup"));
    addPlugin({ src: resolve(runtimeDir, "scripts", "confirm") });
    nuxt.options.plugins.push(resolve(runtimeDir, "scripts/toast/setup"));
    addPlugin({ src: resolve(runtimeDir, "scripts", "toast") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "utils") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "image") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "faker") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "style") });
    addPlugin({ src: resolve(runtimeDir, "scripts", "modal") });
    addComponentsDir({
      path: resolve(runtimeDir, "components", "elements"),
      prefix: options.prefix,
      global: options.global,
      watch: false
    });
    addComponentsDir({
      path: resolve(runtimeDir, "components", "forms"),
      prefix: options.prefix,
      global: options.global,
      watch: false
    });
    addComponentsDir({
      path: resolve(runtimeDir, "components", "data"),
      prefix: options.prefix,
      global: options.global,
      watch: false
    });
    addComponentsDir({
      path: resolve(runtimeDir, "components", "layout"),
      prefix: options.prefix,
      global: options.global,
      watch: false
    });
    addComponent({
      name: "Modal",
      filePath: resolve(runtimeDir, "components", "overlays/Modal.vue"),
      global: options.global
    });
    addImportsDir(resolve(runtimeDir, "composables"));
    console.log("Nuxt Tabler UI - 1.0.0 24.8.15.1");
  }
});

export { module as default };
