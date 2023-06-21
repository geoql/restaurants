import type { NuxtConfig } from 'nuxt/schema';
import { head } from './head';

const app: NuxtConfig['app'] = {
  head,
};

const css: NuxtConfig['css'] = [
  'mapbox-gl/dist/mapbox-gl.css',
  'v-mapbox/dist/v-mapbox.css',
  '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css',
  '~/assets/css/global.css',
];

const plugins: NuxtConfig['plugins'] = [
  { src: '~/plugins/click-outside', mode: 'client' },
];

const typescript: NuxtConfig['typescript'] = {
  strict: true,
  shim: false,
};

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: {
    mapToken: process.env.MAP_TOKEN,
    appVersion: process.env.npm_package_version,
  },
};

export { head } from './head';
export { modules } from './modules';
export { app, css, plugins, runtimeConfig, typescript };
