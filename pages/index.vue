<template>
  <div class="w-full h-full pt-20 pb-20">
    <!-- Loading indicator -->
    <div
      v-if="state.loading"
      class="fixed z-40 flex items-center justify-center w-full h-full pb-20 opacity-75"
    >
      <svg
        class="w-5 h-5 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
    <common-map
      :class="{ 'opacity-75': state.loading }"
      @draw-create="refetchRestaurants"
      @draw-update="refetchRestaurants"
      @draw-delete="refetchRestaurants"
    >
      <div v-if="restaurants && restaurants.length > 0">
        <mgl-marker
          v-for="({ lat, long, name }, idx) in restaurants"
          :key="idx"
          :coordinates="[lat, long]"
          color="red"
        >
          <mgl-popup :coordinates="[lat, long]" anchor="top">
            <div class="w-full h-full p-1">
              {{ name }}
            </div>
          </mgl-popup>
        </mgl-marker>
      </div>
    </common-map>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@nuxtjs/composition-api';
  import { MglMarker, MglPopup } from 'v-mapbox';
  import { fetchRestaurants } from '@/gql/fetchRestaurants';
  import { useApollo } from '@/plugins/apollo';
  import CommonMap from '@/components/CommonMap.vue';

  const latitude = 0;
  const longitude = 0;

  export default defineComponent({
    name: 'IndexPage',
    apollo: {
      restaurants: {
        query: fetchRestaurants,
        variables: {
          bound: 750,
          lat: latitude,
          long: longitude,
        },
        update(data: any) {
          return data.get_nearby_restaurants;
        },
      },
    },
    components: {
      CommonMap,
      MglMarker,
      MglPopup,
    },
    setup() {
      const $apollo = useApollo();
      const state = reactive({
        loading: false,
      });
      async function refetchRestaurants({ event, coordinates }: any) {
        if (!state.loading) {
          state.loading = true;
          await $apollo.queries.restaurants.setVariables({
            bound: 750,
            lat: event.type !== 'draw.delete' ? coordinates.latitude : 0,
            long: event.type !== 'draw.delete' ? coordinates.longitude : 0,
          });
          await $apollo.queries.restaurants.refetch();
          state.loading = false;
        }
      }
      return {
        state,
        refetchRestaurants,
      };
    },
  });
</script>

<style>
  .mapboxgl-popup-content {
    background: #c3c3c3;
  }
</style>
