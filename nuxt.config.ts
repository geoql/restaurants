import type { NuxtConfig } from 'nuxt/schema';
import {
  app,
  components,
  css,
  devtools,
  experimental,
  modules,
  plugins,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
} from './config';

export default {
  app,
  components,
  css,
  devtools,
  experimental,
  ssr,
  modules,
  plugins,
  routeRules,
  runtimeConfig,
  typescript,
} satisfies NuxtConfig;
