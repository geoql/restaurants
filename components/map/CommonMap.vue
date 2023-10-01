<template>
  <client-only>
    <v-map
      :options="{ ...store.map.options, style: store.style! }"
      @loaded="onMapLoaded"
      @click="onMapClicked"
      @pitchend="onMapPitchEnd"
      @mousemove="onMapMouseMove"
      @zoomend="onMapZoomEnd"
    >
      <template v-if="store.loaded">
        <!-- Map :: Default Controls -->
        <v-control-attribution
          v-if="store.map.controls.attribution.shown"
          position="bottom-right"
          :options="{ compact: true }"
        />
        <v-control-scale
          v-if="store.map.controls.scale.shown"
          position="bottom-left"
        />

        <!-- Map :: Default Slot -->
        <slot />

        <!-- Map :: Top Left Slot -->
        <div
          class="invisible absolute left-0 top-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 dark:text-white"
        >
          <div class="relative flex flex-col space-y-2">
            <slot name="tools-tl" class="visible" />
          </div>
        </div>
        <!-- Map :: Top Right Slot -->
        <div
          class="invisible absolute right-0 top-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 dark:text-white"
        >
          <div class="relative flex flex-col space-y-2">
            <!-- Basemaps -->
            <div
              v-click-outside="() => (store.utils.basemaps.shown = false)"
              class="visible relative h-10 w-10 border border-stone-100 rounded-md bg-stone-200 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-800 hover:bg-stone-300 dark:text-white dark:hover:bg-stone-800"
              title="Basemaps"
              :class="{
                'bg-stone-300 dark:bg-stone-800': store.utils.basemaps.shown,
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
            <slot name="tools-tr" class="visible" />
          </div>
        </div>
        <!-- Map :: Bottom Left Slot -->
        <div
          class="invisible absolute bottom-12 left-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 dark:text-white"
        >
          <div class="relative flex flex-col space-y-2">
            <slot name="tools-bl" class="visible" />
          </div>
        </div>
        <!-- Map :: Bottom Right Slot -->
        <div
          class="invisible absolute bottom-12 right-0 z-10 m-2 rounded-md bg-opacity-50 text-stone-800 dark:text-white"
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
              @click="toggleTool('geolocate')"
            >
              <div class="cursor-pointer p-2">
                <svg
                  class="h-5 w-5 stroke-current"
                  :class="{
                    'fill-blue-400 animate-spin animate-duration-1500':
                      store.utils.geolocate.loading,
                    'fill-current':
                      !store.utils.geolocate.loading &&
                      store.utils.geolocate.data.center.every(
                        (value, index) =>
                          value.toFixed(4) !==
                          store.map.state.center[index].toFixed(4),
                      ),
                    'fill-blue-400':
                      !store.utils.geolocate.loading &&
                      store.utils.geolocate.data.center.every(
                        (value, index) =>
                          value.toFixed(4) ===
                          store.map.state.center[index].toFixed(4),
                      ),
                  }"
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

        <!-- Map :: Layers Slot -->
        <slot name="layers" />
      </template>
    </v-map>
    <template #fallback>
      <!-- this will be rendered on server side -->
      <p>Loading map...</p>
    </template>
  </client-only>
</template>

<script setup lang="ts">
  import type { Map, MapMouseEvent, StyleSpecification } from 'maplibre-gl';
  import { VControlScale, VControlAttribution, VMap } from '~/lib/v-mapbox';
  import Basemaps from './_partials/Basemaps.vue';

  const emit = defineEmits<{
    loaded: [Map];
    clicked: [MapMouseEvent];
    geolocated: [];
  }>();

  const store = useMap();
  let map = markRaw({} as Map);

  const onMapLoaded = (e: Map) => {
    map = e;
    syncMap();
  };

  const syncMap = () => {
    const events: string[] = [
      'moveend',
      'touchend',
      'style.load',
      'sourcedata',
      'sourcedataloading',
    ];
    events.forEach((event) => {
      map.on(event, () => {
        if (event === 'sourcedata' || event === 'sourcedataloading') {
          const waiting = () => {
            if (!map.areTilesLoaded()) {
              store.setTilesLoaded(false);
              setTimeout(waiting, 200);
            } else {
              store.setTilesLoaded(true);
            }
          };
          waiting();
        }
        if (event === 'style.load') {
          const waiting = () => {
            if (!map.isStyleLoaded()) {
              store.setStyleChanged(false);
              setTimeout(waiting, 200);
            } else {
              store.setStyleChanged(true);
            }
          };
          waiting();
        }
        if (['moveend', 'touchend', 'idle'].includes(event)) {
          setMapState();
        }
      });
    });
    store.setStyleChanged(true);
    store.setTilesLoaded(true);
    store.setLoaded(true);
    emit('loaded', map);
    setMapState();
  };

  const onMapMouseMove = (e: MapMouseEvent | MouseEvent) => {
    if (e instanceof MouseEvent) {
      return;
    } else {
      const { lat, lng } = e.lngLat;
      store.setCoordinates({ lat, lng });
    }
  };
  const onMapClicked = (e: MapMouseEvent | PointerEvent) => {
    if (e instanceof MouseEvent) {
      return;
    } else {
      emit('clicked', e);
    }
  };
  const onMapPitchEnd = () => {
    const bearing = parseInt(map.getBearing().toFixed(), 10);
    store.setBearing(bearing);
  };
  const onMapZoomEnd = () => {
    store.setZoom(map.getZoom());
  };
  const mapZoomIn = () => {
    if (map !== null) {
      const currentZoom = map.getZoom();
      map.zoomTo(currentZoom + 1);
      setMapState();
    }
  };
  const mapZoomOut = () => {
    if (map !== null) {
      const currentZoom = map.getZoom();
      map.zoomTo(currentZoom - 1);
      setMapState();
    }
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
  const updateBasemap = async (e: string | StyleSpecification) => {
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

  const toggleTool = (type: string) => {
    switch (type) {
      case 'basemaps':
        store.toggleBasemapsWidget();
        break;
      case 'compass':
        store.toggleCompassWidget();
        mapEaseTo({ pitch: 0, bearing: 0 });
        break;
      case 'geolocate':
        if (navigator && navigator.geolocation) {
          store.setGeolocateWidgetLoading(true);
          navigator.geolocation.getCurrentPosition(
            getUserPosition,
            getUserPositionError,
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            },
          );
        }
        break;
      default:
        break;
    }
  };

  const getUserPosition = ({ coords: c, timestamp }: GeolocationPosition) => {
    let coords: number[] = [];
    coords = [c.longitude, c.latitude];
    mapFlyTo({ lng: coords[0], lat: coords[1], zoom: 15 });
    store.setGeolocateWidgetCenter(coords, timestamp);
    store.setCenter(coords);
    store.setGeolocateWidgetLoading(false);
    emit('geolocated');
  };
  const getUserPositionError = (e: GeolocationPositionError) => {
    store.setGeolocateWidgetCenter([], 0);
    store.setGeolocateWidgetLoading(false);
    console.error(e);
  };

  const setMapState = () => {
    const { lng, lat } = map.getCenter();
    store.setCenter([lng, lat]);
    store.setZoom(map.getZoom());
    store.setBounds(map.getBounds().toArray());
    store.setBearing(Number(map.getBearing().toFixed(0)));
    store.setCoordinates({ lat, lng });
  };
</script>
