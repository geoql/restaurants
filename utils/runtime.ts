import Vue from 'vue';
import { getCurrentInstance } from '@vue/composition-api';

export const getRuntimeVM = (): Vue => {
  const vm = getCurrentInstance()?.proxy;

  if (vm) return vm;

  throw new ReferenceError('[vue-hooks] Vue instance not found.');
};
