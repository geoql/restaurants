import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['apollo'] = {
  clients: {
    default: {
      httpEndpoint:
        process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql',
    },
  },
};
