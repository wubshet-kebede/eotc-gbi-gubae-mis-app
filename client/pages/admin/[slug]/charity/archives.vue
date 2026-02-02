<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Social Impact Archives
      </h1>
      <BaseButton variant="secondary" icon="lucide:printer"
        >Export Legacy Impact Report</BaseButton
      >
    </div>

    <!-- Yearly Impact Stats (Ref #10 Service Impact Logger) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="yr in ['2015 E.C', '2016 E.C', '2017 E.C']"
        :key="yr"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon
              name="lucide:heart-handshake"
              class="w-6 h-6 text-maedot-navy"
            />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ yr }} Service Year
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              1,200+ Volunteer Hours
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Past Professional Projects (Ref #10) -->
    <BaseDataTable title="Historical Charity Projects" :data="pastProjects">
      <Column field="title" header="Project Name" />
      <Column field="field" header="Professional Field" />
      <Column field="impact" header="Impact Summary" />
      <Column header="Case Study">
        <template #body>
          <BaseButton
            variant="ghost"
            size="sm"
            icon="lucide:file-text"
            class="text-maedot-gold"
            >Read Record</BaseButton
          >
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const pastProjects = ref([
  {
    title: "Campus Health Clinic",
    field: "Medical/Health",
    impact: "240 Students Assisted",
  },
  {
    id: 2,
    title: "Tseda Church Design",
    field: "Civil Engineering",
    impact: "Drafts Delivered to Ma'ekel",
  },
]);
</script>
