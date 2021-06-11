import { NuxtOptionsModule } from '@nuxt/types/config/module';
import { apollo } from './apollo';
import { axios } from './axios';
import { pwa } from './pwa';

export const modules: NuxtOptionsModule[] = [
  // https://go.nuxtjs.dev/axios
  ['@nuxtjs/axios', axios],
  // https://go.nuxtjs.dev/pwa
  ['@nuxtjs/pwa', pwa],
  // Doc: https://github.com/nuxt-community/apollo-module
  ['@nuxtjs/apollo', apollo],
];
