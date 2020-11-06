<template>
  <div class="w-full h-full pt-20 pb-20">
    <client-only>
      <mgl-map
        :class="{ 'opacity-75': state.loading }"
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
        @click="mapClicked"
      >
        <mgl-navigation-control position="top-right" />
        <mgl-geolocate-control position="top-left" />
        <mgl-fullscreen-control position="top-right" />
        <mgl-scale-control position="bottom-left" />
        <slot />
      </mgl-map>
    </client-only>
  </div>
</template>

<script lang="ts">
  /* eslint-disable no-console */
  import {
    defineComponent,
    reactive,
    shallowReadonly,
  } from '@vue/composition-api';
  import {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl,
  } from 'v-mapbox';
  import MapboxDraw from '@mapbox/mapbox-gl-draw';
  import mapboxgl from 'mapbox-gl';

  export default defineComponent({
    name: 'IndexPage',
    components: {
      MglMap,
      MglNavigationControl,
      MglGeolocateControl,
      MglFullscreenControl,
      MglScaleControl,
    },
    setup() {
      const state = reactive({
        mapOptions: {
          accessToken: process.env.mapToken,
          style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
          center: [78.96, 20.59],
          zoom: 4,
        },
        mapboxgl,
        loading: false,
      });
      let map = shallowReadonly({} as mapboxgl.Map);
      const draw = new MapboxDraw();
      function mapLoaded(e: any) {
        map = e.map;
        // add draw control
        map.addControl(draw, 'top-left');
      }
      function mapClicked(e: object) {
        console.log('e', e);
      }
      return {
        state,
        mapLoaded,
        mapClicked,
      };
    },
  });
</script>
