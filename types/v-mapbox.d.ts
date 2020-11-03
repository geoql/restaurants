declare module 'v-mapbox' {
  import Vue from 'vue';
  class MglMap extends Vue {}
  class MglNavigationControl extends Vue {}
  class MglGeolocateControl extends Vue {}
  class MglFullscreenControl extends Vue {}
  class MglScaleControl extends Vue {}
  export {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl,
  };
}
