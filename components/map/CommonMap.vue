<template>
  <client-only>
    <suspense>
      <div ref="mapRef" id="map" class="h-full w-full">
        <slot />
      </div>
    </suspense>
  </client-only>
</template>
<script setup lang="ts">
  import maplibregl from 'maplibre-gl';
  import type {
    Map,
    MapLibreEvent,
    MapMouseEvent,
    MapOptions,
  } from 'maplibre-gl';

  const emit = defineEmits<{
    loaded: [e: MapLibreEvent];
    clicked: [e: MapMouseEvent];
    pitchended: [e: MapLibreEvent<MouseEvent | TouchEvent | undefined>];
    mousemoved: [e: MapMouseEvent];
    zoomended: [
      e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>,
    ];
    'tiles.loaded': [e: boolean];
    'style.loaded': [e: boolean];
    moveended: [e: boolean];
    touchended: [e: boolean];
    idled: [e: boolean];
  }>();
  const props = withDefaults(defineProps<{ options: MapOptions }>(), {
    options: {
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 0,
    },
  });

  const mapRef = templateRef<HTMLElement | null>('mapRef', null);
  let map = markRaw({} as Map);

  onMounted(() => {
    setTimeout(() => {
      map = new maplibregl.Map({
        ...props.options,
        container: mapRef.value || 'map',
      });
      map.on('load', onMapLoaded);
      map.on('click', onMapClicked);
      map.on('pitchend', onMapPitchEnd);
      map.on('mousemove', onMapMouseMove);
      map.on('zoomend', onMapZoomEnd);
    }, 200);
  });

  const onMapLoaded = (e: MapLibreEvent) => {
    emit('loaded', e);
    const events: string[] = [
      'moveend',
      'touchend',
      'style.load',
      'sourcedata',
      'sourcedataloading',
    ];
    events.forEach((event) => {
      e.target.on(event, () => {
        if (event === 'sourcedata' || event === 'sourcedataloading') {
          const waiting = () => {
            if (!e.target.areTilesLoaded()) {
              emit('tiles.loaded', false);
              setTimeout(waiting, 200);
            } else {
              emit('tiles.loaded', true);
            }
          };
          waiting();
        }
        if (event === 'style.load') {
          const waiting = () => {
            if (!e.target.isStyleLoaded()) {
              emit('style.loaded', false);
              setTimeout(waiting, 200);
            } else {
              emit('style.loaded', true);
            }
          };
          waiting();
        }
        if (['moveend', 'touchend', 'idle'].includes(event)) {
          emit('moveended', true);
          emit('touchended', true);
          emit('idled', true);
        }
      });
    });
  };
  const onMapClicked = (e: MapMouseEvent) => {
    emit('clicked', e);
  };
  const onMapPitchEnd = (
    e: MapLibreEvent<MouseEvent | TouchEvent | undefined>,
  ) => {
    emit('pitchended', e);
  };
  const onMapMouseMove = (e: MapMouseEvent) => {
    emit('mousemoved', e);
  };
  const onMapZoomEnd = (
    e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>,
  ) => {
    emit('zoomended', e);
  };
</script>
