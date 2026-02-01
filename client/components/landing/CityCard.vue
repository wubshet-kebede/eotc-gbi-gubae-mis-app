<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
    // Expected: { name: 'Gondar', image: '...', count: 5, region: 'Amhara' }
  },
});
defineEmits(["select"]);
</script>
<template>
  <BaseCard
    :padding="false"
    class="group cursor-pointer"
    @click="$emit('select', city.name)"
  >
    <!-- Image Container with Overlay -->
    <div class="relative h-48 w-full overflow-hidden">
      <img
        :src="city.image"
        :alt="city.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Gradient Overlay for Text Legibility -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-maedot-navy/80 via-transparent to-transparent"
      />

      <!-- Organization Count Badge -->
      <div
        class="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/30"
      >
        {{ city.count }} Gubaes
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex justify-between items-center bg-white">
      <div>
        <h3 class="font-bold text-xl text-maedot-navy">{{ city.name }}</h3>
        <p class="text-sm text-slate-500">{{ city.region }} Region</p>
      </div>
      <!-- Animated Arrow -->
      <div
        class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-maedot-gold group-hover:text-white transition-all"
      >
        <Icon name="lucide:arrow-right" class="w-5 h-5" />
      </div>
    </div>
  </BaseCard>
</template>
