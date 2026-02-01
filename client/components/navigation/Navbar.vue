<script setup></script>
<template>
  <nav
    class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo Section -->
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="navigateTo('/')"
        >
          <div
            class="w-8 h-8 bg-maedot-navy rounded-lg flex items-center justify-center"
          >
            <span class="text-maedot-gold font-bold text-xl">M</span>
          </div>
          <span class="font-bold text-xl tracking-tight uppercase"
            >Ma'edot</span
          >
        </div>

        <!-- Desktop Links -->
        <div
          class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
        >
          <NuxtLink to="/" class="hover:text-maedot-navy transition-colors"
            >Directory</NuxtLink
          >
          <NuxtLink to="/about" class="hover:text-maedot-navy transition-colors"
            >About</NuxtLink
          >
          <button
            @click="navigateTo('/register-gbi-gubaes')"
            class="bg-maedot-navy text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm"
          >
            Register Gbi
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
