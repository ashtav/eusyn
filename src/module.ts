import { addComponent, addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  prefix?: string
  global?: boolean // default is false
  disableGlobalStyles?: boolean
  plugins?: Array<string>
  icon: string
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
    icon: 'huge'
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#ui'] = runtimeDir

    // Pastikan ui sudah ada
    if (!nuxt.options.runtimeConfig.public.ui) {
      nuxt.options.runtimeConfig.public.ui = {
        icon: options.icon
      }
    }

    // Pastikan untuk set icon pada ui
    (nuxt.options.runtimeConfig.public.ui as Record<string, any>).icon = options.icon;


    if (!options.disableGlobalStyles) {
      nuxt.options.css.push(resolve(runtimeDir, 'assets/styles/css/tabler.min.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'assets/styles/css/tabler-icons.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'assets/styles/css/hgi-stroke-rounded.css'))
      nuxt.options.css.push(resolve(runtimeDir, 'assets/styles/css/override.css'))
    }

    // Injections
    nuxt.options.plugins.push(resolve(runtimeDir, 'scripts/confirm/setup'))
    nuxt.options.plugins.push(resolve(runtimeDir, 'scripts/toast/setup'))
    nuxt.options.plugins.push({
      src: resolve(runtimeDir, 'scripts/tabler'),
      mode: 'client'
    })

    // Plugins roti, sayur kol, telur, cheese, daging, mayonise, saus, 
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

    // Composables
    addImportsDir(resolve(runtimeDir, 'composables'))
  }
})
