<script setup>
definePageMeta({ layout: "admin" });
const performanceHistory = [
  { event: "Meskel Festival 2015", year: "2015 E.C" },
  { event: "Fasika Merha-Gbir", year: "2016 E.C" },
];
const pastScripts = ref([
  { title: "The Prodigal Son (Drama)", type: "DRAMA", author: "Saba T." },
  { title: "Ode to St. Teklehaymanot", type: "POETRY", author: "Yared Z." },
]);
</script>
<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-black text-maedot-navy uppercase">
      Creative Archives
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="archive in performanceHistory"
        :key="archive.year"
        class="hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl">
            <Icon name="lucide:video" class="w-6 h-6 text-eotc-red" />
          </div>
          <div>
            <h4 class="font-bold text-sm">{{ archive.event }}</h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ archive.year }} Performance
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Script Master Archive (Ref #6) -->
    <BaseDataTable title="Historical Script & Poem Archive" :data="pastScripts">
      <Column field="title" header="Script Title" />
      <Column field="type" header="Category" />
      <Column field="author" header="Original Author" />
      <Column header="Institutional Memory">
        <template #body>
          <BaseButton
            variant="ghost"
            size="sm"
            icon="lucide:file-text"
            class="text-maedot-gold"
            >Download</BaseButton
          >
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
