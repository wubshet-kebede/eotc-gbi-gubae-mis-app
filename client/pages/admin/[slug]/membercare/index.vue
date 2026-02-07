<script setup>
/**
 * MEMBER SUPPORT CENTER (Ref #5)
 * Logic: Case Management, Security Alerts, and Recommendation Letter Generation
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- STATE ---
const isCaseDrawerOpen = ref(false);
const isIncidentModalOpen = ref(false);
const selectedTicket = ref(null);

const statusColors = {
  PENDING: "bg-amber-100 text-amber-600 border border-amber-200",
  IN_CONSULTATION: "bg-blue-100 text-blue-600 border border-blue-200",
  RESOLVED: "bg-emerald-100 text-emerald-600 border border-emerald-200",
};
const careActions = [
  {
    label: "Map Niseha Abat",
    icon: "lucide:user-cog",
    command: () => {
      alert("Opening Spiritual Father Mapping...");
    },
  },
  {
    label: "Incident Report",
    icon: "lucide:alert-triangle",
    command: () => {
      isIncidentModalOpen.value = true;
    },
  },
  {
    label: "Generate Recommendations",
    icon: "lucide:graduation-cap",
    command: () => {
      handleGraduationPrep();
    },
  },
];
const activeTickets = ref([
  {
    id: 1,
    student: "Selamawit T.",
    type: "Financial Support",
    status: "PENDING",
    fulfilledByCharity: false,
  },
  {
    id: 2,
    student: "Bereket D.",
    type: "Spiritual Counseling",
    status: "IN_CONSULTATION",
    fulfilledByPriest: true,
  },
  {
    id: 3,
    student: "Kidus G.",
    type: "Academic Tutoring",
    status: "PENDING",
    fulfilledByEducation: false,
  },
]);

// --- ACTIONS ---
const openCase = (ticket) => {
  selectedTicket.value = ticket;
  isCaseDrawerOpen.value = true;
};

const handleGraduationPrep = () => {
  const ok = confirm(
    "Generate Recommendation Letters for graduating students?",
  );
  if (ok) {
    alert(
      "Processing Recommendation Letters... PDF generation initiated for final year batch.",
    );
    // Logic: Pull relevant student data into a PDF recommendation letter
  }
};

const submitIncident = () => {
  alert(
    "Incident Reported. Security Alert broadcasted to Batch Reps & Chairperson.",
  );
  isIncidentModalOpen.value = false;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-end bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Member Support Center
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Student Well-being & Spiritual Mentorship
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:message-square-plus"
        @click="navigateTo(`/admin/${slug}/membercare/tickets`)"
      >
        Open New Case
      </BaseButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard title="Total Members" value="1,450" icon="lucide:users" />
      <BaseStatCard
        title="Active Cases"
        value="12"
        icon="lucide:life-buoy"
        class="text-rose-600"
      />
      <BaseStatCard
        title="Mentorship Coverage"
        value="88%"
        icon="lucide:heart-handshake"
        class="text-maedot-gold"
      />
      <BaseStatCard
        title="Resolved (Month)"
        value="42"
        icon="lucide:check-circle"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- Active Support Pipeline -->
      <div class="xl:col-span-8">
        <BaseCard
          :padding="false"
          title="Active Support Tickets"
          subtitle="Ongoing member intervention cases"
        >
          <BaseDataTable :data="activeTickets">
            <Column
              field="student"
              header="Student"
              class="font-bold text-slate-700"
            />
            <Column
              field="type"
              header="Category"
              class="text-xs font-medium text-slate-500"
            />
            <Column field="status" header="Status">
              <template #body="{ data }">
                <span
                  class="px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter"
                  :class="statusColors[data.status]"
                >
                  {{ data.status }}
                </span>
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <BaseButton
                  size="sm"
                  variant="ghost"
                  icon="lucide:external-link"
                  @click="openCase(data)"
                  >Update Case</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- Sidebar Actions -->
      <div class="xl:col-span-4 space-y-6">
        <AdminActionButton title="Member Care Tasks" :actions="careActions">
          <!-- Use the slots for the System Notice if you want it there -->
          <template #notice>
            <BaseCard class="bg-maedot-navy text-white border-none mt-4">
              <div class="flex items-center gap-3 mb-2">
                <Icon name="lucide:info" class="text-maedot-gold w-4 h-4" />
                <p class="text-[10px] font-bold uppercase">System Notice</p>
              </div>
              <p class="text-[10px] text-slate-300">
                Next maintenance: Oct 30, 11:00 PM.
              </p>
            </BaseCard>
          </template>
        </AdminActionButton>

        <BaseCard class="bg-rose-50 border-rose-200">
          <div class="flex items-center gap-2 text-rose-700 mb-2">
            <Icon name="lucide:shield-alert" class="w-4 h-4 animate-pulse" />
            <p class="text-[10px] font-black uppercase">Urgent Campus Alerts</p>
          </div>
          <p class="text-xs text-rose-600 font-medium leading-relaxed">
            Security concerns reported near 4-Kilo campus. Ensure all female
            students leave in groups.
          </p>
        </BaseCard>
      </div>
    </div>

    <!-- UPDATE CASE DRAWER (With Checklist Logic) -->
    <BaseGovernanceDrawer
      :is-open="isCaseDrawerOpen"
      :title="'Update: ' + selectedTicket?.student"
      subtitle="Verifying Case Requirements"
      action-label="Finalize Status"
      @close="isCaseDrawerOpen = false"
    >
      <div class="space-y-6">
        <div class="p-4 bg-slate-50 rounded-3xl border border-slate-100">
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Case Category
          </p>
          <p class="text-sm font-bold text-maedot-navy">
            {{ selectedTicket?.type }}
          </p>
        </div>

        <div class="space-y-4">
          <h4
            class="text-xs font-black text-maedot-navy uppercase tracking-widest"
          >
            Verification Checklist
          </h4>

          <div
            class="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100"
          >
            <input
              type="checkbox"
              v-model="selectedTicket.fulfilledByPriest"
              class="w-4 h-4 accent-maedot-gold"
            />
            <span class="text-xs font-medium"
              >Spiritual Father (Niseha Abat) consulted?</span
            >
          </div>

          <!-- Cross-Module Link to Charity -->
          <div
            v-if="selectedTicket?.type === 'Financial Support'"
            class="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100"
          >
            <input
              type="checkbox"
              v-model="selectedTicket.fulfilledByCharity"
              class="w-4 h-4 accent-rose-600"
            />
            <div class="flex flex-col">
              <span class="text-xs font-bold text-rose-700 uppercase"
                >Charity Dept (#10) Clearance?</span
              >
              <span class="text-[9px] text-rose-400 font-medium"
                >Finance must verify funds availability.</span
              >
            </div>
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>

    <!-- INCIDENT REPORT MODAL -->
    <BaseGovernanceDrawer
      :is-open="isIncidentModalOpen"
      title="Report Campus Incident"
      description="This will alert the Chairperson & Campus Batch Reps."
      @close="isIncidentModalOpen = false"
      @confirm="submitIncident"
    >
      <div class="space-y-4 py-2">
        <BaseInput
          label="Incident Location"
          placeholder="e.g. 4-Kilo Gate"
          icon="lucide:map-pin"
        />
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Incident Description</label
          >
          <textarea
            class="w-full p-4 bg-slate-50 border rounded-[2rem] text-xs outline-none"
            rows="3"
            placeholder="Describe the safety concern..."
          ></textarea>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
