<script setup>
definePageMeta({ layout: "admin" });

const archiveFolders = [
  { year: "2014 E.C", count: 124 },
  { year: "2015 E.C", count: 142 },
  { year: "2016 E.C", count: 98 },
];
const isSummaryOpen = ref(false);
const selectedYearSummary = ref(null);

const pastResolutions = ref([
  { year: "2015 E.C", category: "Financial Support", resolutionRate: 92 },
  { year: "2015 E.C", category: "Spiritual Counseling", resolutionRate: 85 },
  { year: "2014 E.C", category: "Academic Tutoring", resolutionRate: 100 },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Support Archives
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Historical Resolution Data (Ref #5)
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:file-search"
        >Generate Impact Report</BaseButton
      >
    </div>

    <!-- Archive Summary (Ref #5 Lifecycle Management) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        class="hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl">
            <Icon name="lucide:folder-heart" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ folder.year }} Archive
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ folder.count }} Cases Resolved
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- 1. DE-IDENTIFIED CASE LOGS (Ref #5 Case Management) -->
      <div class="xl:col-span-2">
        <BaseCard :padding="false">
          <div class="p-6 border-b border-slate-100">
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Historical Resolution Trends
            </h3>
          </div>
          <BaseDataTable :data="pastResolutions">
            <Column field="year" header="Year" />
            <Column field="category" header="Problem Type" />
            <Column field="resolutionRate" header="Success Rate">
              <template #body="{ data }">
                <span class="text-emerald-600 font-bold"
                  >{{ data.resolutionRate }}%</span
                >
              </template>
            </Column>
            <Column header="Summary">
              <template #body>
                <BaseButton
                  variant="ghost"
                  size="sm"
                  class="text-[10px] uppercase font-black"
                  @click="
                    isSummaryOpen = true;
                    selectedYearSummary = data;
                  "
                  >View Summary</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. ANONYMOUS INSIGHTS (Ref #1 Institutional Memory) -->
      <div class="space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Legacy Wisdom
        </h3>
        <BaseCard class="bg-maedot-navy border-none text-white">
          <div class="space-y-4">
            <div class="border-l-2 border-maedot-gold pl-4">
              <p class="text-[10px] font-black text-maedot-gold uppercase">
                2014 Trend Alert
              </p>
              <p class="text-xs text-slate-300 leading-relaxed italic">
                "High incidence of academic stress during semester 2.
                Recommended peer-tutoring was highly effective."
              </p>
            </div>
            <div class="border-l-2 border-slate-500 pl-4">
              <p class="text-[10px] font-black text-slate-400 uppercase">
                2015 Trend Alert
              </p>
              <p class="text-xs text-slate-300 leading-relaxed italic">
                "Increased requests for spiritual parents among freshmen. Map
                them earlier next year."
              </p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
    <BaseGovernanceDrawer
      :is-open="isSummaryOpen"
      :title="selectedYearSummary?.year + ' ' + selectedYearSummary?.category"
      subtitle="De-identified Historical Performance Analysis"
      @close="isSummaryOpen = false"
    >
      <div class="space-y-8">
        <!-- 1. PERFORMANCE BADGE -->
        <div
          class="flex items-center justify-between p-6 bg-emerald-50 rounded-[2.5rem] border border-emerald-100"
        >
          <div>
            <p
              class="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
            >
              Resolution Success
            </p>
            <p class="text-3xl font-black text-emerald-700">
              {{ selectedYearSummary?.resolutionRate }}%
            </p>
          </div>
          <Icon name="lucide:award" class="w-12 h-12 text-emerald-200" />
        </div>

        <!-- 2. ANALYTICAL BREAKDOWN -->
        <div class="space-y-4">
          <h4
            class="text-xs font-black text-maedot-navy uppercase tracking-widest"
          >
            Key Insights
          </h4>

          <!-- Logic: The "Root Cause" -->
          <div
            class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1"
          >
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Primary Challenge
            </p>
            <p class="text-xs text-slate-700 font-medium italic">
              "Students struggled with semester-end financial gaps and academic
              burnout."
            </p>
          </div>

          <!-- Logic: The "Winning Strategy" -->
          <div
            class="p-4 bg-maedot-gold/5 rounded-2xl border border-maedot-gold/20 space-y-1"
          >
            <p
              class="text-[9px] font-black text-maedot-gold uppercase tracking-tighter"
            >
              Most Effective Intervention
            </p>
            <p class="text-xs text-maedot-navy font-bold">
              Initiated Peer-to-Peer tutoring & direct Charity Dept integration.
            </p>
          </div>
        </div>

        <!-- 3. RESOURCE EFFICIENCY -->
        <div class="p-6 bg-maedot-navy rounded-[2.5rem] text-white">
          <div
            class="flex justify-between items-center mb-4 border-b border-white/10 pb-4"
          >
            <span class="text-[10px] font-black uppercase text-slate-400"
              >Cases Handled</span
            >
            <span class="text-sm font-black">42 Students</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-[10px] font-black uppercase text-slate-400"
              >Avg. Support Duration</span
            >
            <span class="text-sm font-black text-maedot-gold italic"
              >14 Days</span
            >
          </div>
        </div>

        <!-- 4. ACTION -->
        <BaseButton
          variant="secondary"
          block
          icon="lucide:file-down"
          class="border-slate-200"
        >
          Download Full De-identified PDF
        </BaseButton>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
