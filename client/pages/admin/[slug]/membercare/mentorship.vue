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
  </div>
</template>
