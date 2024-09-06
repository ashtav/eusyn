import { addComponent, addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  prefix?: string
  global?: boolean // default is false
  disableGlobalStyles?: boolean,
  plugins?: Array<string>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'ui',
    compatibility: {
      nuxt: '>=3.10.0'
    }
  },

  defaults: {
    prefix: '',
    disableGlobalStyles: false,
    plugins: [],
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#ui'] = runtimeDir

    if (!options.disableGlobalStyles) {
      nuxt.options.css.push(resolve(runtimeDir, 'styles/tabler/css/tabler.min.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'styles/tabler/css/tabler-icons.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'styles/customs/override.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'styles/customs/utilities.scss'))
    }

    // Injections
    nuxt.options.plugins.push(resolve(runtimeDir, 'scripts/confirm/setup'))
    nuxt.options.plugins.push(resolve(runtimeDir, 'scripts/toast/setup'))

    // Plugins
    addPlugin({ src: resolve(runtimeDir, 'plugins', 'ntx') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'modal') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'confirm') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'toast') })

    // Components
    const component = (name: string) => {
      return {
        path: resolve(runtimeDir, 'components', name),
        prefix: options.prefix,
        global: options.global,
        watch: false
      }
    }

    addComponentsDir(component('elements'))
    addComponentsDir(component('forms'))
    addComponentsDir(component('data'))
    addComponentsDir(component('layout'))

    addComponent({
      name: 'Modal',
      filePath: resolve(runtimeDir, 'components', 'overlays/Modal.vue'),
      global: options.global
    })

    // addComponentsDir({
    //   path: resolve(runtimeDir, 'components', 'overlays'),
    //   prefix: options.prefix,
    //   global: options.global,
    //   watch: false
    // })

    // Composables
    addImportsDir(resolve(runtimeDir, 'composables'))

    console.log('NTX - 1.0.0 24906.1')
  }
})
