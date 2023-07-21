<template>
  <div
    class="h-screen min-w-screen w-screen flex flex-col select-none overflow-hidden bg-stone-100 text-stone-800 transition-colors duration-200 ease-linear dark:bg-stone-900 dark:text-stone-100"
  >
    <!-- Header -->
    <header>
      <v-header />
    </header>
    <!-- Body -->
    <main class="flex-1 overflow-y-auto">
      <div class="h-full flex items-center justify-center">
        <slot />
      </div>
    </main>
    <!-- Footer -->
    <footer>
      <v-footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
  import VHeader from '~/components/common/ui/VHeader.vue';
  import VFooter from '~/components/common/ui/VFooter.vue';
</script>
