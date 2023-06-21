<template>
  <main
    class="w-screen h-screen text-gray-900 transition-colors duration-150 bg-gray-100 dark:text-gray-100 dark:bg-gray-900"
  >
    <v-header />
    <nuxt-page class="py-10 -my-10" />
    <v-footer />
  </main>
</template>

<script setup lang="ts">
  import VHeader from '~/components/VHeader.vue';
  import VFooter from '~/components/VFooter.vue';
</script>
