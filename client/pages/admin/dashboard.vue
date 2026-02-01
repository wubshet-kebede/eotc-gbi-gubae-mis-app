<script setup>
definePageMeta({
  layout: "admin", // This tells Nuxt to wrap the page in layouts/admin.vue
});
const financeData = ref([
  { id: 1, member: "Abebe K.", amount: 500, type: "In", status: "Verified" },
  { id: 2, member: "Selam T.", amount: 1200, type: "Out", status: "Pending" },
  { id: 3, member: "Dawit Z.", amount: 300, type: "In", status: "Verified" },
]);
</script>

<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-black text-maedot-navy">
          Department Overview
        </h1>
        <p class="text-sm text-slate-500">
          Real-time performance metrics for Fasil Gbi Gubae.
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton variant="secondary" icon="lucide:download"
          >Export Report</BaseButton
        >
        <BaseButton variant="primary" icon="lucide:plus"
          >New Activity</BaseButton
        >
      </div>
    </div>

    <!-- Stats Grid: 1 col on mobile, 2 on tablet, 4 on desktop -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Total Members"
        value="452"
        icon="lucide:users"
        trend="+12%"
      />
      <BaseStatCard
        title="Pending Reports"
        value="03"
        icon="lucide:file-text"
        trend="-2"
        :trend-up="false"
      />
      <BaseStatCard
        title="Budget Remaining"
        value="12,400 ETB"
        icon="lucide:wallet"
        trend="+5.4%"
      />
      <BaseStatCard
        title="Avg. Attendance"
        value="88%"
        icon="lucide:calendar-check"
        trend="+2%"
      />
    </div>

    <!-- primevue table -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div class="xl:col-span-8">
        <BaseDataTable
          title="Recent Transactions"
          :data="financeData"
          :loading="false"
        >
          <!-- Column 1: Member Info -->
          <Column field="member" header="Member">
            <template #body="{ data }">
              <div class="flex items-center gap-3 font-bold text-maedot-navy">
                <div
                  class="w-8 h-8 rounded-lg bg-maedot-gold/10 flex items-center justify-center text-maedot-gold"
                >
                  {{ data.member.charAt(0) }}
                </div>
                {{ data.member }}
              </div>
            </template>
          </Column>

          <!-- Column 2: Amount -->
          <Column field="amount" header="Amount">
            <template #body="{ data }">
              <span
                :class="
                  data.type === 'In' ? 'text-emerald-600' : 'text-rose-600'
                "
              >
                {{ data.type === "In" ? "+" : "-" }}{{ data.amount }} ETB
              </span>
            </template>
          </Column>

          <!-- Column 3: Status Badge -->
          <Column field="status" header="Status">
            <template #body="{ data }">
              <span
                class="px-2 py-1 rounded-md text-[10px] font-black uppercase bg-slate-100"
              >
                {{ data.status }}
              </span>
            </template>
          </Column>
        </BaseDataTable>
      </div>
      <!-- QUICK ACTIONS AND SYSTEM STATUS -->
      <div class="xl:col-span-4 space-y-8">
        <AdminQuickActions />

        <!-- Optional: A mini-calendar or notification feed -->
        <!-- <AdminMiniNotifications /> -->
      </div>
    </div>
  </div>
</template>
