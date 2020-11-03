<template>
  <div class="flex items-center justify-center h-screen">
    <h1>{{ state.msg }}</h1>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/composition-api';

  export default defineComponent({
    name: 'IndexPage',
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
