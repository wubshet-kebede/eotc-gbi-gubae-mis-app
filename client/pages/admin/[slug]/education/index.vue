<script setup>
/**
 * ACADEMIC REGISTRAR DASHBOARD (Ref #4)
 * Logic: Batch Progression, Emergency Remedial Classes, and Phase Control
 */
definePageMeta({ layout: "admin" });

const isPhaseModalOpen = ref(false);
const isEmergencyOpen = ref(false);

const activeClasses = ref([
  {
    id: 1,
    name: "Kiddase Zema",
    teacher: "Memhir Zewdu",
    type: "ABINET",
    batch: "All Years",
    progress: 75,
    status: "Active",
  },
  {
    id: 2,
    name: "Dogma 101",
    teacher: "Dn. Elias",
    type: "COURSE",
    batch: "1st Year",
    progress: 40,
    status: "Blocked Students Exist",
  },
  {
    id: 3,
    name: "Church History",
    teacher: "Memhir Tekle",
    type: "COURSE",
    batch: "2nd Year",
    progress: 90,
    status: "Active",
  },
]);

const newPhase = reactive({
  batch: "1st Year",
  course: "",
  phases: ["", "", ""],
});

const handleRegisterPhases = () => {
  // Logic: 1. Save curriculum roadmap | 2. Notify batch teachers
  alert(
    `Curriculum Phases registered for ${newPhase.batch}. Students now have a clear path to completion.`,
  );
  isPhaseModalOpen.value = false;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. DYNAMIC HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Education Terminal
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none"
        >
          Registrar Oversight • Batch & Phase Control
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:zap"
          @click="isEmergencyOpen = true"
          >New Emergency Lecture</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:layers"
          @click="isPhaseModalOpen = true"
          >Register Course Phases</BaseButton
        >
      </div>
    </div>

    <!-- 2. UPDATED BATCH STATS -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <BaseStatCard
        title="Total Enrolled"
        value="184"
        icon="lucide:graduation-cap"
      >
        <template #footer
          ><span
            class="text-[9px] font-black text-slate-400 uppercase leading-none"
            >120 Abinet | 64 Courses</span
          ></template
        >
      </BaseStatCard>
      <BaseStatCard
        title="Phase Completion"
        value="62%"
        icon="lucide:target"
        trend="On Track"
      />
      <BaseStatCard
        title="Blocked Students"
        value="12"
        icon="lucide:user-x"
        class="text-rose-600"
      />
      <BaseStatCard
        title="Monthly Honorarium"
        value="Pending"
        icon="lucide:banknote"
        class="text-maedot-gold"
      />
    </div>

    <!-- 3. INSTRUCTOR & PROGRESS TABLE -->
    <BaseCard :padding="false" title="Curriculum & Batch Monitoring">
      <BaseDataTable :data="activeClasses">
        <Column
          field="batch"
          header="Target Batch"
          class="font-black text-[10px] text-slate-400"
        />
        <Column
          field="name"
          header="Course/Subject"
          class="font-bold text-xs"
        />
        <Column field="teacher" header="Instructor" />
        <Column header="Status">
          <template #body="{ data }">
            <span
              :class="
                data.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-rose-100 text-rose-600'
              "
              class="px-2 py-0.5 rounded text-[8px] font-black uppercase"
            >
              {{ data.status }}
            </span>
          </template>
        </Column>
        <Column header="Progress">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <div class="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  class="bg-maedot-gold h-full"
                  :style="{ width: data.progress + '%' }"
                ></div>
              </div>
              <span class="text-[9px] font-bold">{{ data.progress }}%</span>
            </div>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="{ data }">
            <div class="flex gap-2">
              <BaseButton
                size="sm"
                variant="ghost"
                icon="lucide:send"
                @click="requestPayment(data)"
                title="Request Salary/Taxi"
              />
              <BaseButton
                size="sm"
                variant="ghost"
                icon="lucide:clipboard-check"
                @click="markLesson(data)"
              />
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>

    <!-- 4. PHASE REGISTRATION MODAL -->
    <BaseGovernanceDrawer
      :is-open="isPhaseModalOpen"
      title="Define Curriculum Phases"
      description="Break the course into logical phases for batch progression."
      @close="isPhaseModalOpen = false"
      @confirm="handleRegisterPhases"
    >
      <div class="space-y-4 py-2">
        <div class="p-4 bg-slate-50 rounded-2xl space-y-3">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Target Batch</label
          >
          <select
            v-model="newPhase.batch"
            class="w-full bg-transparent text-sm font-bold outline-none text-maedot-navy"
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year+</option>
          </select>
        </div>
        <BaseInput
          v-model="newPhase.course"
          label="Course Name"
          icon="lucide:book-open"
        />
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Define Roadmap (Phases)</label
          >
          <BaseInput placeholder="Phase 1: Foundations" />
          <BaseInput placeholder="Phase 2: Deep Dive" />
          <BaseInput placeholder="Phase 3: Final Assessment" />
        </div>
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isEmergencyOpen"
      title="New Emergency Lecture"
      subtitle="Initiating Remedial Fast-Track for Blocked Students"
      action-label="Authorize Emergency Class"
      theme-bg="bg-rose-600"
      @close="isEmergencyOpen = false"
    >
      <div class="space-y-6">
        <!-- 1. IDENTIFY THE PROBLEM -->
        <div class="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
          <p class="text-[10px] font-black text-rose-600 uppercase">
            Blocked Student Alert
          </p>
          <p class="text-xs font-bold text-rose-900">
            12 Students currently blocked from 2nd Year Batch (Dogma Phase 1).
          </p>
        </div>

        <!-- 2. DEFINE THE SOLUTION -->
        <div class="space-y-4">
          <BaseInput
            label="Intensive Course Name"
            value="Remedial: Dogma Phase 1"
          />

          <div class="grid grid-cols-2 gap-4">
            <BaseInput label="Duration (Days)" type="number" value="14" />
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase"
                >Emergency Teacher</label
              >
              <select
                class="w-full bg-slate-50 p-3 rounded-2xl text-xs font-bold border-none outline-none"
              >
                <option>Search available teachers...</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 3. FINANCE HANDSHAKE -->
        <div class="p-4 bg-slate-900 rounded-3xl text-white">
          <div class="flex items-center gap-2 mb-2">
            <Icon name="lucide:banknote" class="text-maedot-gold w-4 h-4" />
            <p class="text-[10px] font-black uppercase">Emergency Funding</p>
          </div>
          <p class="text-[11px] text-slate-400 italic mb-4">
            "Creating this will request a 500 ETB Taxi Voucher from Finance."
          </p>
          <BaseInput
            label="Requested Taxi Budget"
            type="number"
            placeholder="ETB"
            class="bg-white/10"
          />
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
