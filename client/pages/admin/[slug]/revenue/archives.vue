<script setup>
definePageMeta({ layout: "admin" });

const archiveFolders = [
  { year: "2015 E.C", total: "450,000" },
  { year: "2016 E.C", total: "512,000" },
  { year: "2017 E.C", total: "380,000" },
];

const pastCampaigns = ref([
  {
    title: "New Church Roof Fund",
    year: "2015 E.C",
    goal: "200,000",
    actual: 215000,
  },
  { title: "Meskel Bazaar", year: "2016 E.C", goal: "100,000", actual: 98500 },
  {
    title: "Sunday School Library",
    year: "2015 E.C",
    goal: "50,000",
    actual: 55000,
  },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Revenue & Development Archives
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Historical Sales & Fundraising Records (Ref #7)
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:file-bar-chart"
        >Annual Revenue Summary</BaseButton
      >
    </div>

    <!-- Yearly Revenue Folders (Ref #1 Institutional Memory) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon name="lucide:archive" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ folder.year }} Financial Year
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ folder.total }} ETB Raised
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. HISTORICAL CAMPAIGN LOGS (Ref #7 Campaign Manager) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Closed Fundraising Projects
            </h3>
          </div>
          <BaseDataTable :data="pastCampaigns">
            <Column field="title" header="Campaign Name" />
            <Column field="year" header="Year" />
            <Column field="goal" header="Goal" />
            <Column field="actual" header="Actual Raised">
              <template #body="{ data }">
                <span class="font-bold text-emerald-600"
                  >{{ data.actual.toLocaleString() }} ETB</span
                >
              </template>
            </Column>
            <Column header="Report">
              <template #body>
                <Icon
                  name="lucide:file-text"
                  class="w-5 h-5 text-slate-300 hover:text-maedot-gold cursor-pointer"
                />
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. HISTORICAL INVENTORY INSIGHTS -->
      <div class="xl:col-span-4 space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Legacy Sales Trends
        </h3>
        <BaseCard class="bg-maedot-navy text-white border-none">
          <div class="space-y-4">
            <div class="border-l-2 border-maedot-gold pl-4">
              <p
                class="text-[10px] font-black text-maedot-gold uppercase tracking-widest"
              >
                Top Selling Item (2015)
              </p>
              <p class="text-xs text-slate-300 italic">
                "Hamer Magazine Vol. 22 sold out in 3 weeks. High demand in
                Maraki Campus."
              </p>
            </div>
            <div class="border-l-2 border-slate-500 pl-4">
              <p
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Donation Peak
              </p>
              <p class="text-xs text-slate-300 italic">
                "Zikir 2014 saw highest donations from Alumni group. Use the
                same SMS strategy."
              </p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
