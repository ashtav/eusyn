import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import type { DeepPartial, Strategy } from './runtime/types/utils'
import * as config from './runtime/ui.config'
// import createTemplates from './templates'


type UI = {
  primary?: string
  gray?: string
  colors?: string[]
  strategy?: Strategy
  [key: string]: any
} & DeepPartial<typeof config, string>

declare module 'nuxt/schema' {
  interface AppConfigInput {
    // @ts-ignore
    ui?: UI
  }
}
declare module '@nuxt/schema' {
  interface AppConfigInput {
    // @ts-ignore
    ui?: UI
  }
}

export interface ModuleOptions {
  /**
   * @default 'u'
   */
  prefix?: string

  /**
   * @default false
   */
  global?: boolean

  safelistColors?: string[]
  /**
   * Disables the global css styles added by the module.
   */
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

    // createTemplates(nuxt)

    // Plugins

    addPlugin({ src: resolve(runtimeDir, 'plugins', 'utils') })
    addPlugin({ src: resolve(runtimeDir, 'scripts', 'modal') })

    // addPlugin({
    //   src: resolve(runtimeDir, 'plugins', 'modals')
    // })

    // addPlugin({
    //   src: resolve(runtimeDir, 'plugins', 'slideovers')
    // })

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
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'navigation'),
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
