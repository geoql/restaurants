import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['plausible'] = {
  hashMode: false,
  trackLocalhost: false,
  domain: 'restaurants.geoql.in',
  apiHost: 'https://analytics.geoql.in',
  autoPageviews: true,
  autoOutboundTracking: true,
};
