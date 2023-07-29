import { fetchNearbyRestaurantsQuery } from '@/graphql/queries';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import type {
  IRestaurantRequest,
  IRestaurantResponse,
  IRestaurant,
} from '~/types/restaurant';

export const useRestaurant = defineStore({
  id: 'restaurant',
  state: () => ({
    ui: {
      loaded: false,
      errors: {
        shown: false,
        data: [] as string[],
      },
    },
    restaurants: {
      data: [] as IRestaurant[],
    },
  }),
  getters: {
    loaded: (state) => state.restaurants.data.length > 0 && state.ui.loaded,
  },
  actions: {
    setLoaded(loaded: boolean) {
      this.ui.loaded = loaded;
    },
    async getRestaurants(variables: IRestaurantRequest): Promise<void> {
      this.setLoaded(false);
      const { data }: { data: Ref<IRestaurantResponse> } = await useAsyncQuery(
        fetchNearbyRestaurantsQuery,
        variables,
      );
      this.setRestaurants(data.value.getrestaurants);
      this.setLoaded(true);
    },
    setRestaurants(restaurants: IRestaurant[]): void {
      this.restaurants.data = restaurants;
    },
  },
});
