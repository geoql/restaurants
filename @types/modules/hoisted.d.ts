/* eslint-disable */
// @ts-nocheck
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface ColorMode {
    preference: string;
  }

  interface Vue {
    $colorMode: ColorMode;
    $apollo: any;
  }
}
