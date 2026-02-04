<script setup>
/**
 * FINANCIAL ARCHIVES & FORENSICS (Ref #8 & #12)
 * Task: Maintaining the "Sealed" financial history of the Guba.
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;
const isDetailOpen = ref(false);
const selectedYear = ref(null);

// TASK: Historical Ledger Records (Ref #8 Audit Compliance)
const archivedReports = ref([
  {
    year: "2017 E.C",
    totalRevenue: "540,000",
    totalExpense: "480,000",
    surplus: "60,000", // NEW: The funds handed to the next team
    auditor: "Dn. Solomon K.", // NEW: Auditor identity
    status: "SEALED & LOCKED",
    impact: "Built new Guba Office & expanded Abinet",
  },
  {
    year: "2016 E.C",
    totalRevenue: "420,000",
    totalExpense: "390,000",
    surplus: "30,000",
    auditor: "Memher Tesfaye",
    status: "SEALED",
    impact: "Purchased Yamaha Sound System",
  },
]);

const openYearDetail = (yearData) => {
  selectedYear.value = yearData;
  isDetailOpen.value = true;
};

const handleGlobalSearch = () => {
  alert(
    "Searching across all archived years for matching receipts/vouchers...",
  );
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. ARCHIVE HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Financial Vault
        </h1>
        <p
          class="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none"
        >
          Permanent Record of Stewardship • {{ slug }} Gbi
        </p>
      </div>
      <BaseButton
        variant="secondary"
        icon="lucide:file-search"
        @click="handleGlobalSearch"
      >
        Global Forensic Search
      </BaseButton>
    </div>

    <!-- 2. YEARLY LEDGER CARDS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="report in archivedReports"
        :key="report.year"
        @click="openYearDetail(report)"
        class="group hover:border-maedot-gold cursor-pointer transition-all border-l-8"
        :class="
          report.year === '2017 E.C'
            ? 'border-l-maedot-gold'
            : 'border-l-slate-200'
        "
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10">
            <Icon name="lucide:book-lock" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4
              class="font-black text-sm text-maedot-navy uppercase tracking-tight"
            >
              {{ report.year }} Ledger
            </h4>
            <p class="text-[10px] text-emerald-600 font-black uppercase italic">
              {{ report.status }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- 3. ANNUAL PERFORMANCE TABLE (Ref #8) -->
    <BaseCard
      :padding="false"
      title="Archived Annual Reports"
      subtitle="Summary of historical financial growth"
    >
      <BaseDataTable :data="archivedReports">
        <Column field="year" header="Year" class="font-black text-slate-400" />
        <Column field="totalRevenue" header="Revenue (ETB)">
          <template #body="{ data }">
            <span class="text-emerald-600 font-bold"
              >+{{ data.totalRevenue }}</span
            >
          </template>
        </Column>
        <Column field="totalExpense" header="Expense (ETB)">
          <template #body="{ data }">
            <span class="text-rose-600 font-bold"
              >-{{ data.totalExpense }}</span
            >
          </template>
        </Column>
        <Column field="surplus" header="Surplus (Rollover)">
          <template #body="{ data }">
            <span
              class="px-2 py-1 bg-maedot-gold/10 text-maedot-gold rounded-lg text-[10px] font-black uppercase"
            >
              {{ data.surplus }} ETB
            </span>
          </template>
        </Column>
        <Column
          field="auditor"
          header="Verified By"
          class="text-xs italic text-slate-500"
        />
        <Column header="Audit Trail">
          <template #body="{ data }">
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:file-check"
              @click="openYearDetail(data)"
              class="text-maedot-navy text-[10px] uppercase font-black"
            >
              View Sign-off
            </BaseButton>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>

    <!-- 4. YEARLY DETAIL MODAL (The Deep Dive) -->
    <BaseGovernanceDrawer
      :is-open="isDetailOpen"
      :title="selectedYear?.year + ' Final Report'"
      :description="'Official Auditor Sign-off: ' + selectedYear?.auditor"
      @close="isDetailOpen = false"
    >
      <div class="space-y-6 py-2">
        <div
          class="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4"
        >
          <div class="flex justify-between border-b pb-2">
            <span class="text-[10px] font-black text-slate-400 uppercase"
              >Successive Impact</span
            >
            <span class="text-xs font-bold text-maedot-navy">{{
              selectedYear?.impact
            }}</span>
          </div>
          <div class="flex justify-between pt-2">
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >Rollover to Next Year</span
            >
            <span class="text-sm font-black text-emerald-600"
              >{{ selectedYear?.surplus }} ETB</span
            >
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <BaseButton variant="primary" block icon="lucide:file-down" size="sm"
            >Download Full PDF Statement</BaseButton
          >
          <BaseButton variant="ghost" block icon="lucide:image" size="sm"
            >Search Related Receipts</BaseButton
          >
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
