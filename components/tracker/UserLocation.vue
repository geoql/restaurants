<script setup lang="ts">
  import type { StyleImageInterface, Map } from 'maplibre-gl';
  import { VLayerMaplibreGeojson } from '~/lib/v-mapbox';

  const props = defineProps<{ map: Map }>();
  const store = useMap();

  const size = 100;
  const pulsingDot: StyleImageInterface = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    // get rendering context for the map canvas when layer is added to the map
    onAdd() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      // @ts-ignore
      this.context = canvas.getContext('2d');
    },
    // called once before every frame where the icon will be used
    render() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      // @ts-ignore
      const context = this.context;

      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
      context.fill();

      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 100, 100, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // continuously repaint the map, resulting in the smooth animation of the dot
      props.map.triggerRepaint();

      // return `true` to let the map know that the image was updated
      return true;
    },
  };
  props.map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
</script>

<template>
  <v-layer-maplibre-geojson
    :sourceId="`geolocated-user-circle`"
    :layerId="`geolocated-user-circle`"
    :source="store.layers[0].data.source"
    :layer="store.layers[0].data.layer"
  />
  <v-layer-maplibre-geojson
    :sourceId="`geolocated-user-buffer`"
    :layerId="`geolocated-user-buffer`"
    :source="store.layers[1].data.source"
    :layer="store.layers[1].data.layer"
  />
</template>
