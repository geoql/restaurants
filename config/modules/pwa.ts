export const pwa = {
  // https://pwa.nuxtjs.org/icon
  icon: {
    source: 'static/icons/icon.png',
    sizes: [64, 120, 144, 152, 192, 384, 512],
  },
  // https://pwa.nuxtjs.org/meta
  meta: {
    name: 'Restaurants',
    theme_color: '#303030',
    author: 'Vinayak Kulkarni',
    lang: 'en',
  },
  // https://pwa.nuxtjs.org/manifest
  manifest: {
    name: 'Restaurants in 🇮🇳',
    short_name: 'NHM',
    description: 'Nuxt with Hasura, GraphQL & mapbox-gl',
    categories: ['Hasura', 'Apollo', 'GraphQL', 'Web Based GIS'],
    theme_color: '#303030',
    background_color: '#303030',
    lang: 'en',
  },
};
