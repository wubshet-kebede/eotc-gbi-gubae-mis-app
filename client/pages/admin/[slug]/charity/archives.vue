<script setup>
/**
 * CHARITY & PROFESSIONAL ARCHIVES (Ref #10)
 * Task: Maintaining the Permanent Ledger of Mercy & Professional Impact
 */
import BaseGovernanceDrawer from "~/components/base/BaseGovernanceDrawer.vue";
definePageMeta({ layout: "admin" });
const isYearDetailOpen = ref(false);
const selectedYear = ref("");
const route = useRoute();
const slug = route.params.slug;

// TASK: Historical Mercy Records (Keeping names for Alumni gratitude)
const pastMercyRecords = ref([
  {
    year: "2017 E.C.",
    beneficiary: "Kassa Tadesse",
    type: "Medical Surgery Support",
    amount: "15,000",
    impact: "Successful recovery & returned to class",
    docUrl: "#",
  },
  {
    year: "2016 E.C.",
    beneficiary: "Martha Hailu",
    type: "Final Year Tuition",
    amount: "4,500",
    impact: "Graduated with honors",
    docUrl: "#",
  },
]);

// TASK: Professional Legacy Projects (Ref #10)
const pastProjects = ref([
  {
    title: "Campus Health Clinic",
    field: "Medical/Health",
    impact: "240 Students Assisted",
    estimatedValue: "45,000 ETB", // What the church saved
  },
  {
    title: "Tseda Church Design",
    field: "Civil Engineering",
    impact: "Drafts Delivered to Ma'ekel",
    estimatedValue: "120,000 ETB",
  },
]);

const exportImpactReport = async () => {
  // 1. Trigger 'Processing' state
  loading.value = true;

  // 2. Logic: Fetch full history for the current slug
  const reportData = {
    totalMercy: "19,500 ETB",
    totalSavings: "165,000 ETB",
    beneficiaries: ["Kassa T.", "Martha H."],
    generatedBy: "Charity Head ID #10",
  };

  // 3. UI Outcome: Download the formatted PDF
  console.log("Generating Document for Church Ma'ekel...");

  setTimeout(() => {
    loading.value = false;
    // In production, this triggers a window.open(pdfUrl)
    alert("Impact Report Generated! Ready for Chairperson's Review.");
  }, 2000);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. LEGACY HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          Social Impact Archives
        </h1>
        <p
          class="text-xs text-slate-500 font-bold uppercase tracking-widest italic"
        >
          The Permanent Record of Mercy & Mind
        </p>
      </div>
      <div class="text-right space-y-2">
        <p class="text-[10px] font-black text-slate-400 uppercase leading-none">
          Total Estimated Professional Savings
        </p>
        <p class="text-3xl font-black text-maedot-gold leading-none">
          165,000 ETB
        </p>
        <BaseButton
          variant="secondary"
          size="sm"
          icon="lucide:printer"
          @click="exportImpactReport"
          >Export Impact Report</BaseButton
        >
      </div>
    </div>

    <!-- 2. YEARLY SNAPSHOTS (Ref #10 Service Impact) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="yr in ['2015 E.C', '2016 E.C', '2017 E.C']"
        :key="yr"
        class="group hover:border-maedot-gold cursor-pointer transition-all"
        @click="((selectedYear = yr), (isYearDetailOpen = true))"
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
              Archive Sealed
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- 3. PERMANENT MERCY LEDGER (Names Kept for Alumni Recognition) -->
    <BaseCard
      :padding="false"
      title="Historical Mercy Records"
      subtitle="Tracking the lifelong bond with our beneficiaries"
    >
      <BaseDataTable :data="pastMercyRecords">
        <Column field="year" header="Year" class="text-slate-400 font-bold" />
        <Column
          field="beneficiary"
          header="Beneficiary Name"
          class="font-black text-maedot-navy"
        />
        <Column field="type" header="Support Provided" />
        <Column
          field="amount"
          header="Value (ETB)"
          class="font-bold text-emerald-600"
        />
        <Column field="impact" header="Outcome Note" class="italic text-xs" />
        <Column header="Case Study">
          <template #body>
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:file-text"
              class="text-maedot-gold font-black uppercase text-[10px]"
              >Read Record</BaseButton
            >
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>

    <!-- 4. HISTORICAL PROFESSIONAL PROJECTS -->
    <BaseCard
      :padding="false"
      title="Professional Legacy Projects"
      class="border-t-4 border-maedot-navy"
    >
      <BaseDataTable :data="pastProjects">
        <Column
          field="title"
          header="Project Name"
          class="font-black text-slate-700"
        />
        <Column field="field" header="Field" />
        <Column field="impact" header="Scope" />
        <Column field="estimatedValue" header="Market Value Saved">
          <template #body="{ data }">
            <span
              class="px-2 py-1 bg-maedot-gold/10 text-maedot-gold rounded-lg text-[10px] font-black uppercase"
            >
              {{ data.estimatedValue }}
            </span>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
    <BaseGovernanceDrawer
      :is-open="isYearDetailOpen"
      :title="`Snapshot: ${selectedYear}`"
      description="Historical performance and social impact data."
      @close="isYearDetailOpen = false"
    >
      <div class="space-y-4">
        <!-- Quick Stats for that Year -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 rounded-2xl">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Mercy Spend
            </p>
            <p class="text-sm font-black text-maedot-navy">14,200 ETB</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Pro Savings
            </p>
            <p class="text-sm font-black text-emerald-600">82,000 ETB</p>
          </div>
        </div>

        <!-- Top 3 Projects of that year -->
        <div class="space-y-2">
          <p class="text-[10px] font-black text-slate-400 uppercase">
            Top Legacy Projects
          </p>
          <ul class="text-xs space-y-1 italic text-slate-600">
            <li>• Church Wall Design (Civil)</li>
            <li>• Student Eye Clinic (Medical)</li>
          </ul>
        </div>

        <BaseButton variant="primary" block size="sm" icon="lucide:file-down">
          Download Full Year Book
        </BaseButton>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
