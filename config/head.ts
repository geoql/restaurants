import type { NuxtAppConfig } from 'nuxt/schema';

const head: NuxtAppConfig['head'] = {
  title: 'Restaurants :: GeoQL',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Fetch restaurants via map–based interface',
    },
    { name: 'msapplication-TileColor', content: '#303030' },
    { name: 'msapplication-TileImage', content: '/mstile-150x150.png' },
    { name: 'theme-color', content: '#303030' },
    { hid: 'og:site_name', property: 'og:site_name', content: 'GeoQL' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'twitter:site', name: 'twitter:site', content: '@_vinayak_k' },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: '/images/social.png',
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: '/images/social.png',
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Restaurants/GQL',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: '/images/social.png',
    },
  ],
  script: [
    {
      src: 'https://unpkg.com/maplibre-gl@3.2.1/dist/maplibre-gl.js',
      defer: true,
    },
    {
      src: 'https://unpkg.com/terra-draw@0.0.1-alpha.44/dist/terra-draw.modern.js',
      defer: true,
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/maplibre-gl@3.2.1/dist/maplibre-gl.css',
    },
  ],
  noscript: [
    {
      innerHTML: 'This application requires JavaScript.',
    },
  ],
};

export { head };
