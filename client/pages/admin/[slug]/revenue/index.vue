<script setup>
definePageMeta({ layout: "admin" });
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Revenue Dashboard
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Growth, Sales, and Fundraising Analytics.
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:arrow-right-left"
        @click="navigateTo(`/admin/${$route.params.slug}/revenue/inventory`)"
      >
        Manage Inventory
      </BaseButton>
    </div>

    <!-- Revenue Stats (Ref #7) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Total Earnings"
        value="408,500 ETB"
        icon="lucide:trending-up"
        trend="+18%"
      />
      <BaseStatCard
        title="Inventory Value"
        value="12,450 ETB"
        icon="lucide:package"
      />
      <BaseStatCard
        title="Donations (Zikir)"
        value="320,500 ETB"
        icon="lucide:heart"
        trend="+5%"
      />
      <BaseStatCard
        title="Held Cash"
        value="5,200 ETB"
        icon="lucide:banknote"
        trend="Need Transfer"
        :trend-up="false"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. CAMPAIGN PERFORMANCE (Ref #7 Campaign Manager) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div class="p-6 border-b border-slate-100">
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Active Campaign Progress
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <div v-for="c in 2" :key="c" class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="font-bold text-slate-700"
                  >Zikir 2018 Campaign</span
                >
                <span class="text-maedot-gold font-black">64%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-maedot-gold h-full" style="width: 64%"></div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 2. COMPLIANCE & QUICK ACTIONS -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Revenue Controls"
          :actions="[
            {
              label: 'Initiate Fund Transfer',
              icon: 'lucide:lock',
              command: () => {},
            },
            {
              label: 'Inventory Handover',
              icon: 'lucide:clipboard-check',
              command: () =>
                navigateTo(`/admin/${$route.params.slug}/revenue/handover`),
            },
            {
              label: 'Download Sales Report',
              icon: 'lucide:file-text',
              command: () => {},
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>
