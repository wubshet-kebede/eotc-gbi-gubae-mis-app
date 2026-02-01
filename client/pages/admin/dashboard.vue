<script setup>
definePageMeta({
  layout: "admin", // This tells Nuxt to wrap the page in layouts/admin.vue
});
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

    <!-- Next: Lower Dashboard Sections (Charts or Tables) -->
  </div>
</template>
