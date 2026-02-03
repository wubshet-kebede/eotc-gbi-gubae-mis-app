<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Section Header -->
    <div class="flex justify-between items-center px-2">
      <div class="space-y-1">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest">
          Leadership Council (12 Departments)
        </h3>
        <p class="text-[10px] text-slate-400 italic">
          Assign and manage the spiritual leaders of the Guba.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <span
          class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg"
        >
          {{ activeCount }} / 12 Assigned
        </span>
      </div>
    </div>

    <!-- 12-Slot Council Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="dept in councilSlots"
        :key="dept.id"
        @click="handleSlotInteraction(dept)"
        class="group relative bg-white border border-slate-100 rounded-[2rem] p-5 transition-all duration-300 hover:border-maedot-gold hover:shadow-2xl hover:shadow-maedot-gold/10 cursor-pointer overflow-hidden"
      >
        <!-- Background Decoration for Empty Slots -->
        <div
          v-if="!dept.leader"
          class="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform"
        >
          <Icon :name="dept.icon" class="w-20 h-20 text-maedot-navy" />
        </div>

        <div
          class="flex flex-col items-center text-center space-y-4 relative z-10"
        >
          <!-- Avatar / Placeholder -->
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
            :class="
              dept.leader
                ? 'bg-maedot-navy'
                : 'bg-slate-50 border border-slate-100 group-hover:bg-maedot-gold/10 group-hover:border-maedot-gold/20'
            "
          >
            <img
              v-if="dept.leader"
              :src="dept.leader.avatar"
              class="w-full h-full object-cover rounded-2xl"
            />
            <Icon
              v-else
              :name="dept.icon"
              class="w-7 h-7 text-slate-300 group-hover:text-maedot-gold"
            />
          </div>

          <!-- Labels -->
          <div class="space-y-1">
            <p
              class="text-[10px] font-black text-maedot-gold uppercase tracking-tighter"
            >
              {{ dept.title }}
            </p>
            <h4
              class="text-sm font-black text-maedot-navy truncate max-w-[140px]"
            >
              {{ dept.leader ? dept.leader.name : "Click to Appoint" }}
            </h4>
            <div
              v-if="dept.leader"
              class="flex items-center justify-center gap-1"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              ></span>
              <span
                class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                >Active</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- REUSABLE APPOINTMENT MODAL (Ref #1 Governance) -->
    <ChairAppointmentModal
      :is-open="isModalOpen"
      :slot-title="selectedSlotTitle"
      @close="isModalOpen = false"
      @confirm="processAppointment"
    />
  </div>
</template>

<script setup>
// UI STATE
const isModalOpen = ref(false);
const selectedSlotTitle = ref("");
const activeSlotId = ref(null);

// THE 12-DEPARTMENT SLOTS (Ref #1 Organizational Logic)
const councilSlots = ref([
  {
    id: 1,
    title: "Vice Chairperson",
    icon: "lucide:user-check",
    leader: { name: "Wubshet A.", avatar: "/images/image.png" },
  },
  { id: 2, title: "Secretary General", icon: "lucide:pen-tool", leader: null },
  { id: 3, title: "Finance Head", icon: "lucide:banknote", leader: null },
  { id: 4, title: "Education Head", icon: "lucide:book-open", leader: null },
  { id: 5, title: "Member Care", icon: "lucide:heart-handshake", leader: null },
  { id: 6, title: "Hymn & Arts", icon: "lucide:music", leader: null },
  { id: 7, title: "Development", icon: "lucide:wrench", leader: null },
  {
    id: 8,
    title: "Programs Coord.",
    icon: "lucide:calendar-range",
    leader: null,
  },
  { id: 9, title: "Charity & Prof.", icon: "lucide:briefcase", leader: null },
  { id: 10, title: "Planning & Info", icon: "lucide:gauge", leader: null },
  { id: 11, title: "Audit Service", icon: "lucide:shield-check", leader: null },
  { id: 12, title: "Senate Liaison", icon: "lucide:scroll", leader: null },
]);

// CALCULATED COMPLIANCE
const activeCount = computed(
  () => councilSlots.value.filter((s) => s.leader).length,
);

// INTERACTIONS
const handleSlotInteraction = (dept) => {
  if (dept.leader) {
    // If leader exists, navigate to their profile or show details
    console.log("Viewing profile for:", dept.leader.name);
  } else {
    // If empty, trigger the Prop-driven Modal
    selectedSlotTitle.value = dept.title;
    activeSlotId.value = dept.id;
    isModalOpen.value = true;
  }
};

const processAppointment = (formData) => {
  /**
   * TASK #1: PROMOTE MEMBER & NOTIFY
   * 1. Change user role to DEPT_LEADER in public.users
   * 2. Send Appointment Email via Postmark API (https://postmarkapp.com)
   * 3. Log action in public.activity_logs
   */
  alert(
    `Appointing ${formData.memberName} as the new ${selectedSlotTitle.value}. Invitation sent to university email.`,
  );

  // UI Simulation: Local update (In prod, this refreshes from Hasura)
  const slot = councilSlots.value.find((s) => s.id === activeSlotId.value);
  if (slot) {
    slot.leader = {
      name: formData.memberName,
      avatar: "https://i.pravatar.cc",
    };
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
