<script setup>
definePageMeta({ layout: "admin" });

const filterStatus = ref("ALL");
const loading = ref(false);
const isConsulting = ref(false);
const selectedTicket = ref(null);
const isNewCaseOpen = ref(false);
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
  selectedTicket.value = data;
  isConsulting.value = true;
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
        @click="isNewCaseOpen = true"
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
    <BaseGovernanceDrawer
      :is-open="isConsulting"
      :title="'Clinical Consultation: ' + selectedTicket?.student"
      @close="isConsulting = false"
    >
      <div class="space-y-6">
        <!-- 1. INTEGRATED STATUS (The Engineering Link) -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Spiritual Health
            </p>
            <p class="text-xs font-bold text-emerald-600">82% Attendance</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Charity Status
            </p>
            <p
              class="text-xs font-bold text-amber-600 italic text-nowrap tracking-tighter"
            >
              No Active Claims
            </p>
          </div>
        </div>

        <!-- 2. PRIVATE CASE LOG -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Consultation Minutes</label
          >
          <textarea
            class="w-full p-4 bg-slate-50 border rounded-3xl text-xs outline-none focus:border-maedot-navy min-h-[120px]"
            placeholder="Write the meeting summary here... This is hidden from the student."
          ></textarea>
        </div>

        <!-- 3. GOVERNANCE ACTIONS -->
        <div class="space-y-3 pt-4">
          <BaseButton variant="primary" block icon="lucide:check-circle"
            >Mark as Resolved</BaseButton
          >
          <BaseButton
            variant="secondary"
            block
            icon="lucide:file-down"
            class="text-maedot-gold border-maedot-gold/20"
            @click="generateMaekelPDF"
          >
            Download Referral for Ma'ekel
          </BaseButton>
        </div>
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isNewCaseOpen"
      title="Register New Support Case"
      subtitle="Initiating student intervention and support"
      action-label="Authorize & Open Ticket"
      @confirm="handleCreateTicket"
    >
      <div class="space-y-6">
        <!-- 1. SEARCHING THE GLOBAL REGISTRY -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Select Student</label
          >
          <BaseInput
            placeholder="Search Name or Uni ID..."
            icon="lucide:search"
          />
          <p class="text-[9px] text-slate-400 italic">
            Linked to the Global Membership Database.
          </p>
        </div>

        <!-- 2. CASE PARAMETERS -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Category</label
            >
            <select
              class="w-full bg-slate-50 p-4 rounded-3xl text-xs font-bold border-none outline-none"
            >
              <option>Spiritual Counseling</option>
              <option>Financial Support</option>
              <option>Academic Tutoring</option>
            </select>
          </div>
          <div class="space-y-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >Urgency</label
            >
            <select
              class="w-full bg-slate-50 p-4 rounded-3xl text-xs font-bold border-none outline-none text-rose-600"
            >
              <option>Normal</option>
              <option>High Priority</option>
              <option>Emergency</option>
            </select>
          </div>
        </div>

        <!-- 3. INITIAL OBSERVATION -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Initial Complaint/Need</label
          >
          <textarea
            class="w-full p-4 bg-slate-50 border rounded-3xl text-xs outline-none focus:border-maedot-gold"
            placeholder="Briefly describe why this ticket is being opened..."
            rows="3"
          ></textarea>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
