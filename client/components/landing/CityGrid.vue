<script setup>
const activeCity = ref(null);

const handleCitySelect = (name) => {
  activeCity.value = name;
};

const cities = [
  {
    name: "Gondar",
    region: "North",
    count: 5,
    image: "/images/Gondar lideta.png",
  },
  {
    name: "Addis Ababa",
    region: "Central",
    count: 12,
    image: "/images/Adiss ababa.png",
  },
  {
    name: "Bahir Dar",
    region: "North West",
    count: 4,
    image: "/images/Bahir dar.png",
  },
];
</script>
<template>
  <section class="py-12">
    <!-- Grid Wrapper: 1 column on mobile, 2 on tablet, 3 on desktop -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- We loop through our cities using the CityCard component -->
      <LandingCityCard
        v-for="city in cities"
        :key="city.name"
        :city="city"
        @select="handleCitySelect"
      />
    </div>

    <!-- The Drill-Down Modal (Hidden by default) -->
    <LandingGbiModal
      v-if="activeCity"
      :city-name="activeCity"
      @close="activeCity = null"
    />
  </section>
</template>
