<script setup>
definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <LandingHero />
    <LandingSearchSection />
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-maedot-navy mb-8 text-center">
        Explore Gbi Gubaes by City
      </h2>
      <LandingCityGrid />
    </div>
  </div>
</template>
