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
      :draw="state.map.drawAreaOfInterest"
      @map-load="mapLoaded"
      @style-changed="(e) => (state.map.styleChanged = e)"
      @draw-create="refetchRestaurants"
    >
      <!-- Area of Interest -->
      <div class="absolute top-0 left-0 flex items-center">
        <div class="relative">
          <button
            type="button"
            class="p-2 m-2 rounded shadow outline-none focus:outline-none hover:shadow-sm"
            :class="{
              'bg-purple-700 text-white': state.map.drawAreaOfInterest,
              'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white': !state
                .map.drawAreaOfInterest,
            }"
            @click="state.map.drawAreaOfInterest = true"
          >
            Draw Area of Interest
          </button>
        </div>
      </div>
      <!-- Drawn GeoJSON -->
      <mgl-geojson-layer
        v-if="state.map.loaded && state.map.styleChanged"
        source-id="drawn-geojson-source"
        :source.sync="drawnGeoJSON.source"
        layer-id="drawn-geojson-layer"
        :layer.sync="drawnGeoJSON.layer"
        :clear-source="true"
        :replace="true"
      />
      <!-- Restaurants -->
      <div
        v-if="
          state.map.loaded &&
          state.map.styleChanged &&
          !state.map.drawAreaOfInterest &&
          restaurants &&
          restaurants.length > 0
        "
      >
        <mgl-marker
          v-for="({ lat, long, name }, idx) in restaurants"
          :key="idx"
          :coordinates="[lat, long]"
        >
          <svg
            slot="marker"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            viewBox="0 0 512 512"
          >
            <defs />
            <path
              fill="#e44b4d"
              d="M416 184a160 160 0 00-320 0c0 88.36556 160 304 160 304s160-215.63444 160-304z"
            />
            <circle cx="256" cy="184" r="120" fill="#8acce7" />
            <circle cx="256" cy="184" r="72" fill="#379ec3" />
            <path
              fill="#d3e1e9"
              d="M216 132v37.58008A26.93984 26.93984 0 01204 192a26.96915 26.96915 0 00-12 22.41992V300a12 12 0 11-24 0v-85.58008A26.93951 26.93951 0 00156 192a26.96915 26.96915 0 01-12-22.41992V132a11.99677 11.99677 0 0112-12 12.08192 12.08192 0 018.49 3.51A11.962 11.962 0 01168 132a11.99677 11.99677 0 0112-12 12.08192 12.08192 0 018.49 3.51A11.962 11.962 0 01192 132a12 12 0 1124 0zM368 156v13.57785A26.9481 26.9481 0 01356 192a26.9481 26.9481 0 00-12 22.42218V300a12 12 0 01-12 12 12 12 0 01-12-12v-85.57781A26.9481 26.9481 0 00308 192a26.9481 26.9481 0 01-12-22.42218V156a36 36 0 0136-36 36 36 0 0136 36z"
            />
            <path
              fill="#c4d4e0"
              d="M317.09445 178.83476q-.12272-.08289-.24613-.165A10.914 10.914 0 01312 169.57812v-13.087c0-10.83039 8.40512-20.06693 19.22777-20.4765A20.02156 20.02156 0 01352 156v13.57812a10.914 10.914 0 01-4.84832 9.09161q-.1234.08214-.24613.165a26.63431 26.63431 0 01-29.8111.00003z"
            />
            <path
              d="M256 312a127.77993 127.77993 0 0056-12.88135V300a20 20 0 0040 0v-31.33594a128.00063 128.00063 0 10-202.60016-155.52148A20.01748 20.01748 0 00136 132v7.3894a128.12284 128.12284 0 0024 129.27466V300a20 20 0 0040 0v-.88135A127.77993 127.77993 0 00256 312zm0-16a111.68954 111.68954 0 01-56-14.99023v-39.815a80.12884 80.12884 0 00112-.02392v39.83887A111.68954 111.68954 0 01256 296zm-32-126.42188V132a19.96017 19.96017 0 00-.29-3.26074 63.98395 63.98395 0 0170.84455 4.189A43.72746 43.72746 0 00288 156v13.57812a34.87793 34.87793 0 0015.5625 29.07813A18.9107 18.9107 0 01312 214.42188v.57983a64.01722 64.01722 0 01-112 .001v-.58081a18.9107 18.9107 0 018.4375-15.76563A34.87793 34.87793 0 00224 169.57812zM336 300a4 4 0 01-8 0v-85.57812a34.87793 34.87793 0 00-15.5625-29.07813A18.9107 18.9107 0 01304 169.57812V156a28 28 0 0156 0v13.57812a18.9107 18.9107 0 01-8.4375 15.76563A34.87793 34.87793 0 00336 214.42188zm16-85.57812a18.9107 18.9107 0 018.4375-15.76563 34.9922 34.9922 0 007.26483-6.48535A111.50831 111.50831 0 01352 241.7168zM256 72a111.82856 111.82856 0 0186.84058 41.35449 43.92512 43.92512 0 00-37.4997 7.67334 80.0225 80.0225 0 00-90.35535-5.72241A19.93584 19.93584 0 00192 116.00977a19.961 19.961 0 00-24 0c-.21533-.16211-.44318-.30762-.66516-.46094A111.43572 111.43572 0 01256 72zM144.29767 192.1709a34.9922 34.9922 0 007.26483 6.48535A18.9107 18.9107 0 01160 214.42188v27.29467a111.50826 111.50826 0 01-15.70233-49.54565zM184 300a4 4 0 01-8 0v-85.57812a34.87793 34.87793 0 00-15.5625-29.07813A18.9107 18.9107 0 01152 169.57812V132a4 4 0 018 0v36a8 8 0 0016 0v-36a4 4 0 018 0v36a8 8 0 0016 0v-36a4 4 0 018 0v37.57812a18.9107 18.9107 0 01-8.4375 15.76563A34.87793 34.87793 0 00184 214.42188z"
            />
          </svg>
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
  import { computed, defineComponent, reactive } from '@nuxtjs/composition-api';
  import { MglMarker, MglPopup, MglGeojsonLayer } from 'v-mapbox';
  import { FeatureCollection } from 'geojson';
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
          bound: 1000,
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
      MglGeojsonLayer,
    },
    setup() {
      const $apollo = useApollo();
      const state = reactive({
        map: {
          loaded: false as boolean,
          styleChanged: false as boolean,
          drawAreaOfInterest: false as boolean,
          drawnGeoJSON: {
            type: 'FeatureCollection',
            features: [],
          } as FeatureCollection,
        },
        loading: false,
      });
      const drawnGeoJSON = reactive({
        source: computed(() => {
          if (!state.map.drawAreaOfInterest) {
            return {
              type: 'geojson',
              data: state.map.drawnGeoJSON,
            };
          }
          return {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [],
            },
          };
        }),
        layer: computed(() => {
          return {
            id: 'drawn-geojson-layer',
            type: 'fill',
            source: 'drawn-geojson-source',
            paint: {
              'fill-color': '#fff',
              'fill-opacity': 0.55,
              'fill-outline-color': '#f5f5f5',
            },
            layout: {
              visibility: state.map.drawAreaOfInterest ? 'none' : 'visible',
            },
          };
        }),
      });

      /**
       * If map is loaded
       * @returns void
       */
      function mapLoaded(loaded: boolean): void {
        state.map.loaded = loaded;
      }
      /**
       * Fetch restaurants from gql server
       * @returns Promise
       */
      async function refetchRestaurants({
        event,
        center,
      }: {
        event: any;
        center: { latitude: number; longitude: number };
      }): Promise<void> {
        if (!state.loading) {
          state.loading = true;
          state.map.drawAreaOfInterest = false;
          state.map.drawnGeoJSON.features = event.features;
          await $apollo.queries.restaurants.setVariables({
            bound: 1000,
            lat: center.latitude,
            long: center.longitude,
          });
          await $apollo.queries.restaurants.refetch();
          state.loading = false;
        }
      }
      return {
        state,
        drawnGeoJSON,
        mapLoaded,
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
