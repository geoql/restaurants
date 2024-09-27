<script setup lang="ts">
  import type { Ref } from 'vue';
  import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
  import { injectStrict, MapKey } from '../../../utils';
  import type { Props } from './types';

  const props = withDefaults(defineProps<Props>(), {
    sourceId: 'maplibre.gl-geojson-source',
    layerId: 'maplibre.gl-geojson-layer',
    // source: {} as GeoJSONSourceSpecification,
    // layer: {} as LayerSpecification,
    before: '',
  });
  const map = injectStrict(MapKey);
  const loaded: Ref<boolean> = ref(false);

  const layer = {
    ...props.layer,
    id: props.layerId,
    source: props.sourceId,
  };

  map.value.on('style.load', () => {
    // https://github.com/mapbox/mapbox-gl-js/issues/2268#issuecomment-401979967
    const styleTimeout = () => {
      if (!map.value.isStyleLoaded()) {
        loaded.value = false;
        setTimeout(styleTimeout, 200);
      } else {
        loaded.value = true;
      }
    };
    styleTimeout();
  });

  watch(loaded, (value) => {
    if (value) {
      addLayer();
    }
  });

  onMounted(() => {
    addLayer();
  });

  onBeforeUnmount(() => {
    if (map.value.getLayer(props.layer.id)) {
      map.value.removeLayer(props.layer.id);
      map.value.removeSource(props.sourceId);
    }
  });

  const addLayer = (): void => {
    map.value.addSource(layer.source, props.source);
    map.value.addLayer(layer, props.before);
  };
</script>

<template>
  <slot></slot>
</template>
