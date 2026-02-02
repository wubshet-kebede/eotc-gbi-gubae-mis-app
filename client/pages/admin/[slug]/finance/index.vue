<script setup>
definePageMeta({ layout: "admin" });
</script>
<template>
  <div class="space-y-8">
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-3xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Treasury Overview
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Consolidated Financial Standing of {{ $route.params.slug }}
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:layout-grid"
        @click="navigateTo(`/admin/${$route.params.slug}/finance/ledger`)"
      >
        Open General Ledger
      </BaseButton>
    </div>

    <!-- High-Level Cashflow -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Total Liquidity"
        value="329,500 ETB"
        icon="lucide:landmark"
      />
      <BaseStatCard
        title="Income (Month)"
        value="+42,000"
        icon="lucide:trending-up"
      />
      <BaseStatCard
        title="Expense (Month)"
        value="-12,500"
        icon="lucide:trending-down"
        :trend-up="false"
      />
      <BaseStatCard
        title="Active Assets"
        value="156 Items"
        icon="lucide:package-search"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div class="xl:col-span-8">
        <!-- Cashflow Trend Logic would go here (Ref #11 BI) -->
        <BaseCard
          title="Monthly Cashflow Breakdown"
          class="h-64 flex items-center justify-center border-dashed border-2 border-slate-200"
        >
          <p class="text-slate-400 font-medium italic">
            Revenue vs. Expense Visualization (Integration Ready)
          </p>
        </BaseCard>
      </div>

      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Finance Control"
          :actions="[
            {
              label: 'Reconcile Bank Statement',
              icon: 'lucide:refresh-ccw',
              command: () => {},
            },
            {
              label: 'Generate Audit Pack',
              icon: 'lucide:file-lock',
              command: () => {},
            },
            {
              label: 'Asset Verification',
              icon: 'lucide:clipboard-list',
              command: () =>
                navigateTo(`/admin/${$route.params.slug}/finance/property`),
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>
