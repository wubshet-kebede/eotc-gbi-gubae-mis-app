<script setup>
definePageMeta({ layout: "admin" });

const statusColors = {
  PENDING: "bg-amber-100 text-amber-600",
  IN_CONSULTATION: "bg-blue-100 text-blue-600",
  RESOLVED: "bg-emerald-100 text-emerald-600",
};

const activeTickets = ref([
  {
    id: 1,
    student: "Selamawit T.",
    type: "Financial Support",
    status: "PENDING",
  },
  {
    id: 2,
    student: "Bereket D.",
    type: "Spiritual Counseling",
    status: "IN_CONSULTATION",
  },
  { id: 3, student: "Kidus G.", type: "Academic Tutoring", status: "PENDING" },
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
          Member Support Center
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Tracking student well-being and spiritual mentorship.
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:message-square-plus"
        @click="navigateTo(`/admin/${$route.params.slug}/care/tickets`)"
      >
        Open New Case
      </BaseButton>
    </div>

    <!-- CRM Stats (Ref #5 Lifecycle Management) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard title="Total Members" value="1,450" icon="lucide:users" />
      <BaseStatCard
        title="Active Cases"
        value="12"
        icon="lucide:life-buoy"
        trend="Attention"
        :trend-up="false"
      />
      <BaseStatCard
        title="Mentorship Coverage"
        value="88%"
        icon="lucide:heart-handshake"
      />
      <BaseStatCard
        title="Resolved (Month)"
        value="42"
        icon="lucide:check-circle"
        trend="+5"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- Active Support Pipeline (Ref #5 Case Management) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Active Support Tickets
            </h3>
          </div>
          <BaseDataTable :data="activeTickets">
            <Column field="student" header="Student" />
            <Column field="type" header="Category" />
            <Column field="status" header="Status">
              <template #body="{ data }">
                <span
                  class="px-2 py-1 rounded text-[10px] font-black uppercase"
                  :class="statusColors[data.status]"
                >
                  {{ data.status }}
                </span>
              </template>
            </Column>
            <Column header="Action">
              <template #body>
                <BaseButton
                  size="sm"
                  variant="ghost"
                  icon="lucide:external-link"
                  >Update Case</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- Mentorship Stats & Actions -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Care Tasks"
          :actions="[
            {
              label: 'Map Niseha Abat',
              icon: 'lucide:user-cog',
              command: () => {},
            },
            {
              label: 'Incident Report',
              icon: 'lucide:alert-triangle',
              command: () => {},
            },
            {
              label: 'Graduation List Prep',
              icon: 'lucide:graduation-cap',
              command: () => {},
            },
          ]"
        />

        <!-- Ref #5: Incident Reporting Widget -->
        <BaseCard class="bg-rose-50 border-rose-200">
          <div class="flex items-center gap-2 text-rose-700 mb-2">
            <Icon name="lucide:shield-alert" class="w-4 h-4" />
            <p class="text-[10px] font-black uppercase">Urgent Campus Alerts</p>
          </div>
          <p class="text-xs text-rose-600 font-medium">
            2 reports of security concerns near 4-Kilo campus. Batch reps
            notified.
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
