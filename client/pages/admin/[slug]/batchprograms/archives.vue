<script setup>
definePageMeta({ layout: "admin" });
const archiveFolders = [
  { year: "2015 E.C", count: 48 },
  { year: "2016 E.C", count: 52 },
];
const pastEvents = ref([
  {
    title: "Spiritual Trip to Debre Libanos",
    type: "TRIP",
    attendance: "350 Students",
  },
  {
    title: "Freshmen Welcoming 2015",
    type: "ORIENTATION",
    attendance: "120 Students",
  },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Logistics Archives
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Historical Event Templates & Batch Data (Ref #9)
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:printer"
        >Annual Program Summary</BaseButton
      >
    </div>

    <!-- Yearly Program Folders -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon
              name="lucide:calendar-check"
              class="w-6 h-6 text-maedot-navy"
            />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ folder.year }} Calendar
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ folder.count }} Events Logged
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Successful Event Blueprints -->
    <BaseDataTable title="Historical Event Blueprints" :data="pastEvents">
      <Column field="title" header="Event Name" />
      <Column field="type" header="Category" />
      <Column field="attendance" header="Attendance" />
      <Column header="Strategy">
        <template #body>
          <BaseButton
            variant="ghost"
            size="sm"
            icon="lucide:eye"
            class="text-maedot-gold text-[10px] uppercase font-black"
            >View Checklist</BaseButton
          >
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
