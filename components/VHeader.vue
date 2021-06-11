<template>
  <div
    class="
      flex
      items-center
      justify-between
      w-full
      h-20
      px-4
      border-b border-gray-300
      dark:border-gray-700
    "
  >
    <div title="Nuxt, Hasura & Mapbox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transition-colors duration-300 cursor-pointer"
        viewBox="-6 -6 512 512"
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
            gradientTransform="matrix(1.04346 -.00585 .00399 .85238 -11.37663 102.403059)"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              :stop-color="
                $colorMode.preference !== 'light' ? '#8139df' : '#9f7aea'
              "
            />
            <stop
              offset="1"
              :stop-color="
                $colorMode.preference !== 'light' ? '#8d2971' : '#553c9a'
              "
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          d="M242.119 502.419L-2.75 234.251c-2.087-2.29-3.255-5.395-3.25-8.63V6.211C-6.012-.521-1.036-5.988 5.111-6c2.963-.006 5.807 1.283 7.9 3.581L250 257.143 486.989-2.419c4.341-4.766 11.388-4.776 15.741-.022 2.098 2.293 3.275 5.407 3.27 8.652v219.41c.005 3.235-1.163 6.34-3.25 8.63L257.88 502.419c-4.341 4.766-11.388 4.776-15.741.022-.006-.008-.013-.015-.02-.022z"
          paint-order="fill"
        />
      </svg>
    </div>
    <select
      v-model="$colorMode.preference"
      class="
        w-32
        px-4
        text-base text-gray-800
        bg-gray-200
        border border-gray-700
        rounded
        dark:text-gray-300 dark:bg-gray-900
        form-select
      "
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
