import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['plausible'] = {
  hashMode: false,
  trackLocalhost: false,
  domain: 'restuarants.geoql.in',
  apiHost: 'https://analytics.geoql.in',
  autoPageviews: true,
  autoOutboundTracking: true,
};
