<script setup>
/**
 * STRATEGIC VAULT & BI ARCHIVES (Ref #2 & #11)
 * Logic: Permanent Storage of Sealed Annual Plans, Merged Si-so PDFs, and Project History
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- STATE ---
const isRetrievalOpen = ref(false);
const selectedYear = ref(null);

// --- DATA: Yearly "Master Envelopes" ---
const archiveFolders = ref([
  {
    year: "2017 E.C",
    attainment: 88,
    sealedBy: "Dn. Solomon T.",
    dateSealed: "Aug 30, 2017",
    topDept: "Education",
  },
  {
    year: "2016 E.C",
    attainment: 94,
    sealedBy: "Dn. Muse G.",
    dateSealed: "Aug 28, 2016",
    topDept: "Hymn & Arts",
  },
]);

// --- ACTIONS ---
const openYearlyVault = (folder) => {
  selectedYear.value = folder;
  isRetrievalOpen.value = true;
};

const downloadMasterSiSo = (year) => {
  // Logic: Retrieves the 12-department merged PDF from that year
  alert(
    `Ma'edot Vault: Retrieving the Sealed 2017 E.C. Master Si-so Report for Ma'ekel...`,
  );
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
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Strategic Vault
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Permanent Repository of Sealed Annual Performance
        </p>
      </div>
      <BaseButton
        variant="secondary"
        icon="lucide:file-search"
        @click="isRetrievalOpen = true"
      >
        Retrieve Legacy Records
      </BaseButton>
    </div>

    <!-- 1. THE YEARLY VAULTS (Ref #11 Institutional Memory) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        @click="openYearlyVault(folder)"
        class="group hover:border-maedot-gold cursor-pointer transition-all border-b-8 border-slate-100 hover:border-maedot-gold"
      >
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div
              class="p-4 bg-slate-50 rounded-2xl group-hover:bg-maedot-gold/10 transition-colors"
            >
              <Icon
                name="lucide:archive-restore"
                class="w-6 h-6 text-maedot-navy"
              />
            </div>
            <div>
              <h4
                class="font-black text-sm text-maedot-navy uppercase tracking-tight"
              >
                {{ folder.year }} Master Plan
              </h4>
              <p
                class="text-[9px] text-emerald-600 font-black uppercase tracking-tighter italic"
              >
                {{ folder.attainment }}% Goal Success
              </p>
            </div>
          </div>
          <div class="pt-4 border-t border-slate-50">
            <p
              class="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1 text-nowrap"
            >
              Sealed by Planning Head
            </p>
            <p class="text-[10px] font-bold text-slate-500 italic">
              {{ folder.sealedBy }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- 2. ANALYTICS PREVIEW -->
    <BaseCard
      :padding="false"
      title="Historical Performance Benchmarks"
      subtitle="Comparison of yearly organizational growth"
    >
      <BaseDataTable :data="archiveFolders">
        <Column
          field="year"
          header="Academic Year"
          class="font-black text-slate-700"
        />
        <Column field="topDept" header="Leading Department" />
        <Column field="attainment" header="Execution Rate">
          <template #body="{ data }">
            <span class="font-black text-emerald-600"
              >{{ data.attainment }}%</span
            >
          </template>
        </Column>
        <Column header="Vault Access">
          <template #body="{ data }">
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:file-down"
              class="text-maedot-gold text-[10px] uppercase font-black"
              @click="downloadMasterSiSo(data.year)"
            >
              Get Sealed Si-so
            </BaseButton>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>

    <!-- LEGACY RETRIEVAL DRAWER (The "Search Legacy" Logic) -->
    <BaseGovernanceDrawer
      :is-open="isRetrievalOpen"
      title="Institutional Retrieval"
      subtitle="Accessing Archived Guba Performance"
      @close="isRetrievalOpen = false"
    >
      <div class="space-y-6">
        <div class="p-6 bg-maedot-navy rounded-[2.5rem] text-white space-y-4">
          <div class="flex items-center gap-2 text-maedot-gold">
            <Icon name="lucide:shield-check" class="w-5 h-5" />
            <p class="text-[10px] font-black uppercase tracking-widest">
              Sealed Identity
            </p>
          </div>
          <p class="text-xs text-slate-400 italic leading-relaxed">
            Records in this vault are
            <span class="text-white font-bold">Immutable</span>. They represent
            the official, audited history of the Gbi Gubae.
          </p>
        </div>

        <div class="space-y-4">
          <BaseInput
            label="Filter Year"
            placeholder="e.g. 2014 E.C."
            icon="lucide:calendar"
          />
          <BaseInput
            label="Specific Project Keyword"
            placeholder="e.g. Renovation, Festival..."
            icon="lucide:search"
          />
        </div>

        <div class="pt-4 space-y-3">
          <BaseButton block variant="secondary" icon="lucide:file-text"
            >Download Year-End Plan</BaseButton
          >
          <BaseButton block variant="secondary" icon="lucide:award"
            >Download Graduation Lists</BaseButton
          >
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
