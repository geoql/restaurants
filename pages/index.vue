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
      >
        <mgl-navigation-control position="top-right" />
        <mgl-geolocate-control position="top-left" />
        <mgl-fullscreen-control position="top-right" />
        <mgl-scale-control position="bottom-left" />
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
      </mgl-map>
    </client-only>
  </div>
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
    MglMarker,
    MglPopup,
  } from 'v-mapbox';
  import MapboxDraw from '@mapbox/mapbox-gl-draw';
  import mapboxgl from 'mapbox-gl';
  import centroid from '@turf/centroid';

  import { fetchRestaurants } from '@/gql/fetchRestaurants';
  import { useApollo } from '@/plugins/apollo';

  let latitude = 0;
  let longitude = 0;

  export default defineComponent({
    name: 'IndexPage',
    apollo: {
      restaurants: {
        query: fetchRestaurants,
        variables: {
          bound: 500,
          lat: latitude,
          long: longitude,
        },
        update(data: any) {
          return data.get_nearby_restaurants;
        },
      },
    },
    components: {
      MglMap,
      MglNavigationControl,
      MglGeolocateControl,
      MglFullscreenControl,
      MglScaleControl,
      MglMarker,
      MglPopup,
    },
    setup() {
      const $apollo = useApollo();
      let map = shallowReadonly({} as mapboxgl.Map);
      const state = reactive({
        mapOptions: {
          accessToken: process.env.mapToken,
          style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
          center: [77.607, 12.996],
          zoom: 12,
        },
        mapboxgl,
        loading: false,
      });
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

      function mapLoaded(e: any) {
        map = e.map;
        // add draw control
        map.addControl(draw, 'top-left');
        map.on('draw.create', refetchRestaurants);
        map.on('draw.update', refetchRestaurants);
        map.on('draw.delete', refetchRestaurants);
      }
      async function refetchRestaurants(e: any) {
        if (e.type !== 'draw.delete') {
          const center = await centroid(e.features[0]);
          latitude = center.geometry.coordinates[1];
          longitude = center.geometry.coordinates[0];
          await $apollo.queries.restaurants.setVariables({
            bound: 500,
            lat: latitude,
            long: longitude,
          });
        } else {
          await $apollo.queries.restaurants.setVariables({
            bound: 500,
            lat: 0,
            long: 0,
          });
        }
        await $apollo.queries.restaurants.refetch();
      }
      return {
        state,
        mapLoaded,
      };
    },
  });
</script>

<style>
  .mapboxgl-popup-content {
    background: #c3c3c3;
  }
</style>
