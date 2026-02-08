<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. STRATEGIC HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Business Intelligence
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Institutional Performance & Reporting Oversight
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-bar-chart"
        :loading="isGeneratingReport"
        @click="generateQuarterlyReport"
      >
        Merge & Generate Si-so
      </BaseButton>
    </div>

    <!-- 2. PERFORMANCE KPIs (Ref #11 Aggregator) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <BaseStatCard
        title="Overall Execution"
        value="78%"
        icon="lucide:gauge"
        trend="+5%"
      />
      <BaseStatCard
        title="Audit Compliance"
        value="10/12"
        icon="lucide:clipboard-check"
        subtitle="Locked Reports"
      />
      <BaseStatCard
        title="Active Projects"
        value="14"
        icon="lucide:rocket"
        class="text-maedot-gold"
      />
      <BaseStatCard
        title="Reporting Health"
        value="Healthy"
        icon="lucide:activity"
        class="text-emerald-600"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 3. KPI TRACKER TABLE -->
      <div class="xl:col-span-8">
        <BaseCard
          :padding="false"
          title="Departmental KPI Monitoring"
          subtitle="Live comparison of Planned vs. Actual tasks"
        >
          <BaseDataTable :data="deptPerformance">
            <Column
              field="name"
              header="Department"
              class="font-bold text-slate-700"
            />
            <Column field="status" header="Audit Status">
              <template #body="{ data }">
                <span
                  :class="
                    data.status === 'APPROVED'
                      ? 'text-emerald-500 bg-emerald-50 border-emerald-100'
                      : 'text-amber-500 bg-amber-50 border-amber-100'
                  "
                  class="px-2 py-0.5 rounded text-[8px] font-black uppercase border"
                >
                  {{ data.status }}
                </span>
              </template>
            </Column>
            <Column header="Execution Rate">
              <template #body="{ data }">
                <div class="flex items-center gap-3">
                  <div
                    class="flex-grow bg-slate-100 h-1.5 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full transition-all duration-1000"
                      :class="getRateColor(data.rate)"
                      :style="{ width: data.rate + '%' }"
                    ></div>
                  </div>
                  <span class="text-[10px] font-black">{{ data.rate }}%</span>
                </div>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 4. CONTROLS & TIMELINES -->
      <div class="xl:col-span-4 space-y-6">
        <AdminActionButton title="Strategic Controls" :actions="planactions" />

        <BaseCard
          class="bg-maedot-navy text-white border-none relative overflow-hidden"
        >
          <Icon
            name="lucide:info"
            class="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 text-maedot-gold"
          />
          <div class="flex items-center gap-2 mb-3 text-maedot-gold">
            <p
              class="text-[10px] font-black uppercase tracking-widest leading-none"
            >
              Quarterly Deadline
            </p>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed mb-4 italic">
            Q1 Performance Lock in
            <span class="text-white font-bold">4 Days</span>. All departmental
            KPIs must be verified by the Planning Head before the **Ma'ekel**
            master PDF is generated.
          </p>
        </BaseCard>
      </div>
    </div>

    <!-- MODAL 1: SET ANNUAL ROADMAP (Target Selection) -->
    <BaseGovernanceDrawer
      :is-open="isGoalModalOpen"
      title="Set Annual Master Roadmap"
      description="Define numerical targets for each of the 12 departments."
      @close="isGoalModalOpen = false"
      @confirm="setAnnualGoals"
    >
      <div class="space-y-4 py-2">
        <div
          v-for="dept in ['Education', 'Finance', 'Charity']"
          :key="dept"
          class="flex gap-4 items-center"
        >
          <span class="text-xs font-bold text-slate-500 w-24">{{ dept }}</span>
          <BaseInput
            type="number"
            placeholder="Annual Task Count"
            class="flex-1"
          />
        </div>
      </div>
    </BaseGovernanceDrawer>

    <!-- DRAWER 1: AUDIT INCOMING SUBMISSIONS -->
    <BaseGovernanceDrawer
      :is-open="isAuditDrawerOpen"
      title="Incoming Report Audit"
      subtitle="Verify PDF submissions from Department Heads"
      @close="isAuditDrawerOpen = false"
    >
      <div class="space-y-6">
        <div
          v-for="dept in deptPerformance.filter(
            (d) => d.status === 'SUBMITTED',
          )"
          :key="dept.name"
          class="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4"
        >
          <div class="flex justify-between items-center">
            <p
              class="text-sm font-black text-maedot-navy uppercase tracking-tighter"
            >
              {{ dept.name }} Q1
            </p>
            <BaseButton
              size="sm"
              variant="ghost"
              icon="lucide:eye"
              class="text-maedot-gold"
              >Review PDF</BaseButton
            >
          </div>
          <div class="flex gap-2">
            <BaseButton
              block
              size="sm"
              variant="primary"
              icon="lucide:check"
              @click="handleAuditAction(dept, 'APPROVE')"
              >Approve</BaseButton
            >
            <BaseButton
              block
              size="sm"
              variant="ghost"
              class="text-rose-600 font-black uppercase text-[10px]"
              @click="handleAuditAction(dept, 'REJECT')"
              >Reject</BaseButton
            >
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>

