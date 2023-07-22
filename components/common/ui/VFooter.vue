<template>
  <section
    class="h-10 w-full flex items-center justify-between border-t border-stone-300 px-4 dark:border-stone-700"
  >
    <div class="flex items-center">
      <p class="text-sm">
        Made with <span class="animate-pulse text-red-5">❤️</span> by
        <a href="https://vinayakkulkarni.dev">Vinayak</a> &copy;
        {{ state.date }}
      </p>
    </div>
    <div class="flex items-center justify-center space-x-4">
      <div class="flex flex-col items-start justify-between w-20">
        <div
          v-if="state.appVersion"
          class="flex justify-between w-full text-xs"
        >
          <div>app:</div>
          v{{ state.appVersion }}
        </div>
        <div
          v-if="state.buildVersion"
          class="flex justify-between w-full text-xs"
        >
          <div>build:</div>
          {{ state.buildVersion }}
        </div>
      </div>
      <!-- GitHub -->
      <a
        rel="noopener"
        href="https://github.com/vinayakkulkarni"
        target="_blank"
        aria-label="Github"
        class="transition-colors duration-100 ease-linear hover:text-dark-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          aria-labelledby="github"
          role="presentation"
          class="fill-current text-xl w-5 h-5"
        >
          <title id="github" lang="en">github</title>
          <path
            d="M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z"
          />
        </svg>
      </a>
      <!-- Twitter -->
      <a
        rel="noopener"
        href="https://twitter.com/_vinayak_k"
        target="_blank"
        aria-label="Twitter"
        class="transition-colors duration-100 ease-linear hover:text-blue-300"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 512 512"
          class="fill-current text-xl w-5 h-5"
        >
          <g>
            <path
              d="M459.4 151.7c0.3 4.5 0.3 9.1 0.3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"
            />
          </g>
        </svg>
      </a>
      <!-- LinkedIn -->
      <a
        rel="noopener"
        href="https://www.linkedin.com/in/kulkarnivinayak/"
        target="_blank"
        aria-label="LinkedIn"
        class="transition-colors duration-100 ease-linear hover:text-blue-400"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 512 512"
          class="fill-current text-xl w-5 h-5"
        >
          <g>
            <path
              d="M160.008 423h-70V197h70zm6.984-298.004c0-22.629-18.36-40.996-40.976-40.996C103.312 84 85 102.367 85 124.996 85 147.633 103.313 166 126.016 166c22.617 0 40.976-18.367 40.976-41.004zM422 298.664C422 237.996 409.184 193 338.312 193c-34.054 0-56.914 17.031-66.246 34.742H272V197h-68v226h68V310.79c0-29.388 7.48-57.856 43.906-57.856 35.93 0 37.094 33.605 37.094 59.722V423h69zM512 452V60c0-33.086-26.914-60-60-60H60C26.914 0 0 26.914 0 60v392c0 33.086 26.914 60 60 60h392c33.086 0 60-26.914 60-60zM452 40c11.027 0 20 8.973 20 20v392c0 11.027-8.973 20-20 20H60c-11.027 0-20-8.973-20-20V60c0-11.027 8.973-20 20-20zm0 0"
            />
          </g>
        </svg>
      </a>
      <!-- Codepen -->
      <a
        rel="noopener"
        href="https://codepen.io/vinayakkulkarni"
        target="_blank"
        aria-label="Codepen"
        class="transition-colors duration-100 ease-linear hover:text-dark-400"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 512 512"
          class="fill-current text-xl w-5 h-5"
        >
          <g>
            <path
              d="M502.3 159.7c6 4 9.7 11.1 9.7 18.3v156c0 7.1-3.7 14.3-9.7 18.3l-234 156c-8.1 5-16.6 4.9-24.6 0l-234-156c-6-4-9.7-11.1-9.7-18.3v-156c0-7.1 3.7-14.3 9.7-18.3l234-156c8.1-5 16.6-4.9 24.6 0zM278 63.1v102.6l95.4 63.7 76.9-51.4zM234 63.1l-172.3 114.9 76.9 51.4 95.4-63.7v-102.6zM44 219.1v73.7l55.1-36.9zM234 448.8v-102.6l-95.4-63.7-76.9 51.4zM256 308l77.7-52-77.7-52-77.7 52zM278 448.8l172.3-114.9-76.9-51.4-95.4 63.7v102.6zM468 292.8v-73.7l-55.1 36.9z"
            />
          </g>
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { $config } = useNuxtApp();
  const state = reactive({
    date: new Date().getFullYear(),
    appVersion: $config.public.appVersion.split('+')[0],
    buildVersion: $config.public.appVersion.split('+')[1],
  });
</script>
