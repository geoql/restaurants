import { getCurrentInstance } from '@nuxtjs/composition-api';

export function useApollo() {
  const { $apollo } = getCurrentInstance();

  if (!$apollo) {
    // throw error, no store provided
    throw new Error('Nuxt apollo is not defined!');
  }
  return $apollo;
}
