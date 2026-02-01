<script setup>
// We use ONE name consistently. Let's stick with 'activeCity'
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <LandingCityCard
        v-for="city in cities"
        :key="city.name"
        :city="city"
        @select="handleCitySelect"
      />
    </div>

    <!-- 
      FIXED: Changed 'selectedCity' to 'activeCity' to match your script.
      The '!!' converts the string to a Boolean (true if a name exists).
    -->
    <LandingGbiGubaesModal
      :is-open="!!activeCity"
      :city-name="activeCity"
      @close="activeCity = null"
    />
  </section>
</template>
