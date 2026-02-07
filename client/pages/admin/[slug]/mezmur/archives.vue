<script setup>
/**
 * CREATIVE ARCHIVES (Ref #6 & #1)
 * Logic: Legacy Script Preservation & Performance Media Vault
 */
definePageMeta({ layout: "admin" });

const performanceHistory = ref([
  { event: "Meskel Festival 2015", year: "2015 E.C", media: "Video Link" },
  { event: "Fasika Merha-Gbir", year: "2016 E.C", media: "Photo Album" },
]);

const pastScripts = ref([
  {
    title: "The Prodigal Son",
    type: "DRAMA",
    author: "Saba T.",
    batch: "2015 E.C",
    downloads: 24,
  },
  {
    title: "Ode to St. Teklehaymanot",
    type: "POETRY",
    author: "Yared Z.",
    batch: "2016 E.C",
    downloads: 12,
  },
]);

const downloadArchivedScript = (script) => {
  alert(`Downloading Verified Master Script: ${script.title} (v.Final)`);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic text-nowrap"
        >
          Creative Archives
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Institutional Memory & Artistic Legacy
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:search"
        >Forensic Script Search</BaseButton
      >
    </div>

    <!-- Performance Media Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="archive in performanceHistory"
        :key="archive.event"
        class="group hover:border-maedot-gold cursor-pointer transition-all border-b-4 border-slate-200 hover:border-b-maedot-gold"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3 bg-slate-50 rounded-xl group-hover:bg-rose-50 transition-colors"
          >
            <Icon name="lucide:clapperboard" class="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h4
              class="font-black text-sm text-maedot-navy uppercase tracking-tight line-clamp-1"
            >
              {{ archive.event }}
            </h4>
            <p class="text-[9px] text-slate-400 font-black uppercase">
              {{ archive.year }} • {{ archive.media }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Script Table -->
    <BaseCard
      :padding="false"
      title="Historical Script & Poem Repository"
      subtitle="Finalized versions of approved Guba literature"
    >
      <BaseDataTable :data="pastScripts">
        <Column
          field="title"
          header="Script Title"
          class="font-bold text-slate-700 text-xs"
        />
        <Column
          field="type"
          header="Category"
          class="text-[10px] font-black text-slate-400"
        />
        <Column field="author" header="Original Author" />
        <Column header="Access Legacy">
          <template #body="{ data }">
            <div class="flex gap-2">
              <BaseButton
                variant="ghost"
                size="sm"
                icon="lucide:file-text"
                class="text-maedot-gold text-[10px] uppercase font-black"
                @click="downloadArchivedScript(data)"
                >Master PDF</BaseButton
              >
              <BaseButton
                variant="ghost"
                size="sm"
                icon="lucide:external-link"
                class="text-slate-300"
              />
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
  </div>
</template>
