<template>
  <div
    class="h-60 overflow-y-auto scroll-smooth p-2 space-y-2"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="options-menu"
  >
    <div
      v-for="basemap in data.basemaps"
      :key="basemap.type"
      class="select-none"
    >
      <div
        class="flex cursor-pointer items-center justify-between border-l border-l-2 rounded p-2 shadow hover:shadow-md"
        :class="{
          'text-white bg-gradient-to-l from-purple-600 to-purple-800':
            basemap.enabled,
          'text-gray-800 bg-gray-400 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-100':
            !basemap.enabled,
          'border-black': basemap.source === 'carto',
          'border-blue-500': basemap.source === 'mapbox',
          'border-yellow-500': basemap.source === 'aws',
        }"
        @click="updateBasemap(basemap)"
      >
        <div class="w-1/6">
          <img
            class="h-12 rounded-lg object-cover"
            :src="`/images/basemaps/${basemap.image}.webp`"
          />
        </div>
        <div class="prose-sm w-auto">
          {{ basemap.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Basemap, Basemaps } from '~/types/map';

  defineProps<{
    data: Basemaps;
  }>();
  const emit = defineEmits<{
    update: [style: Basemap['style']];
  }>();

  const updateBasemap = (basemap: Basemap): void => {
    if (!basemap.enabled) {
      emit('update', basemap.style);
    }
  };
</script>
