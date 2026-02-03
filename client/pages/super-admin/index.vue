<script setup>
/**
 * MASTER LOGIC: Platform Intelligence & Oversight
 * Layout: 'super' (The Dark Imperial Layout)
 */
definePageMeta({ layout: "super" });

const route = useRoute();
const isMaintenanceMode = ref(false);
const pendingRequests = ref(3);

// --- GLOBAL METRICS (Aggregated across all Universities) ---
const globalStats = ref([
  {
    title: "Total Gubaes",
    value: "48",
    icon: "lucide:church",
    trend: "Active Tenants",
  },
  {
    title: "Total Students",
    value: "12,450",
    icon: "lucide:users",
    trend: "+1.2k Growth",
  },
  {
    title: "Global Revenue",
    value: "2.4M",
    icon: "lucide:banknote",
    trend: "Network Total",
  },
  {
    title: "Storage Usage",
    value: "99.9%",
    icon: "lucide:database",
    trend: "Stable",
  },
]);

// --- MODULE USAGE HEATMAP (Ref #3 Strategic Growth) ---
const moduleUsage = ref([
  { name: "Education & Abinet", usage: 95, color: "bg-emerald-500" },
  { name: "Finance & Ledger", usage: 82, color: "bg-blue-500" },
  { name: "Member Care", usage: 64, color: "bg-indigo-500" },
  { name: "Audit Service", usage: 45, color: "bg-rose-500" },
]);

// --- TOP PERFORMING GUBAES (Your Previous Ranking Table) ---
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

// --- GLOBAL ACTIVITY FEED (The "Black Box" Audit Log) ---
const auditLogs = ref([
  {
    id: 1,
    event: "Org Approved",
    target: "Wollo University",
    time: "2 mins ago",
    actor: "Super-Admin",
  },
  {
    id: 2,
    event: "PW Reset",
    target: "Fasil Chairperson",
    time: "1 hour ago",
    actor: "Super-Admin",
  },
  {
    id: 3,
    event: "Si-so Finalized",
    target: "Arat Kilo Gbi",
    time: "5 hours ago",
    actor: "System",
  },
]);

const impersonateGuba = (data) => {
  console.log("Super-Admin inspecting Guba Context:", data.name);
};
const isInspectorOpen = ref(false);
const selectedGuba = ref(null);

const openInspector = (data) => {
  selectedGuba.value = data;
  isInspectorOpen.value = true;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. MASTER HEADER & SYSTEM STATE -->
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6"
    >
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

      <!-- Maintenance Mode Toggle -->
      <div
        class="flex items-center gap-4 px-6 py-3 bg-slate-100 rounded-2xl border border-slate-200"
      >
        <div class="flex flex-col text-right">
          <span class="text-[9px] font-black uppercase text-slate-400"
            >System State</span
          >
          <span
            class="text-xs font-bold"
            :class="isMaintenanceMode ? 'text-rose-600' : 'text-emerald-600'"
          >
            {{ isMaintenanceMode ? "Maintenance" : "Active" }}
          </span>
        </div>
        <button
          @click="isMaintenanceMode = !isMaintenanceMode"
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          :class="isMaintenanceMode ? 'bg-rose-600' : 'bg-slate-300'"
        >
          <span
            :class="isMaintenanceMode ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          />
        </button>
      </div>
    </div>

    <!-- 2. GLOBAL METRICS -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        v-for="stat in globalStats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 3. GBI PERFORMANCE RANKING -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false" class="border-l-4 border-slate-300">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
          >
            <h3
              class="font-bold text-slate-800 text-xs uppercase tracking-widest"
            >
              Gubae Performance Ranking
            </h3>
            <BaseButton
              variant="ghost"
              size="sm"
              class="text-[10px]"
              @click="navigateTo('/super-admin/organizations')"
              >View All</BaseButton
            >
          </div>
          <BaseDataTable :data="topGubaes">
            <Column field="name" header="Gubae Name">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="font-black text-slate-900 text-sm">{{
                    data.name
                  }}</span>
                  <span class="text-[10px] text-slate-400 uppercase">{{
                    data.city
                  }}</span>
                </div>
              </template>
            </Column>

            <Column field="members" header="Capacity">
              <template #body="{ data }">
                <div class="text-xs">
                  <span class="font-bold text-slate-700">{{
                    data.members
                  }}</span>
                  <span class="text-slate-400"> students</span>
                </div>
              </template>
            </Column>

            <Column header="Org Health">
              <template #body>
                <div class="flex items-center gap-2">
                  <div
                    class="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden"
                  >
                    <div class="bg-maedot-gold h-full" style="width: 85%"></div>
                  </div>
                  <span class="text-[10px] font-bold text-slate-500"
                    >10/12</span
                  >
                </div>
              </template>
            </Column>

            <Column header="Report Status">
              <template #body>
                <span
                  class="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tighter"
                >
                  Q3 SIGNED
                </span>
              </template>
            </Column>

            <Column header="Audit Risk">
              <template #body>
                <span
                  class="flex items-center gap-1 text-[10px] font-bold text-slate-400"
                >
                  <Icon
                    name="lucide:shield-check"
                    class="w-3 h-3 text-emerald-500"
                  />
                  SECURE
                </span>
              </template>
            </Column>

            <Column header="Control">
              <template #body="{ data }">
                <BaseButton
                  variant="ghost"
                  size="sm"
                  class="hover:bg-slate-500 hover:text-white transition-all"
                  icon="lucide:terminal"
                  @click="openInspector(data)"
                >
                  Debug
                </BaseButton>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 4. ONBOARDING & ACTIVITY SIDEBAR -->
      <div class="xl:col-span-4 space-y-6">
        <!-- Usage Heatmap (Strategic Growth Intelligence) -->
        <BaseCard
          title="Module Adoption"
          class="bg-white border border-slate-200"
        >
          <div class="space-y-4 py-2">
            <div v-for="mod in moduleUsage" :key="mod.name" class="space-y-1.5">
              <div
                class="flex justify-between text-[10px] font-bold text-slate-500 uppercase"
              >
                <span>{{ mod.name }}</span>
                <span>{{ mod.usage }}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  class="h-full"
                  :class="mod.color"
                  :style="{ width: mod.usage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Onboarding Pipeline Widget -->
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
            Onboarding Queue
          </h4>
          <div class="space-y-4 relative z-10">
            <div
              v-for="req in 2"
              :key="req"
              class="border-l-2 border-maedot-gold pl-4 py-1"
            >
              <p class="text-xs font-bold">Wollo University Gbi</p>
              <p class="text-[10px] text-slate-400">Letter Verified • Oct 30</p>
            </div>
          </div>
          <BaseButton
            variant="primary"
            block
            size="sm"
            class="mt-6 shadow-lg shadow-maedot-gold/20"
            @click="navigateTo('/super-admin/organizations/requests')"
          >
            Review Applications ({{ pendingRequests }})
          </BaseButton>
        </BaseCard>
      </div>
    </div>
    <!-- CLEAN & REUSABLE CALL -->
    <SuperInspectionDrawer
      :is-open="isInspectorOpen"
      :guba="selectedGuba"
      @close="isInspectorOpen = false"
    >
      <!-- Put your debug tasks here -->
      <div class="space-y-4">
        <h3 class="text-xs font-black uppercase text-slate-400">
          Gubae Health
        </h3>
        <p class="text-sm">
          API Status: <span class="text-emerald-500 font-bold">Online</span>
        </p>
        <p class="text-sm">Leaders Created: 10/12</p>
      </div>
    </SuperInspectionDrawer>
  </div>
</template>
