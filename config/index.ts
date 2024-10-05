import type { NuxtConfig } from 'nuxt/schema';
import { head } from './head';

const DEV = process.env.NODE_ENV !== 'production';

const app: NuxtConfig['app'] = {
  head,
};

const components: NuxtConfig['components'] = false;

const css: NuxtConfig['css'] = [
  '~/assets/css/global.css',
  '~/assets/css/fonts.css',
];

const debug: NuxtConfig['debug'] = DEV;

const dev: NuxtConfig['dev'] = DEV;

const devtools: NuxtConfig['devtools'] = {
  enabled: DEV,
};

const devServer: NuxtConfig['devServer'] = {
  port: Number(process.env.NITRO_PORT) || 3000,
  https: {
    key: process.env.NITRO_SSL_KEY || './certs/localhost-key.pem',
    cert: process.env.NITRO_SSL_CERT || './certs/localhost.pem',
  },
};

const experimental: NuxtConfig['experimental'] = {
  renderJsonPayloads: true,
  asyncContext: true,
  typedPages: true,
  buildCache: true,
  asyncEntry: true,
  viewTransition: true,
  payloadExtraction: true,
};

const nitro: NuxtConfig['nitro'] = {
  preset: !DEV ? 'netlify' : 'static',
  future: {
    nativeSWR: true,
  },
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

export { modules } from './modules';
export {
  app,
  components,
  css,
  debug,
  dev,
  devServer,
  devtools,
  experimental,
  nitro,
  plugins,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
};
