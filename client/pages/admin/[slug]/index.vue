<script setup>
definePageMeta({ layout: "admin" });
const route = useRoute();

/**
 * INDUSTRY LOGIC: System State & Role
 * isChairActive: If false (exams/illness), Vice-Chair gets Sign-off rights.
 */
const userRole = ref("VICE_CHAIRPERSON");
const isChairActive = ref(false); // SET TO FALSE TO ACTIVATE PROXY MODE

const currentGuba = computed(() => route.params.slug);

// --- SHARED DATA ---
const pendingApprovals = ref([
  {
    id: 1,
    department: "Finance",
    description: "Monthly Payroll",
    priority: "High",
  },
  {
    id: 2,
    department: "Hymn & Arts",
    description: "Easter Drama Script",
    priority: "Medium",
  },
]);

const delegatedTasks = ref([
  { id: 101, title: "Verify Audit Discrepancies in Dept 7", due: "Urgent" },
]);

// --- SIGNATURE LOGIC ---
const openSignatureModal = (data) => {
  if (userRole.value === "VICE_CHAIRPERSON" && isChairActive.value) {
    alert("Access Denied: Chairperson is currently active. You cannot sign.");
    return;
  }
  console.log("Opening Secure PIN Modal for:", data.description);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- PROXY ALERT BANNER (Only visible when Vice-Chair is acting as Chair) -->
    <div
      v-if="userRole === 'VICE_CHAIRPERSON' && !isChairActive"
      class="bg-maedot-navy text-white px-6 py-3 rounded-2xl flex items-center justify-between border-b-4 border-maedot-gold shadow-lg"
    >
      <div class="flex items-center gap-3">
        <Icon
          name="lucide:shield-alert"
          class="text-maedot-gold w-6 h-6 animate-pulse"
        />
        <div>
          <p
            class="text-xs font-black uppercase tracking-widest text-maedot-gold"
          >
            Proxy Mode Active
          </p>
          <p class="text-[11px] text-slate-300">
            Chairperson is Inactive. Operational & Signature authority granted
            to Vice-Chair.
          </p>
        </div>
      </div>
      <Icon
        name="lucide:lock-open"
        class="text-maedot-gold w-5 h-5 opacity-50"
      />
    </div>

    <!-- 1. HEADER -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-3xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Executive Dashboard
        </h1>
        <p class="text-slate-500 font-medium capitalize">
          {{ currentGuba }} Gbi Gubae
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:calendar-days"
        @click="navigateTo(`/admin/${currentGuba}/senate`)"
      >
        Senate Hub
      </BaseButton>
    </div>

    <!-- 2. STATS GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard title="Membership" value="1,450" icon="lucide:users" />
      <BaseStatCard
        title="Bank Balance"
        value="280,500 ETB"
        icon="lucide:wallet"
      />
      <BaseStatCard
        title="Audit Health"
        value="96%"
        icon="lucide:shield-check"
      />
      <BaseStatCard
        title="Pending Actions"
        :value="pendingApprovals.length"
        icon="lucide:pen-tool"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 3. MAIN ACTION AREA: The Signature Queue -->
      <!-- LOGIC: Show to Chair OR show to Vice-Chair if Chair is inactive -->
      <div
        v-if="
          userRole === 'CHAIRPERSON' ||
          (userRole === 'VICE_CHAIRPERSON' && !isChairActive)
        "
        class="xl:col-span-8"
      >
        <BaseDataTable
          title="Items Awaiting Signature"
          :data="pendingApprovals"
        >
          <Column field="department" header="From Dept" />
          <Column field="description" header="Subject" />
          <Column header="Action">
            <template #body="{ data }">
              <BaseButton
                size="sm"
                variant="primary"
                @click="openSignatureModal(data)"
                >Review & Sign</BaseButton
              >
            </template>
          </Column>
        </BaseDataTable>
      </div>

      <!-- 4. VICE-CHAIR DELEGATION (Visible when Chair is Active) -->
      <div
        v-if="userRole === 'VICE_CHAIRPERSON' && isChairActive"
        class="xl:col-span-8 space-y-6"
      >
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Assigned Operations
        </h3>
        <div
          v-for="task in delegatedTasks"
          :key="task.id"
          class="p-5 bg-white border-l-4 border-maedot-gold rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <p class="text-[10px] font-black text-maedot-gold uppercase mb-1">
            {{ task.due }}
          </p>
          <p class="text-sm font-bold text-maedot-navy">{{ task.title }}</p>
          <BaseButton
            variant="ghost"
            size="sm"
            class="mt-4 p-0 text-[10px] uppercase font-black text-eotc-red"
            >Mark Completed</BaseButton
          >
        </div>
      </div>

      <!-- 5. SIDE INTELLIGENCE -->
      <div class="xl:col-span-4 space-y-8">
        <AdminQuickActions
          title="Direct Controls"
          :actions="[
            {
              label: 'Issue Official Memo',
              icon: 'lucide:file-signature',
              command: () => {},
            },
            {
              label: 'External Consultation',
              icon: 'lucide:external-link',
              command: () => {},
            },
            {
              label: 'Emergency Alert',
              icon: 'lucide:megaphone',
              command: () => {},
            },
          ]"
        />

        <BaseCard class="bg-slate-900 border-none text-white">
          <div class="flex items-center gap-3 mb-4">
            <Icon name="lucide:history" class="text-maedot-gold w-5 h-5" />
            <p
              class="text-xs font-bold uppercase tracking-widest text-maedot-gold"
            >
              Legacy Log
            </p>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed italic">
            "In 2015, we secured Maraki Campus funding. Follow the same model
            for Tseda."
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
