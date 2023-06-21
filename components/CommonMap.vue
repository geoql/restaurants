<template>
  <client-only>
    <mgl-map
      :mapbox-gl="state.mapboxgl"
      :access-token="state.mapOptions.accessToken"
      :map-style.sync="state.mapOptions.style"
      :center="state.mapOptions.center"
      :zoom="state.mapOptions.zoom"
      :max-zoom="state.mapOptions.maxZoom"
      :cross-source-collisions="false"
      :fail-if-major-performance-caveat="false"
      :preserve-drawing-buffer="true"
      :hash="false"
      @load="mapLoaded"
    >
      <mgl-navigation-control position="bottom-right" />
      <mgl-fullscreen-control position="bottom-right" />
      <mgl-geolocate-control position="bottom-right" />
      <mgl-scale-control position="bottom-left" />
      <slot />
      <div class="absolute top-0 right-0 m-2">
        <div
          v-click-outside="() => (state.basemaps.shown = false)"
          class="relative flex items-center justify-center text-sm text-gray-800 bg-white rounded-md dark:bg-gray-700 dark:text-white"
          title="Basemaps"
          :class="{
            'dark:bg-gray-800 bg-gray-200': state.basemaps.shown,
            'hover:bg-gray-200 hover:dark:bg-gray-800 ': !state.basemaps.shown,
          }"
        >
          <div
            class="p-3 cursor-pointer"
            @click="state.basemaps.shown = !state.basemaps.shown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 54.953 54.953"
              class="w-6 h-6 fill-current"
            >
              <defs />
              <circle cx="45.021" cy="25.976" r="1" />
              <circle cx="9.021" cy="25.976" r="1" />
              <circle cx="12.021" cy="28.976" r="1" />
              <circle cx="18.021" cy="28.976" r="1" />
              <circle cx="15.021" cy="31.976" r="1" />
              <circle cx="21.021" cy="31.976" r="1" />
              <circle cx="24.021" cy="34.976" r="1" />
              <circle cx="30.021" cy="34.976" r="1" />
              <circle cx="33.021" cy="31.976" r="1" />
              <circle cx="27.021" cy="37.976" r="1" />
              <circle cx="36.021" cy="28.976" r="1" />
              <circle cx="42.021" cy="28.976" r="1" />
              <circle cx="39.021" cy="31.976" r="1" />
              <path
                d="M45.559 32.796l9.394-5.367-9.656-5.483 9.656-5.517L27.477.826 0 16.429l9.656 5.517L0 27.429l9.656 5.517L0 38.429l27.477 15.698 27.477-15.698-9.656-5.483.071-.041c.07-.026.128-.068.19-.109zM27.477 3.125l23.436 13.309-7.637 4.364-15.798 9.026-23.437-13.39L27.477 3.125zM11.129 23.409c.162.333.497.567.892.567.27 0 .512-.109.692-.283l2.262 1.292c-.53.025-.954.455-.954.991 0 .552.448 1 1 1s1-.448 1-1c0-.173-.055-.327-.132-.469l10.33 5.902c-.116.163-.198.352-.198.567 0 .552.448 1 1 1s1-.448 1-1c0-.051-.021-.094-.029-.143l10.052-5.743c.059.496.465.885.977.885.552 0 1-.448 1-1 0-.325-.165-.601-.406-.783l2.202-1.258c.068.015.132.041.204.041.444 0 .807-.294.938-.694l.32-.183 7.634 4.335-1.983 1.133c-.157-.347-.503-.591-.908-.591-.552 0-1 .448-1 1 0 .216.083.405.199.568l-3.945 2.254-6.388 3.65c.078-.142.134-.298.134-.472 0-.552-.448-1-1-1s-1 .448-1 1c0 .537.426.967.957.991l-2.263 1.293c-.18-.174-.423-.284-.694-.284-.552 0-1 .448-1 1 0 .08.028.151.046.226l-4.59 2.622-5.517-3.152c-.13-.401-.494-.696-.939-.696-.073 0-.138.027-.206.042l-2.201-1.257c.241-.183.407-.458.407-.784 0-.552-.448-1-1-1-.512 0-.919.391-.977.887L6.991 29.12c.007-.049.029-.093.029-.144 0-.552-.448-1-1-1-.239 0-.449.095-.621.235l-1.359-.776 7.089-4.026zm39.783 15.025l-23.436 13.39-23.435-13.39 7.633-4.335 15.803 9.028 15.802-9.028 7.633 4.335z"
              />
            </svg>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-class="transform scale-95 translate-x-4 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in translate-x-4"
            leave-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="state.basemaps.shown"
              class="absolute top-0 right-0 mr-16 origin-right bg-gray-100 rounded-md shadow-lg dark:bg-gray-700"
            >
              <basemaps
                :data="state.basemaps.data"
                @update-map-style="updateBasemap"
                @close="state.basemaps.shown = false"
              />
            </div>
          </transition>
        </div>
      </div>
    </mgl-map>
  </client-only>
