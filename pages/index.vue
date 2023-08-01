<template>
  <common-map
    :options="{ ...store.map.options, style: store.style! }"
    @loaded="onMapLoaded"
    @clicked="onMapClicked"
    @pitchended="setMapState"
    @mousemoved="setMapState"
    @zoomended="setMapState"
    @moveended="setMapState"
    @touchended="setMapState"
    @idled="setMapState"
    @style.loaded="onMapStyleLoaded"
    @tiles.loaded="onMapTilesLoaded"
  >
    <template v-if="store.loaded">
      <!-- Map :: Top Left Slot -->
      <div
        class="invisible absolute left-0 top-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 dark:text-white"
      >
        <div class="relative flex flex-col space-y-2">
          <!-- Draw AOI -->
          <div
            class="visible relative h-10 w-auto border border-stone-100 rounded-md bg-stone-200 text-sm text-stone-600 dark:border-slate-700 dark:bg-stone-700 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
            title="Area of Interest"
            :class="{
              'bg-stone-300 dark:bg-stone-900': store.utils.aoi.shown,
            }"
          >
            <button
              class="flex cursor-pointer items-center justify-between p-2 space-x-2"
              @click="toggleTool('aoi')"
            >
              <svg
                class="h-5 w-5 fill-none stroke-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span>Draw AOI</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Map :: Top Right Slot -->
      <div
        class="invisible absolute right-0 top-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 dark:text-white"
      >
        <div class="relative flex flex-col space-y-2">
          <!-- Basemaps -->
          <div
            class="visible relative h-10 w-10 border border-stone-100 rounded-md bg-stone-200 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-800 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
            title="Basemaps"
            :class="{
              'bg-stone-300 dark:bg-stone-900': store.utils.basemaps.shown,
            }"
          >
            <div class="cursor-pointer p-2" @click="toggleTool('basemaps')">
              <svg
                class="h-5 w-5 fill-none stroke-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div
              v-if="store.utils.basemaps.shown"
              class="absolute right-0 top-0 mr-12 w-48 origin-right rounded-md bg-stone-300 shadow-lg ring-1 ring-white ring-opacity-5 sm:w-64 dark:bg-stone-700"
            >
              <basemaps
                :data="store.utils.basemaps.data"
                @update="updateBasemap"
                @close="store.utils.basemaps.shown = false"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Map :: Bottom Right Slot -->
      <div
        class="invisible absolute bottom-12 right-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 sm:bottom-7 dark:text-white"
      >
        <div class="relative flex flex-col space-y-2">
          <slot name="tools-br" class="visible" />
          <!-- Zoom in & out -->
          <div
            class="visible h-20 w-10 flex flex-col items-center justify-center"
            title="Zoom In/Out"
          >
            <!-- Zoom In -->
            <div
              class="h-10 w-10 cursor-pointer border border-b-0 border-stone-100 rounded-md rounded-b-none bg-stone-200 p-2 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-800 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
              title="Zoom In"
              @click="mapZoomIn"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <!-- Zoom Out -->
            <div
              class="h-10 w-10 cursor-pointer border border-t-0 border-stone-100 rounded-md rounded-t-none bg-stone-200 p-2 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-800 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
              title="Zoom Out"
              @click="mapZoomOut"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </div>
          </div>
          <!-- Bearing -->
          <div
            class="visible relative h-10 w-10 border border-stone-100 rounded-md bg-stone-200 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-800 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
            title="Map Bearing"
            :class="{
              'bg-stone-300 dark:bg-stone-800': store.utils.compass.shown,
            }"
          >
            <div class="cursor-pointer p-2" @click="toggleTool('compass')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform fill-current transition-all duration-100 ease-linear"
                viewBox="0 0 18 18"
                :style="{
                  transform:
                    'rotate(' + store.utils.compass.data.bearing + 'deg)',
                }"
              >
                <path
                  d="M5.5 14.2c-.9.8-1.9 0-1.5-1l4-9c.2-.4.6-.8 1-.8s.8.4 1 .8l4 9c.4 1-.6 1.8-1.5 1l-3.5-3-3.5 3z"
                />
              </svg>
            </div>
          </div>
          <!-- Locate -->
          <div
            class="visible relative h-10 w-10 border border-stone-100 rounded-md bg-stone-200 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-800 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
            title="Locate Me"
          >
            <div class="cursor-pointer p-2" @click="toggleTool('locate')">
              <svg
                class="h-5 w-5 fill-current stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 469.333 469.333"
              >
                <defs />
                <path
                  d="M234.667 149.333c-47.147 0-85.333 38.187-85.333 85.333S187.52 320 234.667 320 320 281.813 320 234.667s-38.187-85.334-85.333-85.334zm190.72 64C415.573 124.373 344.96 53.76 256 43.947V0h-42.667v43.947C124.373 53.76 53.76 124.373 43.947 213.333H0V256h43.947c9.813 88.96 80.427 159.573 169.387 169.387v43.947H256v-43.947C344.96 415.573 415.573 344.96 425.387 256h43.947v-42.667h-43.947zM234.667 384c-82.453 0-149.333-66.88-149.333-149.333s66.88-149.333 149.333-149.333S384 152.213 384 234.667 317.12 384 234.667 384z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </template>
  </common-map>
