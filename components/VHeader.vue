<template>
  <div
    class="flex items-center justify-between w-full h-20 px-4 border-b border-gray-300 dark:border-gray-700"
  >
    <div title="Nuxt, Hasura & Mapbox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="4.667 25.98 490.667 448.039"
        class="w-5 h-5 transition-colors duration-300 cursor-pointer"
        @click="$router.push({ name: 'index' })"
      >
        <defs />
        <defs>
          <linearGradient
            id="a"
            x1="250.001"
            x2="250.001"
            y1="25.98"
            y2="474.019"
            gradientTransform="matrix(.99999 -.00512 .00382 .7459 -.485729 120.841469)"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              :stop-color="
                $colorMode.preference !== 'light' ? '#8139df' : '#c3c3c3'
              "
            />
            <stop
              offset="1"
              :stop-color="
                $colorMode.preference !== 'light' ? '#8d2971' : '#000'
              "
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          d="M242.448 470.885L7.782 236.218c-2-2.004-3.12-4.721-3.115-7.552v-192c-.011-5.891 4.757-10.675 10.648-10.686 2.84-.005 5.565 1.123 7.571 3.134L250.001 256.25 477.115 29.114c4.16-4.171 10.914-4.179 15.085-.019 2.011 2.006 3.139 4.731 3.134 7.571v192c.005 2.831-1.115 5.548-3.115 7.552L257.552 470.885c-4.16 4.171-10.914 4.179-15.085.019-.006-.007-.012-.013-.019-.019z"
          paint-order="fill"
        />
      </svg>
    </div>
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
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'Header',
  });
</script>
