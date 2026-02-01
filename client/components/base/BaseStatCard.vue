<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  trend: String,
  trendUp: { type: Boolean, default: true },
});
</script>
<template>
  <BaseCard padding class="relative overflow-hidden group">
    <div class="flex items-start justify-between">
      <div class="space-y-2">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {{ title }}
        </p>
        <h3
          class="text-2xl font-black text-maedot-navy transition-all group-hover:text-maedot-gold"
        >
          {{ value }}
        </h3>

        <!-- Trend Indicator (Industry Standard) -->
        <div
          v-if="trend"
          class="flex items-center gap-1 text-[10px] font-bold"
          :class="trendUp ? 'text-emerald-600' : 'text-rose-600'"
        >
          <Icon
            :name="trendUp ? 'lucide:trending-up' : 'lucide:trending-down'"
            class="w-3 h-3"
          />
          {{ trend }} since last month
        </div>
      </div>

      <!-- Icon Wrapper -->
      <div
        class="p-3 rounded-xl bg-slate-50 text-maedot-navy group-hover:bg-maedot-navy group-hover:text-white transition-all duration-300"
      >
        <Icon :name="icon" class="w-6 h-6" />
      </div>
    </div>

    <!-- Subtle Background Pattern -->
    <div
      class="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
    >
      <Icon :name="icon" class="w-24 h-24" />
    </div>
  </BaseCard>
</template>
