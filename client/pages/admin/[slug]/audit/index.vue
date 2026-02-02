<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Audit & Compliance
        </h1>
        <p class="text-sm text-slate-500 font-medium italic">
          "Guardians of Institutional Integrity & Financial Rule-of-Law."
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:shield-check"
        @click="runFullSystemAudit"
      >
        Run Automated Reconciliation
      </BaseButton>
    </div>

    <!-- Compliance Stats (Ref #12 Automated Transaction Reconciliation) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="System Health"
        value="94%"
        icon="lucide:activity"
        trend="Stable"
      />
      <BaseStatCard
        title="Open Findings"
        value="03"
        icon="lucide:alert-circle"
        :trend-up="false"
        trend="High Priority"
      />
      <BaseStatCard title="Receipt Coverage" value="100%" icon="lucide:image" />
      <BaseStatCard
        title="Unreconciled"
        value="0.00 ETB"
        icon="lucide:check-circle"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. FINDINGS LOG (Ref #12 Non-Compliance Tracker) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-rose-50/30"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Active Discrepancy Tickets
            </h3>
            <span class="text-[10px] font-black text-rose-600 animate-pulse"
              >ACTION REQUIRED</span
            >
          </div>

          <BaseDataTable :data="auditFindings">
            <Column field="dept" header="Department" />
            <Column field="issue" header="Discrepancy Description" />
            <Column field="severity" header="Severity">
              <template #body="{ data }">
                <span
                  class="px-2 py-0.5 rounded text-[9px] font-black uppercase"
                  :class="
                    data.severity === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-amber-100 text-amber-600'
                  "
                >
                  {{ data.severity }}
                </span>
              </template>
            </Column>
            <Column header="Status">
              <template #body="{ data }">
                <BaseButton
                  size="sm"
                  :variant="data.fixed ? 'secondary' : 'primary'"
                  class="text-[10px]"
                >
                  {{ data.fixed ? "Verify Fix" : "Escalate" }}
                </BaseButton>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. HANDOVER MONITOR (Ref #12 Digital Sign-off Log) -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Audit Controls"
          :actions="[
            {
              label: 'Issue Dept Clearance',
              icon: 'lucide:lock-keyhole',
              command: () => {},
            },
            {
              label: 'Spot-Check Inventory',
              icon: 'lucide:search',
              command: () => {},
            },
            {
              label: 'Export Audit Trail',
              icon: 'lucide:file-text',
              command: () => {},
            },
          ]"
        />

        <BaseCard
          title="Handover Oversight"
          class="bg-maedot-navy text-white border-none"
        >
          <p class="text-[11px] text-slate-400 mb-4 leading-relaxed">
            Monitor the **Handover** of all 12 departments. You must sign the
            "Clearance" before the Chairperson finalizes the succession.
          </p>
          <div class="space-y-2 border-t border-white/10 pt-4">
            <div
              v-for="h in [
                'Finance: Cleared',
                'Education: Pending',
                'Secretary: Cleared',
              ]"
              :key="h"
              class="flex justify-between text-[10px] uppercase font-black"
            >
              <span>{{ h.split(":")[0] }}</span>
              <span
                :class="
                  h.includes('Cleared') ? 'text-emerald-400' : 'text-amber-400'
                "
                >{{ h.split(":")[1] }}</span
              >
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const auditFindings = ref([
  {
    id: 1,
    dept: "Finance",
    issue: "Missing Receipt for Taxi (120 ETB)",
    severity: "LOW",
    fixed: false,
  },
  {
    id: 2,
    dept: "Revenue",
    issue: "Unreconciled Zikir Funds (5,200 ETB)",
    severity: "CRITICAL",
    fixed: false,
  },
  {
    id: 3,
    dept: "Arts",
    issue: "Krar Missing from Asset Log",
    severity: "MEDIUM",
    fixed: true,
  },
]);

const runFullSystemAudit = () => {
  alert(
    "Scanning Database... All receipts verified against ledger entries. System Health: 94%.",
  );
};
</script>
