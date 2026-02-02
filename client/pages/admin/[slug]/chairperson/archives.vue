<script setup>
definePageMeta({ layout: "admin" });

const archives = ref([
  {
    id: 1,
    title: "Annual Performance Report (Si-so)",
    category: "PLANNING",
    sealedBy: "Selam. T",
  },
  {
    id: 2,
    title: "Senate Decisions on Property Handover",
    category: "SECRETARY",
    sealedBy: "Abebe. K",
  },
  {
    id: 3,
    title: "Master Audit Reconciliation 2015",
    category: "AUDIT",
    sealedBy: "Dawit. Z",
  },
  {
    id: 4,
    title: "Full Student Graduation List 2015",
    category: "MEMBER CARE",
    sealedBy: "Mulugeta. H",
  },
]);
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end border-b border-slate-200 pb-6">
      <div>
        <h1
          class="text-3xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Institutional Memory
        </h1>
        <p class="text-slate-500 font-medium">
          Archived Heritage & Past Administrative Records.
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton variant="secondary" icon="lucide:search"
          >Global Archive Search</BaseButton
        >
        <!-- The "Nasty" Industrial Button for Year End -->
        <BaseButton variant="primary" icon="lucide:lock"
          >Seal Current Year</BaseButton
        >
      </div>
    </div>

    <!-- Archive Navigation: Browsing by Year (Ref #1) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <BaseCard
        v-for="year in ['2015 E.C', '2014 E.C', '2013 E.C', '2012 E.C']"
        :key="year"
        class="cursor-pointer hover:border-maedot-gold transition-all group py-4 text-center"
      >
        <Icon
          name="lucide:folder-archive"
          class="w-8 h-8 text-slate-300 group-hover:text-maedot-gold mx-auto mb-2"
        />
        <p class="font-bold text-maedot-navy">{{ year }}</p>
        <span class="text-[10px] text-slate-400 font-black uppercase"
          >Click to Open</span
        >
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- 1. HISTORICAL DOCUMENTS (Permanent Records) -->
      <div class="xl:col-span-2">
        <BaseDataTable title="Historical Master Records" :data="archives">
          <Column field="title" header="Document Name" />
          <Column field="category" header="Module">
            <template #body="{ data }">
              <span
                class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-bold uppercase"
              >
                {{ data.category }}
              </span>
            </template>
          </Column>
          <Column field="sealedBy" header="Sealed By" />
          <Column header="Access">
            <template #body>
              <BaseButton variant="ghost" size="sm" icon="lucide:eye"
                >View PDF</BaseButton
              >
            </template>
          </Column>
        </BaseDataTable>
      </div>

      <!-- 2. TRADITIONAL KNOWLEDGE BASE (Ref #1) -->
      <div class="space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Legacy Highlights
        </h3>
        <BaseCard class="bg-eotc-cream border-maedot-gold/30">
          <div class="space-y-4">
            <div class="p-3 bg-white rounded-xl border border-slate-100">
              <p class="text-xs font-black text-eotc-red uppercase mb-1">
                Succession Note
              </p>
              <p class="text-xs text-slate-600 italic">
                "In 2014, we established the first mobile library for the
                Agriculture campus. Ensure it remains stocked."
              </p>
              <p class="text-[10px] text-right mt-2 font-bold">
                — Deacon Elias (Former Chair)
              </p>
            </div>

            <div class="p-3 bg-white rounded-xl border border-slate-100">
              <p class="text-xs font-black text-maedot-gold uppercase mb-1">
                Financial Legacy
              </p>
              <p class="text-xs text-slate-600">
                The Zikr fundraising model of 2013 increased revenue by 40%. Use
                the same checklist.
              </p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