</template>

<script setup lang="ts">
  import type { Map, MapLibreEvent, MapMouseEvent } from 'maplibre-gl';
  import type { Basemap } from '~/types/map';
  import { Marker } from 'maplibre-gl';
  import {
    TerraDraw,
    TerraDrawCircleMode,
    TerraDrawMapLibreGLAdapter,
  } from 'terra-draw';
  import area from '@turf/area';
  import CommonMap from '@/components/map/CommonMap.vue';
  import Basemaps from '@/components/map/_partials/Basemaps.vue';

  const store = useMap();
  const restaurantStore = useRestaurant();
  onMounted(async () => {
    await store.getBasemaps();
  });
  let c = { lat: 0, lng: 0 };
  let map = markRaw({} as Map);
  let draw = markRaw({} as TerraDraw);
  const onMapLoaded = (m: MapLibreEvent): void => {
    map = m.target;
    draw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({
        map,
        coordinatePrecision: 9,
      }),
      modes: {
        circle: new TerraDrawCircleMode(),
      },
    });
    store.setLoaded(true);
  };
  const onMapTilesLoaded = (e: boolean) => {
    store.setTilesLoaded(e);
  };
  const onMapStyleLoaded = (e: boolean) => {
    store.setStyleChanged(e);
    console.log('style.load event: ', e);
  };
  const onMapClicked = (e: MapMouseEvent): void => {
    c = e.lngLat;
  };
  const mapZoomIn = () => {
    const currentZoom = map.getZoom();
    map.zoomTo(currentZoom + 1);
  };
  const mapZoomOut = () => {
    const currentZoom = map.getZoom();
    map.zoomTo(currentZoom - 1);
  };
  const mapEaseTo = ({
    pitch,
    bearing,
  }: {
    pitch: number;
    bearing: number;
  }) => {
    map.easeTo({
      pitch,
      bearing,
    });
  };
  const mapFlyTo = ({
    lng,
    lat,
    zoom = 15,
  }: {
    lng: number;
    lat: number;
    zoom: number;
  }) => {
    map.flyTo({
      center: [lng, lat],
      zoom,
      speed: 3,
      curve: 1,
    });
  };

  const updateBasemap = async (e: Basemap['style']) => {
    store.$patch((state) => {
      state.utils.basemaps.data.basemaps.forEach((basemap) => {
        if (basemap.style === e) {
          basemap.enabled = true;
        } else {
          basemap.enabled = false;
        }
      });
    });
    await store.setBasemaps();
    map.setStyle(e);
  };
  const setMapState = () => {
    const { lng, lat } = map.getCenter();
    store.setCenter([lng, lat]);
    store.setBearing(map.getBearing());
    store.setZoom(map.getZoom());
    store.setBounds(map.getBounds().toArray());
    store.setCoordinates({ lat, lng });
  };
  const toggleTool = (type: string) => {
    switch (type.toLowerCase()) {
      case 'aoi':
        if (draw.enabled) {
          draw.clear();
        }
        draw.start();
        draw.setMode('circle');
        draw.on('finish', () => {
          draw.setMode('static');
          const snapshots = draw.getSnapshot();
          const polygon = snapshots[snapshots.length - 1];
          const totalArea = area(polygon);
          const bound = Number(Math.sqrt(totalArea).toFixed(0));
          restaurantStore
            .getRestaurants({
              bound,
              lat: c.lat,
              long: c.lng,
            })
            .then(() => {
              for (
                let i = 0;
                i < restaurantStore.restaurants.data.length;
                i += 1
              ) {
                const coords = restaurantStore.restaurants.data[`${i}`];
                new Marker().setLngLat([coords.lat, coords.long]).addTo(map);
              }
            });
          store.setAoiWidgetShown(false);
        });
        store.toggleAoiWidget();
        break;
      case 'basemaps':
        store.toggleBasemapsWidget();
        break;
      case 'compass':
        store.toggleCompassWidget();
        mapEaseTo({ pitch: 0, bearing: 0 });
        break;
      case 'locate':
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            mapFlyTo({
              lng: pos.coords.longitude,
              lat: pos.coords.latitude,
              zoom: 15,
            });
          });
        }
        break;
      default:
        break;
    }
  };
</script>
