import type { NuxtConfig } from 'nuxt/schema';
import { head } from './head';

const app: NuxtConfig['app'] = {
  head,
};

const components: NuxtConfig['components'] = false;

const css: NuxtConfig['css'] = [
  'maplibre-gl/dist/maplibre-gl.css',
  '~/assets/css/global.css',
  '~/assets/css/fonts.css',
];

const devtools: NuxtConfig['devtools'] = { enabled: true };

const experimental: NuxtConfig['experimental'] = {
  emitRouteChunkError: 'automatic',
  typescriptBundlerResolution: true,
  viewTransition: true,
  componentIslands: true,
  payloadExtraction: true,
  typedPages: true,
};

const nitro: NuxtConfig['nitro'] = {
  preset: 'netlify',
  prerender: {
    crawlLinks: true,
  },
};

const plugins: NuxtConfig['plugins'] = [
  { src: '~/plugins/v-click-outside', mode: 'client' },
];

const routeRules: NuxtConfig['routeRules'] = {
  // Homepage pre-rendered at build time
  '/': { prerender: true },
};

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: {
    map: {
      aws: {
        region: 'ap-south-1',
        key: process.env.AWS_MAP_TOKEN,
      },
      mapbox: {
        key: process.env.MAPBOX_MAP_TOKEN,
      },
    },
    appVersion: process.env.npm_package_version,
  },
};

const ssr: NuxtConfig['ssr'] = false;

const typescript: NuxtConfig['typescript'] = {
  strict: true,
  shim: false,
};

const vite: NuxtConfig['vite'] = {
  optimizeDeps: {
    include: ['terra-draw', 'maplibre-gl'],
  },
  build: {
    rollupOptions: {
      external: ['terra-draw', 'maplibre-gl'],
    },
    commonjsOptions: {
      include: [/maplibre-gl/, /terra-draw/, /node_modules/],
    },
  },
};

export { modules } from './modules';
export {
  app,
  components,
  css,
  devtools,
  experimental,
  nitro,
  plugins,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
  vite,
};
