
import type { ModuleOptions } from './module.js'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['ui']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['ui']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['ui']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['ui']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module.js'
