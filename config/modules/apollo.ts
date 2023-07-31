import type { NuxtConfig } from 'nuxt/schema';

export const config: NuxtConfig['apollo'] = {
  clients: {
    default: {
      connectToDevTools: true,
      authType: null,
      httpEndpoint:
        process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql',
      tokenStorage: 'localStorage',
      httpLinkOptions: {
        credentials: 'include',
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || '',
        },
      },
    },
  },
  clientAwareness: true,
};
