<script setup>
definePageMeta({ layout: "admin" });

const filterStatus = ref("ALL");
const loading = ref(false);

const statusDots = {
  PENDING: "bg-amber-500",
  IN_CONSULTATION: "bg-blue-500",
  RESOLVED: "bg-emerald-500",
};

const tickets = ref([
  {
    id: "T-101",
    student: "Abebe Kebede",
    category: "Academic",
    status: "PENDING",
  },
  {
    id: "T-102",
    student: "Selam Tesfaye",
    category: "Spiritual",
    status: "IN_CONSULTATION",
  },
  {
    id: "T-103",
    student: "Dawit Zewdu",
    category: "Financial",
    status: "RESOLVED",
  },
]);

const filteredTickets = computed(() => {
  if (filterStatus.value === "ALL") return tickets.value;
  return tickets.value.filter((t) => t.status === filterStatus.value);
});

const viewTicket = (data) => {
  console.log("Opening consultation for ticket:", data.id);
};
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Support Ticket Pipeline
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Case Management & Student Resolution
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus-circle"
        @click="showNewTicket = true"
        >Open New Case</BaseButton
      >
    </div>

    <!-- Ticket Lifecycle Filter -->
    <div class="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
      <button
        v-for="status in ['ALL', 'PENDING', 'IN_CONSULTATION', 'RESOLVED']"
        :key="status"
        @click="filterStatus = status"
        class="px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
        :class="
          filterStatus === status
            ? 'bg-white text-maedot-navy shadow-sm'
            : 'text-slate-500 hover:text-maedot-navy'
        "
      >
        {{ status.replace("_", " ") }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. THE TICKETS LIST (Ref #5 Case Management) -->
      <div class="lg:col-span-8">
        <BaseCard :padding="false">
          <BaseDataTable :data="filteredTickets" :loading="loading">
            <Column field="id" header="ID" class="w-16" />
            <Column field="student" header="Student Name" />
            <Column field="category" header="Category">
              <template #body="{ data }">
                <span class="text-[10px] font-bold text-slate-500">{{
                  data.category
                }}</span>
              </template>
            </Column>
            <Column field="status" header="Current Status">
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="statusDots[data.status]"
                  ></div>
                  <span
                    class="text-[10px] font-black uppercase tracking-tighter"
                    >{{ data.status.replace("_", " ") }}</span
                  >
                </div>
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <BaseButton
                  variant="secondary"
                  size="sm"
                  @click="viewTicket(data)"
                  >Consult</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. QUICK STATS & ESCALATION (Ref #5 Incident Reporting) -->
      <div class="lg:col-span-4 space-y-6">
        <BaseCard title="Case Analytics" class="border-l-4 border-maedot-gold">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-xs text-slate-500 font-medium"
                >Avg. Resolution Time</span
              >
              <span class="text-sm font-black text-maedot-navy">3.2 Days</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-slate-500 font-medium"
                >Spiritual Cases</span
              >
              <span class="text-sm font-black text-eotc-red">14 Active</span>
            </div>
          </div>
        </BaseCard>

        <!-- Escalation Trigger -->
        <BaseCard class="bg-maedot-navy text-white border-none">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="lucide:megaphone" class="text-maedot-gold w-5 h-5" />
            <p class="text-[10px] font-black uppercase">Escalate to Ma'ekel</p>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed mb-4">
            If a case requires higher consultation from the Center's spiritual
            fathers, use the escalation bridge.
          </p>
          <BaseButton
            variant="primary"
            block
            size="sm"
            class="bg-white/10 hover:bg-white/20"
            >Initiate Escalation</BaseButton
          >
        </BaseCard>
      </div>
    </div>
  </div>
</template>
