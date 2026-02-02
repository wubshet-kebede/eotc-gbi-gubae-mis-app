<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end border-b border-slate-200 pb-6">
      <div>
        <h1
          class="text-3xl font-black text-slate-900 uppercase tracking-tighter"
        >
          Platform Intelligence
        </h1>
        <p class="text-sm text-slate-500 font-medium italic">
          Master Oversight of the Ma'edot Digital Network.
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:map-pin"
          @click="navigateTo('/super-admin/cities')"
          >Manage Cities</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:plus-circle"
          @click="navigateTo('/super-admin/organizations/requests')"
        >
          Pending Requests ({{ pendingRequests }})
        </BaseButton>
      </div>
    </div>

    <!-- Global Network Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Total Gubaes"
        value="48"
        icon="lucide:church"
        trend="Active Tenants"
      />
      <BaseStatCard
        title="Total Students"
        value="12,450"
        icon="lucide:users"
        trend="+1.2k"
      />
      <BaseStatCard
        title="Global Revenue"
        value="2.4M ETB"
        icon="lucide:banknote"
        trend="Across Network"
      />
      <BaseStatCard
        title="System Uptime"
        value="99.9%"
        icon="lucide:cpu"
        trend="Stable"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. ACTIVE TENANTS BY REGION (Ref #10 Global Directory) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false" class="border-l-4 border-slate-900">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
          >
            <h3
              class="font-bold text-slate-800 text-xs uppercase tracking-widest"
            >
              Gbi Gubae Performance Ranking
            </h3>
            <span class="text-[10px] font-black text-slate-400"
              >Sort by: Activity Level</span
            >
          </div>

          <BaseDataTable :data="topGubaes">
            <Column
              field="name"
              header="Gubae Name"
              class="font-black text-slate-900"
            />
            <Column field="city" header="City / Diocese" />
            <Column field="members" header="Students" />
            <Column field="status" header="Network Status">
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                  ></div>
                  <span
                    class="text-[10px] font-black uppercase text-emerald-600"
                    >{{ data.status }}</span
                  >
                </div>
              </template>
            </Column>
            <Column header="Access">
              <template #body="{ data }">
                <BaseButton
                  variant="ghost"
                  size="sm"
                  icon="lucide:external-link"
                  @click="impersonateGuba(data)"
                  >Inspect</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. SUPER-ADMIN QUICK CONTROLS -->
      <div class="xl:col-span-4 space-y-8">
        <AdminQuickActions
          title="Platform Controls"
          :actions="[
            {
              label: 'Broadcast System Update',
              icon: 'lucide:megaphone',
              command: () => {},
            },
            {
              label: 'Database Backup',
              icon: 'lucide:database',
              command: () => {},
            },
            {
              label: 'Review Audit Failures',
              icon: 'lucide:shield-alert',
              command: () => {},
            },
          ]"
        />

        <!-- Ref #2: New Onboarding Widget -->
        <BaseCard
          class="bg-slate-900 border-none text-white relative overflow-hidden group"
        >
          <Icon
            name="lucide:zap"
            class="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 text-maedot-gold group-hover:scale-110 transition-transform"
          />
          <h4
            class="text-maedot-gold font-black uppercase text-[10px] mb-4 tracking-widest"
          >
            Onboarding Pipeline
          </h4>
          <div class="space-y-4 relative z-10">
            <div
              v-for="req in 2"
              :key="req"
              class="border-l-2 border-maedot-gold pl-4 py-1"
            >
              <p class="text-xs font-bold">Wollo University Gbi</p>
              <p class="text-[10px] text-slate-400">
                Recommendation Letter Verified
              </p>
            </div>
          </div>
          <BaseButton
            variant="primary"
            block
            size="sm"
            class="mt-6"
            @click="navigateTo('/super-admin/organizations/requests')"
          >
            Review Applications
          </BaseButton>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" }); // We can use the same layout or a custom one later

const pendingRequests = ref(3);

const topGubaes = ref([
  {
    id: 1,
    name: "Fasil Gbi Gubae",
    city: "Gondar",
    members: "1,450",
    status: "SYNCHRONIZED",
  },
  {
    id: 2,
    name: "Tewodros Gbi Gubae",
    city: "Gondar",
    members: "890",
    status: "SYNCHRONIZED",
  },
  {
    id: 3,
    name: "Arat Kilo Gbi Gubae",
    city: "Addis Ababa",
    members: "2,100",
    status: "SYNCHRONIZED",
  },
]);

const impersonateGuba = (data) => {
  console.log("Super-Admin inspecting Guba:", data.name);
  // Implementation: Switches context to that specific Gbi for debugging
};
</script>
