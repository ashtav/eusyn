import { addComponent, addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  prefix?: string
  global?: boolean // default is false
  disableGlobalStyles?: boolean,
  toast?: boolean,
  confirm?: boolean,
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
    toast: false,
    confirm: false
  },

  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#ui'] = runtimeDir

    if (!options.disableGlobalStyles) {
      nuxt.options.css.push(resolve(runtimeDir, 'styles/tabler/css/tabler.min.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'styles/tabler/css/tabler-icons.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'styles/customs/override.css'))
    }

    // Injections
    nuxt.options.plugins.push(resolve(runtimeDir, 'scripts/confirm/setup'))
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'confirm') })

    nuxt.options.plugins.push(resolve(runtimeDir, 'scripts/toast/setup'))
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'toast') })

    // Plugins
    addPlugin({ src: resolve(runtimeDir, 'plugins', 'utils') })
    addPlugin({ src: resolve(runtimeDir, 'plugins', 'image') })
    addPlugin({ src: resolve(runtimeDir, 'plugins', 'faker') })
    addPlugin({ src: resolve(runtimeDir, 'plugins', 'style') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'modal') })

    // Components
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'elements'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })

    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'forms'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })

    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'data'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })

    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'layout'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })

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

    console.log('Nuxt Tabler UI - 1.0.0 24.8.15.1')
  }
})
