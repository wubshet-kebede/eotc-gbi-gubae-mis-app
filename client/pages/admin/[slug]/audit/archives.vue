<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Compliance Archives
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Historical Findings & Clearance Logs (Ref #12)
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:file-check"
        >Annual Transparency Report</BaseButton
      >
    </div>

    <!-- Yearly Audit Snapshots -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="yr in ['2017 E.C', '2016 E.C', '2015 E.C']"
        :key="yr"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon name="lucide:shield-half" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ yr }} Audit Seal
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              Unqualified Opinion
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Past Discrepancy Log -->
    <BaseDataTable title="Historical Resolved Findings" :data="pastFindings">
      <Column field="year" header="Year" />
      <Column field="dept" header="Department" />
      <Column field="issue" header="Resolved Issue" />
      <Column header="Root Cause">
        <template #body>
          <span class="text-[10px] font-medium text-slate-500 italic"
            >"Corrective training provided"</span
          >
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const pastFindings = ref([
  { year: "2017 E.C", dept: "Finance", issue: "Missing Voucher FG-02" },
  { year: "2016 E.C", dept: "Education", issue: "Overstated Attendance Count" },
]);
</script>
