export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Hasura + Nuxt & MapboxGL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#303030' },
      { name: 'msapplication-TileImage', content: '/icons/mstile-150x150.png' },

      { name: 'theme-color', content: '#303030' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icons/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png',
      },
    ],
  },

  loading: { color: '#303030' },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#303030',
    background: 'white',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: 'mapbox-gl/dist/mapbox-gl.css', lang: 'css' },
    { src: 'v-mapbox/dist/v-mapbox.css', lang: 'css' },
    { src: '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css', lang: 'css' },
    { src: '~/assets/css/global.css', lang: 'css' },
  ],

  // Nuxt env variables (https://nuxtjs.org/api/configuration-env/)
  env: {
    mapToken: process.env.MAP_TOKEN || '',
    appVersion: process.env.npm_package_version || '0.0.0',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '@/plugins/composition-api', mode: 'client' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org/#tailwind-v18
    '@nuxtjs/color-mode',
  ],
  // Read more: https://tailwindcss.nuxtjs.org/
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: true,
    config: {},
  },
  // Read more: https://color-mode.nuxtjs.org/#tailwindcss-dark-mode
  colorMode: {
    // remove -mode suffix for Tailwind Dark mode support
    classSuffix: '',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // PWA module configuration (https://go.nuxtjs.dev/pwa)
  pwa: {
    // https://pwa.nuxtjs.org/meta
    meta: {
      name: 'Nuxt, Hasura & Mapbox',
      theme_color: '#303030',
      author: 'Vinayak Kulkarni',
      lang: 'en',
    },
    // https://pwa.nuxtjs.org/manifest
    manifest: {
      name: 'Nuxt with Hasura.io',
      short_name: 'NHM',
      description: 'Nuxt with Hasura, GraphQL & mapbox-gl',
      categories: ['Hasura', 'Apollo', 'GraphQL', 'Web Based GIS'],
      theme_color: '#303030',
      background_color: '#303030',
      lang: 'en',
    },
  },

  // Read more: https://typescript.nuxtjs.org/guide/lint.html#runtime-lint
  typescript: {
    typeCheck: {
      eslint: {
        enabled: true,
        files: './',
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
      };
    },
  },
};
