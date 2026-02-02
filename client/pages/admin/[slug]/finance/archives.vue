<script setup>
definePageMeta({ layout: "admin" });
const archivedReports = ref([
  {
    year: "2017 E.C",
    totalRevenue: "540,000 ETB",
    totalExpense: "480,000 ETB",
  },
  {
    year: "2016 E.C",
    totalRevenue: "420,000 ETB",
    totalExpense: "390,000 ETB",
  },
]);
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Financial Archives
      </h1>
      <BaseButton variant="secondary" icon="lucide:file-search"
        >Global Ledger Search</BaseButton
      >
    </div>

    <!-- Yearly Financial Envelopes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="yr in ['2017 E.C', '2016 E.C', '2015 E.C']"
        :key="yr"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon name="lucide:book-lock" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">{{ yr }} Ledger</h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              Finalized & Audited
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Historical Financial Reports (Ref #8) -->
    <BaseDataTable title="Archived Annual Reports" :data="archivedReports">
      <Column field="year" header="Year" />
      <Column field="totalRevenue" header="Total Revenue" />
      <Column field="totalExpense" header="Total Expense" />
      <Column header="Audit Trail">
        <template #body>
          <div class="flex gap-2">
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:file-check"
              class="text-emerald-600 text-[10px] uppercase font-black"
              >View Audit Sign-off</BaseButton
            >
          </div>
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
