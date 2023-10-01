<template>
  <div class="h-full w-full select-none outline-none">
    <!-- Loading indicator -->
    <div
      v-if="!mapStore.loaded"
      class="fixed z-10 h-full w-full flex items-center justify-center opacity-75"
    >
      <svg
        class="h-6 w-6 animate-spin text-gray-900 dark:text-white"
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
    <template v-if="mapStore.utils.basemaps.data.basemaps.length > 0">
      <common-map
        :class="{ 'opacity-50': !mapStore.loaded }"
        @loaded="onMapLoaded"
        @geolocated="onMapGeolocated"
      >
        <template #tools-tl>
          <section v-if="mapStore.loaded">
            <!-- User Location Tracker -->
            <template v-if="mapStore.utils.geolocate.data.center.length">
              <user-location :map="map" />
            </template>
            <!-- Draw AOI -->
            <!-- <div
              class="visible relative h-10 w-auto border border-stone-100 rounded-md bg-stone-200 text-sm text-stone-600 dark:border-slate-700 dark:bg-stone-700 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
              title="Area of Interest"
              :class="{
                'bg-stone-300 dark:bg-stone-900': mapStore.utils.aoi.shown,
              }"
            >
              <button
                class="flex cursor-pointer items-center justify-between p-2 space-x-2"
                @click="search"
              >
                <svg
                  class="h-5 w-5 fill-none stroke-1.5 stroke-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <span>Search</span>
              </button>
            </div> -->
          </section>
        </template>
      </common-map>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Marker, type Map } from 'maplibre-gl';
  // import { VLayerMaplibreGeojson } from '~/lib/v-mapbox';
  import UserLocation from '@/components/tracker/UserLocation.vue';
  import CommonMap from '@/components/map/CommonMap.vue';
  // @ts-ignore
  import circle from '@turf/circle';
  // @ts-ignore
  import area from '@turf/area';
  import { Feature } from 'geojson';

  const mapStore = useMap();
  const restaurantStore = useRestaurant();

  onMounted(async () => {
    await mapStore.getBasemaps();
  });

  let map = markRaw({} as Map);

  const onMapLoaded = (m: Map): void => {
    map = m;
  };
  const onMapGeolocated = (): void => {
    const radius = 1;
    const c: Feature = circle(mapStore.utils.geolocate.data.center, radius, {
      steps: 64,
      units: 'kilometers',
    });
    mapStore.setGeolocateWidgetCircle(c);

    const totalArea = area(c);
    const bound = Number(Math.sqrt(totalArea).toFixed(0));
    restaurantStore
      .getRestaurants({
        bound,
        lat: mapStore.utils.geolocate.data.center[1],
        long: mapStore.utils.geolocate.data.center[0],
      })
      .then(() => {
        for (let i = 0; i < restaurantStore.restaurants.data.length; i += 1) {
          const coords = restaurantStore.restaurants.data[`${i}`];
          new Marker().setLngLat([coords.lat, coords.long]).addTo(map);
        }
      });
  };
  const search = () => {
    console.log('search nearby');
  };
  // const drawAreaOfInterest = () => {
  //   console.log('map: ', map);
  //   const draw = new TerraDraw({
  //     adapter: new TerraDrawMapLibreGLAdapter({
  //       map,
  //       coordinatePrecision: 9,
  //     }),
  //     modes: {
  //       circle: new TerraDrawCircleMode(),
  //     },
  //   });
  //   if (draw.enabled) {
  //     draw.clear();
  //   }
  //   draw.start();
  //   draw.setMode('circle');
  //   draw.on('finish', () => {
  //     draw.setMode('static');
  //     const snapshots = draw.getSnapshot();
  //     const polygon = snapshots[snapshots.length - 1];
  //     const totalArea = area(polygon);
  //     const bound = Number(Math.sqrt(totalArea).toFixed(0));
  //     restaurantStore
  //       .getRestaurants({
  //         bound,
  //         lat: c.lat,
  //         long: c.lng,
  //       })
  //       .then(() => {
  //         for (let i = 0; i < restaurantStore.restaurants.data.length; i += 1) {
  //           const coords = restaurantStore.restaurants.data[`${i}`];
  //           new Marker().setLngLat([coords.lat, coords.long]).addTo(map);
  //         }
  //       });
  //     mapStore.setAoiWidgetShown(false);
  //   });
  //   mapStore.toggleAoiWidget();
  // };
</script>
