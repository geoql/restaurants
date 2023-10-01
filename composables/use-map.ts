import type {
  FillLayerSpecification,
  GeoJSONSourceSpecification,
  MapOptions,
  SymbolLayerSpecification,
} from 'maplibre-gl';
import type { Feature } from 'geojson';
import type { Basemaps } from '~/types/map';
import { defineStore } from 'pinia';

/**
 * Map Store
 */
export const useMap = defineStore({
  id: 'map',
  state: () => ({
    ui: {
      loaded: false,
      styleChanged: false,
      tilesLoaded: false,
      errors: {
        shown: false,
        data: [] as string[],
      },
    },
    map: {
      state: {
        latitude: 0,
        longitude: 0,
        bbox: [] as number[][],
        center: [] as number[],
        zoom: 0,
      },
      options: {
        container: 'map',
        center: [73.8567, 18.5204] as number[],
        zoom: 11,
        maxZoom: 22,
        hash: false,
        crossSourceCollisions: false,
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: true,
        attributionControl: false,
        trackResize: true,
        minPitch: 0,
        maxPitch: 85,
      } as MapOptions,
      controls: {
        attribution: {
          shown: true,
        },
        scale: {
          shown: true,
        },
      },
    },
    utils: {
      basemaps: {
        shown: false,
        data: {
          id: useUuid(),
          title: 'Basemaps',
          basemaps: [],
        } as Basemaps,
      },
      aoi: {
        shown: false,
      },
      compass: {
        shown: false,
        data: {
          bearing: 0,
        },
      },
      geolocate: {
        shown: false,
        loading: false,
        data: {
          center: [] as number[],
          circle: null as null | Feature,
          timestamp: 0,
        },
      },
    },
  }),
  getters: {
    style: (state) => {
      const basemap = state.utils.basemaps.data.basemaps.find(
        (basemap) => basemap.enabled,
      );
      return basemap?.style;
    },
    loaded: (state): boolean => {
      return (
        state.utils.basemaps.data.basemaps.length > 0 &&
        (state.ui.loaded || state.ui.styleChanged || state.ui.tilesLoaded)
      );
    },
    layers: (state) => [
      {
        id: 'geolocated-user-circle',
        data: {
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: state.utils.geolocate.data.center,
                  },
                },
              ],
            },
          } as GeoJSONSourceSpecification,
          layer: {
            id: 'geolocated-user-circle',
            type: 'symbol',
            source: 'geolocated-user-circle',
            layout: {
              'icon-image': 'pulsing-dot',
            },
          } as SymbolLayerSpecification,
        },
      },
      {
        id: 'geolocated-user-buffer',
        data: {
          source: {
            type: 'geojson',
            data: state.utils.geolocate.data.circle,
          } as GeoJSONSourceSpecification,
          layer: {
            id: 'geolocated-user-buffer',
            type: 'fill',
            source: 'geolocated-user-buffer',
            layout: {},
            paint: {
              'fill-color': '#F88',
              'fill-opacity': 0.25,
            },
          } as FillLayerSpecification,
        },
      },
    ],
  },
  actions: {
    setLoaded(loaded: boolean) {
      this.ui.loaded = loaded;
    },
    setStyleChanged(styleChanged: boolean): void {
      this.ui.styleChanged = styleChanged;
    },
    setTilesLoaded(loaded: boolean): void {
      this.ui.tilesLoaded = loaded;
    },
    setCoordinates(coords: { lng: number; lat: number }): void {
      this.map.state.longitude = coords.lng;
      this.map.state.latitude = coords.lat;
    },
    setZoom(zoom: number): void {
      this.map.state.zoom = zoom;
    },
    setCenter(center: number[]): void {
      this.map.state.center = center;
    },
    setBounds(bounds: number[][]): void {
      this.map.state.bbox = bounds;
    },
    setBearing(bearing: number): void {
      this.utils.compass.data.bearing = bearing;
    },
    setAoiWidgetShown(shown: boolean): void {
      this.utils.aoi.shown = shown;
    },
    toggleAoiWidget(): void {
      this.utils.aoi.shown = !this.utils.aoi.shown;
      this.utils.basemaps.shown = false;
    },
    toggleBasemapsWidget(): void {
      this.utils.basemaps.shown = !this.utils.basemaps.shown;
    },
    toggleCompassWidget(): void {
      this.utils.compass.shown = !this.utils.compass.shown;
      this.utils.compass.data.bearing = 0;
      this.utils.compass.shown = false;
    },
    setGeolocateWidgetLoading(loading: boolean): void {
      this.utils.geolocate.loading = loading;
    },
    setGeolocateWidgetCircle(circle: Feature): void {
      this.utils.geolocate.data.circle = circle;
    },
    setGeolocateWidgetCenter(center: number[], timestamp: number): void {
      this.utils.geolocate.data.center = center;
      this.utils.geolocate.data.timestamp = timestamp;
    },
    async getBasemaps(): Promise<void> {
      const db = await useIdb();
      const basemaps = await db.getAll('basemaps');
      const runtimeConfig = useRuntimeConfig();
      if (basemaps.length) {
        // @ts-ignore
        this.utils.basemaps.data = basemaps[0];
      } else {
        this.utils.basemaps.data.basemaps.push(
          {
            id: useUuid(),
            type: 'Dark (Carto)',
            enabled: true,
            image: 'dark',
            source: 'carto',
            style:
              'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
          },
          {
            id: useUuid(),
            type: 'Light (Carto)',
            enabled: false,
            image: 'streets',
            source: 'carto',
            style:
              'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          },
          {
            id: useUuid(),
            type: 'Dark Std (AWS)',
            enabled: false,
            image: 'dark',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-standard-dark/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
          {
            id: useUuid(),
            type: 'Light Std (AWS)',
            enabled: false,
            image: 'streets',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-standard-light/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
          {
            id: useUuid(),
            type: 'Dark Viz (AWS)',
            enabled: false,
            image: 'dark',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-visualization-dark/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
          {
            id: useUuid(),
            type: 'Light Viz (AWS)',
            enabled: false,
            image: 'streets',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-visualization-light/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
        );
        await this.setBasemaps();
      }
    },
    async setBasemaps(): Promise<void> {
      const db = await useIdb();
      db.put('basemaps', JSON.parse(JSON.stringify(this.utils.basemaps.data)));
    },
  },
});
