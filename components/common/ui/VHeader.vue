<template>
  <div
    class="h-10 w-full flex items-center justify-between border-b border-stone-300 px-4 shadow dark:border-stone-700"
  >
    <div title="Dashboard" class="visible">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 cursor-pointer fill-current transition-colors duration-300"
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
            <stop offset="0" :stop-color="isDark ? '#8139df' : '#9f7aea'" />
            <stop offset="1" :stop-color="isDark ? '#8d2971' : '#553c9a'" />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          d="M242.119 502.419L-2.75 234.251c-2.087-2.29-3.255-5.395-3.25-8.63V6.211C-6.012-.521-1.036-5.988 5.111-6c2.963-.006 5.807 1.283 7.9 3.581L250 257.143 486.989-2.419c4.341-4.766 11.388-4.776 15.741-.022 2.098 2.293 3.275 5.407 3.27 8.652v219.41c.005 3.235-1.163 6.34-3.25 8.63L257.88 502.419c-4.341 4.766-11.388 4.776-15.741.022-.006-.008-.013-.015-.02-.022z"
          paint-order="fill"
        />
      </svg>
    </div>
    <div class="flex items-center space-x-2">
      <div class="text-sm">
        <span>
          {{ mapStore.$state.map.state.zoom.toFixed(2) }}
        </span>
        <span class="opacity-75">
          [{{ mapStore.$state.map.state.latitude.toFixed(2) }},
          {{ mapStore.$state.map.state.longitude.toFixed(2) }}]
        </span>
      </div>
      <div tile="Theme Picker" class="visible">
        <svg
          v-if="!isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer outline-none"
          viewBox="0 0 24 24"
          @click="toggleDark()"
        >
          <path
            fill="currentColor"
            d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"
          />
        </svg>
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer outline-none"
          viewBox="0 0 512 512"
          @click="toggleDark()"
        >
          <path
            fill="currentColor"
            d="M256 387c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4v-46.2c0-8.5-6.9-15.4-15.4-15.4zm0-339c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4V63.4c0-8.5-6.9-15.4-15.4-15.4zM125 256c0-8.5-6.9-15.4-15.4-15.4H63.4c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4zm323.6-15.4h-46.2c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4s-6.9-15.4-15.4-15.4zM152.5 344.1c-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5l32.7-32.7c6-6 6-15.8 0-21.8-2.9-2.9-6.8-4.5-10.9-4.5zm207-176.2c4.1 0 8-1.6 10.9-4.5l32.7-32.7c2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5zm-228.8-59c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-2.9 2.9-4.5 6.8-4.5 10.9 0 4.1 1.6 8 4.5 10.9l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7zm239.7 239.7c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-6 6-6 15.8 0 21.8l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7zM256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const isDark = useDark();
  const mapStore = useMap();
  const toggleDark = useToggle(isDark);
</script>
