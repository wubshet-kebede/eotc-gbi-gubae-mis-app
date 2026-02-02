<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Business Intelligence Hub
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Monitoring KPI & Institutional Performance (Ref #11)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-bar-chart"
        @click="generateQuarterlyReport"
      >
        Generate Quarterly "Si-so"
      </BaseButton>
    </div>

    <!-- Performance KPIs (Ref #11 Data Aggregator) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Overall Execution"
        value="78%"
        icon="lucide:gauge"
        trend="+5%"
      />
      <BaseStatCard
        title="Reporting Compliance"
        value="10/12"
        icon="lucide:clipboard-check"
      />
      <BaseStatCard title="Project Success" value="14" icon="lucide:rocket" />
      <BaseStatCard
        title="Data Accuracy"
        value="99.2%"
        icon="lucide:fingerprint"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. PLANNED VS ACTUAL (Ref #11 KPI Dashboard) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Departmental KPI Tracker
            </h3>
          </div>

          <BaseDataTable :data="deptPerformance">
            <Column field="name" header="Department" />
            <Column field="planned" header="Planned" />
            <Column field="actual" header="Actual" />
            <Column header="Execution Rate">
              <template #body="{ data }">
                <div class="flex items-center gap-3">
                  <div
                    class="flex-grow bg-slate-100 h-1.5 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full"
                      :class="getRateColor(data.rate)"
                      :style="{ width: data.rate + '%' }"
                    ></div>
                  </div>
                  <span class="text-[10px] font-bold">{{ data.rate }}%</span>
                </div>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. REPORTING DEADLINES & TOOLS -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Planning Controls"
          :actions="[
            {
              label: 'Set Annual Goals',
              icon: 'lucide:target',
              command: () => {},
            },
            {
              label: 'Audit Dept Submissions',
              icon: 'lucide:search',
              command: () => {},
            },
            {
              label: 'Broadcast Deadline Alert',
              icon: 'lucide:bell-ring',
              command: () => {},
            },
          ]"
        />

        <BaseCard class="bg-maedot-navy text-white border-none">
          <div class="flex items-center gap-2 mb-3 text-maedot-gold">
            <Icon name="lucide:info" class="w-5 h-5" />
            <p class="text-[10px] font-black uppercase tracking-widest">
              Quarterly Status
            </p>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            Final Q1 Report for the **Ma'ekel** is due in
            <span class="text-white font-bold">4 Days</span>. Ensure Finance and
            Education have locked their records.
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const deptPerformance = ref([
  { name: "Education", planned: 12, actual: 9, rate: 75 },
  { name: "Hymn & Arts", planned: 8, actual: 8, rate: 100 },
  { name: "Finance", planned: 4, actual: 4, rate: 100 },
  { name: "Member Care", planned: 15, actual: 12, rate: 80 },
]);

const getRateColor = (rate) => {
  if (rate >= 90) return "bg-emerald-500";
  if (rate >= 70) return "bg-maedot-gold";
  return "bg-rose-500";
};

const generateQuarterlyReport = () => {
  alert("Aggregating 12 Departments... PDF Report Generated for Ma'ekel.");
};
</script>
