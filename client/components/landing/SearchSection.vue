<script setup>
const search = ref("");
defineEmits(["search"]);
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 -mt-8 relative z-20">
    <BaseCard padding class="border-t-4 border-t-maedot-gold">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <!-- The Input we built -->
        <div class="flex-grow">
          <BaseInput
            v-model="search"
            label="Find your Association"
            placeholder="e.g. Fasil Gbi Gubae or Gondar..."
            icon="lucide:search"
            size="lg"
          />
        </div>

        <!-- The Button we built -->
        <BaseButton
          variant="primary"
          size="lg"
          class="h-[58px]"
          @click="$emit('search', search)"
        >
          Search
        </BaseButton>
      </div>

      <!-- Quick Filters / City Pills -->
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <span class="text-xs font-bold text-slate-400 uppercase">Popular:</span>
        <button
          v-for="city in ['Gondar', 'Addis Ababa', 'Bahir Dar', 'Dessie']"
          :key="city"
          @click="search = city"
          class="px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-maedot-gold hover:text-maedot-navy transition-all"
        >
          {{ city }}
        </button>
      </div>
    </BaseCard>
  </div>
</template>
