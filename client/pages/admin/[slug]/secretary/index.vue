<script setup>
definePageMeta({ layout: "admin" });

const recentLetters = ref([
  {
    id: 1,
    ref: "FG-042/18",
    subject: "Hall Reservation for Zikr",
    type: "OUT",
    date: "Oct 28",
  },
  {
    id: 2,
    ref: "MK-201/18",
    subject: "Annual Budget Guidelines",
    type: "IN",
    date: "Oct 29",
  },
]);
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Records & Governance
        </h1>
        <p class="text-sm text-slate-500 font-medium italic">
          "Accuracy in records ensures the truth for the next generation."
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:mail-plus"
          @click="navigateTo(`/admin/${$route.params.slug}/secretary/protocol`)"
          >Register Letter</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:clipboard-list"
          @click="navigateTo(`/admin/${$route.params.slug}/secretary/minutes`)"
          >Start Meeting Minutes</BaseButton
        >
      </div>
    </div>

    <!-- Governance Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Letters (This Month)"
        value="24"
        icon="lucide:mails"
      />
      <BaseStatCard title="Senate Meetings" value="08" icon="lucide:users" />
      <BaseStatCard
        title="Unresolved Tasks"
        value="05"
        icon="lucide:list-checks"
        :trend-up="false"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- 1. RECENT CORRESPONDENCE (Ref #3 Protocol Registry) -->
      <div class="xl:col-span-2">
        <BaseDataTable
          title="Inward/Outward Protocol Registry"
          :data="recentLetters"
        >
          <Column field="ref" header="Ref Number" />
          <Column field="subject" header="Subject" />
          <Column field="type" header="Type">
            <template #body="{ data }">
              <span
                class="text-[10px] font-black uppercase"
                :class="
                  data.type === 'IN' ? 'text-emerald-600' : 'text-maedot-gold'
                "
              >
                {{ data.type }}
              </span>
            </template>
          </Column>
          <Column header="Action">
            <template #body>
              <BaseButton variant="ghost" size="sm" icon="lucide:file-text"
                >View Scan</BaseButton
              >
            </template>
          </Column>
        </BaseDataTable>
      </div>

      <!-- 2. SENATE TASK STATUS (Ref #3 Task Manager) -->
      <div class="space-y-6">
        <AdminQuickActions
          title="Administrative Tools"
          :actions="[
            {
              label: 'Generate Quarterly Si-so',
              icon: 'lucide:file-bar-chart',
              command: () => {},
            },
            {
              label: 'Verify New Members',
              icon: 'lucide:user-plus',
              command: () => {},
            },
            {
              label: 'Update Alumni Records',
              icon: 'lucide:graduation-cap',
              command: () => {},
            },
          ]"
        />

        <!-- Pending Decisions Widget -->
        <BaseCard class="border-l-4 border-maedot-navy">
          <h4
            class="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest"
          >
            Active Senate Decisions
          </h4>
          <div class="space-y-4">
            <div v-for="task in 2" :key="task" class="space-y-1">
              <p class="text-xs font-bold text-maedot-navy">
                Purchase 5 New Kiddase Books
              </p>
              <div class="flex justify-between items-center text-[10px]">
                <span class="text-maedot-gold font-bold">DEPT: FINANCE</span>
                <span class="text-slate-400">STATUS: PENDING</span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