</template>

<script lang="ts">
  import { defineComponent, reactive, shallowReadonly, watch } from 'vue';
  import {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl,
  } from 'v-mapbox';
  import mapboxgl from 'mapbox-gl';
  import MapboxDraw from '@mapbox/mapbox-gl-draw';
  import centroid from '@turf/centroid';
  import { Feature, Polygon } from 'geojson';

  export default defineComponent({
    components: {
      MglMap,
      MglNavigationControl,
      MglGeolocateControl,
      MglFullscreenControl,
      MglScaleControl,
      Basemaps: () =>
        import(
          /* webpackChunkName: "BasemapsComponent" */ '@/components/_partials/Basemaps.vue'
        ),
    },
    props: {
      draw: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    setup(props, { emit }) {
      const { $config } = getRuntimeVM();
      const state = reactive({
        mapOptions: {
          accessToken: $config.mapToken,
          style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
          center: [77.607, 12.996],
          zoom: 12,
          maxZoom: 22,
        },
        mapboxgl,
        basemaps: {
          shown: false as boolean,
          data: {
            title: 'Basemaps',
            basemaps: [
              {
                type: 'Streets',
                enabled: false,
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
              },
              {
                type: 'Satellite',
                enabled: false,
                style:
                  'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
              },
              {
                type: 'Dark',
                enabled: true,
                style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
              },
            ],
          },
        },
      });
      let map = shallowReadonly({} as mapboxgl.Map);
      let draw: MapboxDraw | null = null;

      watch(
        () => props.draw,
        (newVal: boolean) => {
          if (newVal) {
            addDrawControl();
          } else {
            removeDrawControl();
          }
        },
      );

      /**
       *
       * @param e
       */
      function mapLoaded(e: any): void {
        map = e.map;
        emit('map-load', true);
        emit('style-changed', true);
        // Listen to draw events
        map.on('draw.create', async (e: { features: [Feature<Polygon>] }) => {
          const center = await centroid(e.features[0]);
          const longitude = center.geometry.coordinates[0];
          const latitude = center.geometry.coordinates[1];
          emit('draw-create', {
            event: e,
            center: { latitude, longitude },
          });
          removeDrawControl();
        });
        /**
         * This is required because we want
         * to persist the layers on the map
         * even after the basemap is changed
         */
        map.on('style.load', () => {
          const waiting = () => {
            if (!map.isStyleLoaded()) {
              emit('style-changed', false);
              setTimeout(waiting, 200);
            } else {
              emit('style-changed', true);
            }
          };
          waiting();
        });
      }

      /**
       *
       * @param e
       */
      function updateBasemap(e: string): void {
        state.basemaps.data.basemaps.forEach((basemap) => {
          if (basemap.style === e) {
            basemap.enabled = true;
          } else {
            basemap.enabled = false;
          }
        });
        map.setStyle(e);
      }

      /**
       * Add Draw Control
       * @returns void
       */
      async function addDrawControl(): Promise<void> {
        draw = new MapboxDraw({
          displayControlsDefault: false,
          defaultMode: 'draw_polygon',
        });
        await map.addControl(draw, 'top-left');
      }

      /**
       * Removes Draw Control
       * @returns void
       */
      function removeDrawControl(): void {
        if (draw !== null && Object.entries(draw).length !== 0) {
          map.removeControl(draw);
          draw = null;
        }
      }

      return { state, mapLoaded, updateBasemap };
    },
  });
</script>
