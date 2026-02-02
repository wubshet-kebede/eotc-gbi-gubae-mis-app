<script setup>
definePageMeta({ layout: "admin" });

// Mock Data - In real world, this joins User and Meeting tables
const leaderStatus = ref([
  {
    name: "Selam Tesfaye",
    dept: "Finance",
    meetingAttendance: "100%",
    progress: 85,
  },
  {
    name: "Abebe Kebede",
    dept: "Education",
    meetingAttendance: "85%",
    progress: 60,
  },
  {
    name: "Dawit Zewdu",
    dept: "Audit",
    meetingAttendance: "90%",
    progress: 100,
  },
  {
    name: "Mulugeta H.",
    dept: "Secretary",
    meetingAttendance: "100%",
    progress: 95,
  },
]);

const recentAgendas = ref([
  {
    id: 1,
    date: "Oct 25",
    title: "Preparation for St. Teklehaymanot Festival",
  },
  {
    id: 2,
    date: "Oct 18",
    title: "Quarterly Financial Review and Audit Finding Resolution",
  },
  {
    id: 3,
    date: "Oct 11",
    title: "Abinet Teacher Recruitment & Succession Planning",
  },
]);

const triggerEmergencyMeeting = () => {
  alert(
    "Broadcasting Emergency Meeting Notification to all 12 Department Leaders via SMS/Push.",
  );
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Senate Governance
        </h1>
        <p class="text-sm text-slate-500">
          Managing the Executive Council of 12 Departments.
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus-circle"
        @click="triggerEmergencyMeeting"
      >
        Call Emergency Meeting
      </BaseButton>
    </div>

    <!-- Senate Health Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Senate Participation"
        value="92%"
        icon="lucide:user-check"
        trend="Excellent"
      />
      <BaseStatCard
        title="Open Action Items"
        value="14"
        icon="lucide:list-todo"
        trend="5 Pending"
        :trend-up="false"
      />
      <BaseStatCard
        title="Next Assembly"
        value="Nov 05"
        icon="lucide:calendar-clock"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- 1. LEADERSHIP PERFORMANCE (Ref #1 Strategic Tracking) -->
      <div class="xl:col-span-2">
        <BaseCard :padding="false">
          <div class="p-6 border-b border-slate-100">
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Department Leader Status
            </h3>
          </div>
          <BaseDataTable :data="leaderStatus">
            <Column field="name" header="Leader Name" />
            <Column field="dept" header="Department" />
            <Column field="meetingAttendance" header="Mtng. Att." />
            <Column header="Task Status">
              <template #body="{ data }">
                <div
                  class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"
                >
                  <div
                    class="bg-maedot-gold h-full"
                    :style="{ width: data.progress + '%' }"
                  ></div>
                </div>
                <span class="text-[10px] font-bold text-slate-400"
                  >{{ data.progress }}% Tasks Done</span
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. RECENT DECISIONS (Institutional Memory - Ref #1) -->
      <div class="space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Latest Agendas
        </h3>
        <div class="space-y-3">
          <BaseCard
            v-for="agenda in recentAgendas"
            :key="agenda.id"
            padding
            class="hover:border-maedot-gold cursor-pointer transition-all"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="text-[10px] font-black text-maedot-gold uppercase">{{
                agenda.date
              }}</span>
              <Icon name="lucide:file-text" class="w-4 h-4 text-slate-300" />
            </div>
            <p class="text-sm font-bold text-maedot-navy leading-tight">
              {{ agenda.title }}
            </p>
            <BaseButton
              variant="ghost"
              size="sm"
              class="mt-3 p-0 h-auto text-xs text-eotc-red"
              >Read Minutes</BaseButton
            >
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>
