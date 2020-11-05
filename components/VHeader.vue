<template>
  <div
    class="flex items-center justify-between w-full h-20 px-4 border-b border-gray-300 dark:border-gray-700"
  >
    <h2 class="text-xl">
      <span class="mr-2 blinking-heart">❤️</span> Nuxt + Hasura with Mapbox-gl
    </h2>
    <select
      v-model="$colorMode.preference"
      class="w-32 px-4 text-base text-gray-800 bg-gray-200 border border-gray-700 rounded dark:text-gray-300 dark:bg-gray-900 form-select"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/composition-api';

  export default defineComponent({
    name: 'Header',
    setup() {
      const state = reactive({
        msg: 'Hasura + Nuxt + Mapbox',
      });
      return {
        state,
      };
    },
  });
</script>
