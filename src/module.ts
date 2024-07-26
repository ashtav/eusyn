import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  prefix?: string
  global?: boolean // default is false
  safelistColors?: string[]
  disableGlobalStyles?: boolean
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
    safelistColors: ['primary'],
    disableGlobalStyles: false
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
    }

    // Plugins
    addPlugin({ src: resolve(runtimeDir, 'plugins', 'utils') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'modal') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'toast') })

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
      path: resolve(runtimeDir, 'components', 'overlays'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })

    // Composables
    addImportsDir(resolve(runtimeDir, 'composables'))
  }
})
