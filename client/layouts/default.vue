<script setup>
// Layout-specific logic goes here (e.g., scroll-to-top behavior)
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-maedot-white font-sans text-maedot-navy selection:bg-maedot-gold/30"
  >
    <!-- 1. GLOBAL NAVIGATION COMPONENT -->
    <NavigationNavbar />

    <!-- 2. DYNAMIC PAGE CONTENT -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- 3. GLOBAL FOOTER COMPONENT -->
    <NavigationFooter />
  </div>
</template>

<style>
/* Smooth transitions between pages */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