<script setup>
/**
 * BUSINESS INTELLIGENCE & PLANNING HUB (Ref #2 & #11)
 * Logic: Annual Target Setting, Departmental Report Auditing, and Quarterly Si-so Merging
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- STATE ---
const isGoalModalOpen = ref(false);
const isAuditDrawerOpen = ref(false);
const isGeneratingReport = ref(false);

const deptPerformance = ref([
  { name: "Education", planned: 12, actual: 9, rate: 75, status: "SUBMITTED" },
  { name: "Hymn & Arts", planned: 8, actual: 8, rate: 100, status: "APPROVED" },
  { name: "Finance", planned: 4, actual: 4, rate: 100, status: "APPROVED" },
  { name: "Member Care", planned: 15, actual: 12, rate: 80, status: "PENDING" },
]);

// --- LOGIC: WORKFLOW ACTIONS ---

const setAnnualGoals = () => {
  // Logic: Logic to broadcast "Master Targets" to all department headers
  alert(
    "Initializing Master 2018 E.C. Roadmap. All 12 departments will receive their numeric targets via the [Ma'edot System Notification](url_to_notifications).",
  );
  isGoalModalOpen.value = false;
};

const handleAuditAction = (dept, action) => {
  // Logic: State transition for the Audit workflow
  if (action === "APPROVE") {
    alert(
      `Success: ${dept.name}'s Quarterly Report has been verified and SEALED for the Si-so.`,
    );
    dept.status = "APPROVED";
  } else {
    const reason = prompt(`Enter rejection reason for ${dept.name}:`);
    if (reason)
      alert(
        `Report rejected. ${dept.name} Head notified to resubmit with corrections.`,
      );
  }
};

const generateQuarterlyReport = () => {
  isGeneratingReport.value = true;
  // Logic: Merges 12 PDFs + Dashboard Analytics into one Unified Master PDF
  setTimeout(() => {
    isGeneratingReport.value = false;
    alert(
      "Ma'edot Engine: 12 Departmental Reports Merged. Quarterly Si-so PDF is ready for Ma'ekel submission.",
    );
  }, 3000);
};

const getRateColor = (rate) => {
  if (rate >= 90) return "bg-emerald-500 shadow-sm";
  if (rate >= 70) return "bg-maedot-gold shadow-sm";
  return "bg-rose-500 shadow-sm";
};
const planactions = [
  {
    label: "Set Annual Roadmap",
    icon: "lucide:target",
    command: () => (isGoalModalOpen = true),
  },
  {
    label: "Review Submissions",
    icon: "lucide:search",
    command: () => (isAuditDrawerOpen = true),
  },
  {
    label: "Emergency Deadline",
    icon: "lucide:bell-ring",
    command: () => alert("Broadcasting SMS alert to lagging Dept Heads..."),
  },
];
</script>
