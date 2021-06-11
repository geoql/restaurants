import { NuxtApolloConfiguration } from '@nuxtjs/apollo/types/nuxt';

const apolloConfig: NuxtApolloConfiguration = {
  clientConfigs: {
    default: {
      httpEndpoint: process.env.HASURA_ENDPOINT || '',
    },
  },
};

export { apolloConfig as apollo };
