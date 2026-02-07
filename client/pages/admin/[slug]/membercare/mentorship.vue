<script setup>
definePageMeta({ layout: "admin" });

const mentorshipList = ref([
  {
    studentName: "Abebe Kebede",
    batch: "2015 E.C",
    mentorName: "Memhir Melaku",
    lastCheckin: "2 Days Ago",
  },
  {
    studentName: "Selam Tesfaye",
    batch: "2016 E.C",
    mentorName: "Dn. Solomon",
    lastCheckin: "1 Week Ago",
  },
  {
    studentName: "Dawit Zewdu",
    batch: "2014 E.C",
    mentorName: "Memhir Melaku",
    lastCheckin: "Yesterday",
  },
]);

const mentorSummary = ref([
  { name: "Memhir Melaku", role: "Spiritual Father", count: 24 },
  { name: "Dn. Solomon", role: "Senior Mentor", count: 12 },
  { name: "Memhir Tekle", role: "Spiritual Father", count: 28 },
]);
const showAssignModal = ref(false);
const selectedStudent = ref(null);
const selectedMentor = ref(null);

// MOCK LOGIC: Finding the mentor with lowest capacity
const suggestedMentor = computed(() => {
  return [...mentorSummary.value].sort((a, b) => a.count - b.count)[0];
});

const handleAssignment = () => {
  // Logic:
  // 1. Immutable Bind: Lock Student to Mentor in DB (No changes until graduation)
  // 2. Trigger SMS: "Greetings Memhir [Name], you have been assigned [Student Name] as a new Niseha kid."
  alert(
    `Assignment Sealed! SMS notification sent to ${selectedMentor.value.name}.`,
  );
  showAssignModal.value = false;
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
          Mentorship & Niseha Registry
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Mapping Spiritual Parentage (Ref #5)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:user-plus"
        @click="showAssignModal = true"
        >Assign New Mentor</BaseButton
      >
    </div>

    <!-- Mentorship Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Assigned Students"
        value="1,120"
        icon="lucide:shield-check"
      />
      <BaseStatCard
        title="Unassigned"
        value="84"
        icon="lucide:user-x"
        :trend-up="false"
        trend="Needs Action"
      />
      <BaseStatCard title="Active Mentors" value="45" icon="lucide:users" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. MENTORSHIP MAP (Ref #5 Mentorship Mapping) -->
      <div class="lg:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Student-Mentor Connections
            </h3>
            <div class="flex gap-2">
              <BaseInput
                placeholder="Search student..."
                size="sm"
                icon="lucide:search"
                class="w-64"
              />
            </div>
          </div>

          <BaseDataTable :data="mentorshipList">
            <Column field="studentName" header="Student" />
            <Column field="batch" header="Batch" />
            <Column field="mentorName" header="Niseha Abat / Mentor">
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <div
                    class="w-6 h-6 rounded-full bg-maedot-gold/20 flex items-center justify-center"
                  >
                    <Icon name="lucide:user" class="w-3 h-3 text-maedot-gold" />
                  </div>
                  <span class="text-sm font-medium text-slate-700">{{
                    data.mentorName
                  }}</span>
                </div>
              </template>
            </Column>
            <Column header="Last Check-in">
              <template #body="{ data }">
                <span class="text-[10px] font-bold text-slate-400 uppercase">{{
                  data.lastCheckin
                }}</span>
              </template>
            </Column>
            <Column header="Actions">
              <template #body>
                <BaseButton
                  variant="ghost"
                  size="sm"
                  icon="lucide:edit-3"
                ></BaseButton>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. MENTOR DIRECTORY (Ref #5 HCM) -->
      <div class="lg:col-span-4 space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Mentor Workload
        </h3>
        <div class="space-y-4">
          <BaseCard
            v-for="mentor in mentorSummary"
            :key="mentor.name"
            padding
            class="hover:border-maedot-gold transition-all"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-bold text-maedot-navy text-sm">
                  {{ mentor.name }}
                </h4>
                <p class="text-[10px] text-slate-400 font-bold uppercase">
                  {{ mentor.role }}
                </p>
              </div>
              <div
                class="bg-slate-50 px-2 py-1 rounded border border-slate-100 text-xs font-black text-maedot-navy"
              >
                {{ mentor.count }} Kids
              </div>
            </div>
            <!-- Workload Bar -->
            <div class="mt-4 space-y-1">
              <div
                class="flex justify-between text-[9px] font-black uppercase text-slate-400"
              >
                <span>Capacity</span>
                <span>{{ ((mentor.count / 30) * 100).toFixed(0) }}%</span>
              </div>
              <div
                class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"
              >
                <div
                  class="bg-maedot-gold h-full"
                  :style="{ width: (mentor.count / 30) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <BaseGovernanceDrawer
      :is-open="showAssignModal"
      title="New Spiritual Assignment"
      subtitle="Binding a student to a Niseha Father"
      action-label="Authorize & Send SMS"
      @close="showAssignModal = false"
      @confirm="handleAssignment"
    >
      <div class="space-y-6">
        <!-- 1. SEARCH STUDENT (From Unassigned List) -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Select Unassigned Student</label
          >
          <BaseInput
            placeholder="Search Name or Batch..."
            icon="lucide:search"
          />
        </div>

        <!-- 2. THE INTELLIGENT SUGGESTION -->
        <div
          class="p-4 bg-maedot-gold/10 rounded-2xl border border-maedot-gold/20 space-y-2"
        >
          <div class="flex items-center gap-2 text-maedot-gold">
            <Icon name="lucide:sparkles" class="w-4 h-4" />
            <p class="text-[10px] font-black uppercase">
              System Suggestion (Lowest Workload)
            </p>
          </div>
          <p class="text-xs font-bold text-maedot-navy">
            {{ suggestedMentor.name }}
            <span class="text-slate-400"
              >({{ suggestedMentor.count }} Kids)</span
            >
          </p>
          <BaseButton
            variant="ghost"
            size="sm"
            class="h-auto p-0 text-maedot-gold text-[10px] font-black underline"
            @click="selectedMentor = suggestedMentor"
          >
            Accept Suggestion
          </BaseButton>
        </div>

        <!-- 3. MANUAL MENTOR SELECTOR -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Or Select Any Mentor</label
          >
          <select
            v-model="selectedMentor"
            class="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold outline-none text-maedot-navy focus:border-maedot-gold"
          >
            <option
              v-for="mentor in mentorSummary"
              :key="mentor.name"
              :value="mentor"
            >
              {{ mentor.name }} (Capacity:
              {{ ((mentor.count / 30) * 100).toFixed(0) }}%)
            </option>
          </select>
        </div>

        <!-- 4. IMMUTABILITY NOTICE -->
        <div
          class="flex items-start gap-3 p-4 bg-slate-900 rounded-2xl text-white"
        >
          <Icon name="lucide:lock" class="text-maedot-gold w-5 h-5 shrink-0" />
          <p class="text-[10px] text-slate-400 leading-relaxed italic">
            "Warning: This spiritual bond is
            <span class="text-white">Immutable</span>. Once assigned, the record
            cannot be changed until the student's University Graduation."
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
