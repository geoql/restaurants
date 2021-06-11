import { NuxtOptionsBuild } from '@nuxt/types/config/build';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';

const build: NuxtOptionsBuild = {
  corejs: 3,
  extend(config: NuxtRuntimeConfig, { isDev, isClient }) {
    config.node = {
      fs: 'empty',
    };
    if (isDev && isClient) {
      config.devtool = 'source-map';
    }
  },
  babel: {
    babelrc: false,
    presets() {
      return [
        '@babel/preset-typescript',
        '@babel/preset-env',
        ['@nuxt/babel-preset-app', { corejs: { version: 3 } }],
      ];
    },
  },
  terser: {
    cache: true,
    parallel: true,
    sourceMap: true,
    terserOptions: {
      ecma: 2020,
      mangle: true,
      module: true,
      sourceMap: true,
    },
  },
};

export default build;
