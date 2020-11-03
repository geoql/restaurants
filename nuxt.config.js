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
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#FCFFCF' },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#FCFFCF',
    background: 'white',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: '~/assets/css/global.css', lang: 'css' },
    { src: 'mapbox-gl/dist/mapbox-gl.css', lang: 'css' },
    { src: 'v-mapbox/dist/v-mapbox.css', lang: 'css' },
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
      theme_color: '#FCFFCF',
      author: 'Vinayak Kulkarni',
      lang: 'en',
    },
    // https://pwa.nuxtjs.org/manifest
    manifest: {
      name: 'Nuxt with Hasura.io',
      short_name: 'NHM',
      description: 'Nuxt with Hasura, GraphQL & mapbox-gl',
      categories: ['Hasura', 'Apollo', 'GraphQL', 'Web Based GIS'],
      theme_color: '#FCFFCF',
      background_color: '#FEFFEF',
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
  build: {},
};
