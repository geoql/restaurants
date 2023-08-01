import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['apollo'] = {
  clients: {
    default: {
      connectToDevTools: process.env.NODE_ENV !== 'production',
      websocketsOnly: false,
      wsLinkOptions: { lazy: true },
      wsEndpoint: process.env.HASURA_WS_ENDPOINT,
      httpEndpoint:
        process.env.HASURA_HTTP_ENDPOINT || 'http://localhost:8080/v1/graphql',
      httpLinkOptions: {
        credentials: 'include',
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || '',
        },
      },
    },
  },
};
