<template>
  <div class="container relative">
    <header class="sticky top-0 z-10 bg-white shadow flex flex-wrap items-center justify-between">
      <div class="font-serif text-5xl w-full md:w-1/2 p-4">
        <fa icon="tree" class="mr-4 hidden lg:inline-flex" />
        Secret Santa
        <fa icon="tree" class="ml-4" />
      </div>
      <div class="font-serif italic text-red-600 p-4" title="Kris Kringle, Miracle on 34th Street">
        "Christmas isn't just a day. It's a state of mind."
      </div>
      <div class="w-full bg-gray-50 flex divide-x divide-red-200 border-t border-gray-100">
        <NuxtLink to="/" class="nav-link">
          Welcome!
        </NuxtLink>
        <NuxtLink to="/setup" class="nav-link">
          Setup
        </NuxtLink>
        <NuxtLink to="/play" class="nav-link">
          Play
        </NuxtLink>
      </div>
    </header>
    <Nuxt />
  </div>
</template>
