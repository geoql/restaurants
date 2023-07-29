import type { ModuleOptions } from '@nuxtjs/apollo';

export const apollo: ModuleOptions = {
  clients: {
    default: {
      httpEndpoint:
        process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql',
    },
  },
};
