<script setup>
definePageMeta({ layout: "admin" });

const budgets = ref([
  { name: "Education & Apostolic", total: 50000, spent: 32500, percent: 65 },
  { name: "Hymn & Arts", total: 20000, spent: 18400, percent: 92 },
  { name: "Member Care", total: 15000, spent: 4500, percent: 30 },
  { name: "General Admin", total: 30000, spent: 28500, percent: 95 },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-black text-maedot-navy uppercase">
          Budgetary Control
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Departmental Spending Limits (Ref #8)
        </p>
      </div>
      <BaseButton variant="primary" icon="lucide:sliders-horizontal"
        >Adjust Allocations</BaseButton
      >
    </div>

    <!-- Dept Budget Progress Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCard
        v-for="dept in budgets"
        :key="dept.name"
        class="relative overflow-hidden"
      >
        <!-- Warning Glow for Overspending -->
        <div v-if="dept.percent > 90" class="absolute top-0 right-0 p-2">
          <Icon
            name="lucide:alert-circle"
            class="text-rose-500 w-5 h-5 animate-pulse"
          />
        </div>

        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-black text-maedot-navy uppercase text-sm">
              {{ dept.name }}
            </h3>
            <p class="text-[10px] text-slate-400 font-bold">
              Allocated: {{ dept.total.toLocaleString() }} ETB
            </p>
          </div>
          <span
            class="text-lg font-black"
            :class="dept.percent > 90 ? 'text-rose-600' : 'text-maedot-gold'"
          >
            {{ dept.percent }}%
          </span>
        </div>

        <!-- Progress Bar Logic -->
        <div class="space-y-2">
          <div
            class="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200"
          >
            <div
              class="h-full transition-all duration-1000"
              :class="
                dept.percent > 90
                  ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                  : 'bg-maedot-gold'
              "
              :style="{ width: dept.percent + '%' }"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] font-bold uppercase">
            <span class="text-slate-500"
              >Spent: {{ dept.spent.toLocaleString() }} ETB</span
            >
            <span class="text-slate-400"
              >Remaining:
              {{ (dept.total - dept.spent).toLocaleString() }} ETB</span
            >
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
