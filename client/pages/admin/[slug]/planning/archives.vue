<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Institutional BI Archives
      </h1>
      <BaseButton variant="secondary" icon="lucide:file-down"
        >Download Master Archive</BaseButton
      >
    </div>

    <!-- Yearly Performance Folders (Ref #11 Data Aggregator) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon name="lucide:bar-chart-3" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ folder.year }} Final Plan
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ folder.attainment }}% Goal Attainment
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Historical KPI Data -->
    <BaseDataTable
      title="Historical Annual Performance (Ref #11)"
      :data="pastKPIs"
    >
      <Column field="year" header="Year" />
      <Column field="topDept" header="Top Performing Dept" />
      <Column field="growth" header="Membership Growth">
        <template #body="{ data }">
          <span class="text-emerald-600 font-bold">+{{ data.growth }}%</span>
        </template>
      </Column>
      <Column header="Ma'ekel Feedback">
        <template #body>
          <Icon name="lucide:message-square" class="w-4 h-4 text-slate-300" />
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const archiveFolders = [
  { year: "2015 E.C", attainment: 82 },
  { year: "2016 E.C", attainment: 94 },
];
const pastKPIs = ref([
  { year: "2016 E.C", topDept: "Hymn & Arts", growth: 12 },
  { year: "2015 E.C", topDept: "Education", growth: 8 },
]);
</script>
