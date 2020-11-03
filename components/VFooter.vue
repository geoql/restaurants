<template>
  <div
    class="flex items-center justify-center w-full h-20 px-4 border-t border-gray-300 dark:border-gray-700"
  >
    <p class="text-sm">
      Made with <span class="blinking-heart">❤️</span> by
      <a href="https://vinayakkulkarni.dev">@Vinayak</a> &copy; {{ state.date }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/composition-api';

  export default defineComponent({
    name: 'Footer',
    setup() {
      const state = reactive({
        date: new Date().getFullYear(),
      });
      return {
        state,
      };
    },
  });
</script>
