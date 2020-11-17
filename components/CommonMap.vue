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
      <mgl-navigation-control position="top-right" />
      <mgl-geolocate-control position="top-left" />
      <mgl-fullscreen-control position="top-right" />
      <mgl-scale-control position="bottom-left" />
      <slot />
    </mgl-map>
  </client-only>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    shallowReadonly,
  } from '@nuxtjs/composition-api';
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

  export default defineComponent({
    components: {
      MglMap,
      MglNavigationControl,
      MglGeolocateControl,
      MglFullscreenControl,
      MglScaleControl,
    },
    setup(_, { emit }) {
      const state = reactive({
        mapOptions: {
          accessToken: process.env.mapToken,
          style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
          center: [77.607, 12.996],
          zoom: 12,
        },
        mapboxgl,
      });
      let map = shallowReadonly({} as mapboxgl.Map);
      const draw = new MapboxDraw({
        controls: {
          point: false,
          line_string: false,
          polygon: true,
          trash: true,
          combine_features: false,
          uncombine_features: false,
        },
      });
      async function mapLoaded(e: any) {
        map = e.map;
        // add draw control
        await map.addControl(draw, 'top-left');
        // Listen to draw events
        map.on('draw.create', async (e) => {
          const center = await centroid(e.features[0]);
          const longitude = center.geometry.coordinates[0];
          const latitude = center.geometry.coordinates[1];
          emit('draw-create', {
            event: e,
            coordinates: { latitude, longitude },
          });
        });

        map.on('draw.update', async (e) => {
          const center = await centroid(e.features[0]);
          const longitude = center.geometry.coordinates[0];
          const latitude = center.geometry.coordinates[1];
          emit('draw-update', {
            event: e,
            coordinates: { latitude, longitude },
          });
        });

        map.on('draw.delete', (e) => {
          emit('draw-delete', {
            event: e,
            coordinates: { latitude: 0, longitude: 0 },
          });
        });
      }

      return { state, mapLoaded };
    },
  });
</script>
