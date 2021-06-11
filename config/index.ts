import {
  NuxtOptionsLoading,
  NuxtOptionsLoadingIndicator,
} from '@nuxt/types/config/loading';
import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin';
import { NuxtOptionsRuntimeConfig } from '@nuxt/types/config/runtime';

const typescript = {
  typeCheck: {
    eslint: {
      enabled: true,
      files: [
        '@types/**/*.{ts,js}',
        'components/**/*.{ts,js,vue}',
        'config/**/*.{ts,js}',
        'gql/**/*.{ts,js}',
        'layouts/**/*.{ts,js,vue}',
        'pages/**/*.{ts,js,vue}',
        'plugins/**/*.{ts,js}',
        'store/**/*.{ts,js}',
      ],
    },
  },
};

const publicRuntimeConfig: NuxtOptionsRuntimeConfig = {
  mapToken: process.env.MAP_TOKEN || null,
  appVersion: process.env.npm_package_version || '0.0.0',
};

const css: string[] = [
  'mapbox-gl/dist/mapbox-gl.css',
  'v-mapbox/dist/v-mapbox.css',
  '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css',
  '~/assets/css/global.css',
];

const plugins: NuxtOptionsPlugin[] = [
  { src: '~/plugins/click-outside', mode: 'client' },
];

const loading: NuxtOptionsLoading = { color: '#303030' };

const loadingIndicator: NuxtOptionsLoadingIndicator = {
  name: 'folding-cube',
  color: '#303030',
  color2: '#303030',
  background: '#1a202c',
};

export { default as build } from './build';
export { default as head } from './head';
export {
  css,
  loading,
  loadingIndicator,
  plugins,
  typescript,
  publicRuntimeConfig,
};
