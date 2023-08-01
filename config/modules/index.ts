import type { NuxtConfig } from 'nuxt/schema';
import { config as plausible } from './plausible';
import { config as unocss } from './unocss';
import { config as apollo } from './apollo';

const modules: NuxtConfig['modules'] = [
  // https://pinia.esm.dev/ssr/nuxt.html#nuxt-js
  '@pinia/nuxt',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://github.com/nuxt-modules/plausible#setup
  ['@nuxtjs/plausible', plausible],
  // https://unocss.dev/integrations/nuxt
  ['@unocss/nuxt', unocss],
  // https://apollo.nuxtjs.org/getting-started/quick-start
  ['@nuxtjs/apollo', apollo],
];

export { modules };
