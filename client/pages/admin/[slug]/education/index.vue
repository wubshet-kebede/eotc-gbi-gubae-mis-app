<script setup>
definePageMeta({ layout: "admin" });

const activeClasses = ref([
  { id: 1, name: "Kiddase Zema", teacher: "Memhir Zewdu", milestones: 9 },
  { id: 2, name: "Dogma 101", teacher: "Dn. Elias", milestones: 4 },
  { id: 3, name: "Wudase Mariam", teacher: "Memhir Tekle", milestones: 11 },
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
          Academic Registrar
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Managing Abinet and Apostolic education programs.
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:book-plus"
        @click="navigateTo(`/admin/${$route.params.slug}/education/abinet`)"
      >
        New Class Instance
      </BaseButton>
    </div>

    <!-- Academic Stats (Ref #4) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Total Enrolled"
        value="184"
        icon="lucide:graduation-cap"
        trend="+15"
      />
      <BaseStatCard title="Active Classes" value="12" icon="lucide:library" />
      <BaseStatCard title="Teachers" value="06" icon="lucide:user-check" />
      <BaseStatCard
        title="Course Completion"
        value="68%"
        icon="lucide:target"
        trend="On Track"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- Active Abinet Progress (Ref #4 Curriculum Milestone Logger) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Ongoing Curriculum Progress
            </h3>
          </div>
          <BaseDataTable :data="activeClasses">
            <Column field="name" header="Course Name" />
            <Column field="teacher" header="Instructor" />
            <Column header="Milestones (12 Steps)">
              <template #body="{ data }">
                <div class="flex items-center gap-3">
                  <div
                    class="flex-grow bg-slate-100 h-2 rounded-full overflow-hidden"
                  >
                    <div
                      class="bg-maedot-gold h-full"
                      :style="{ width: (data.milestones / 12) * 100 + '%' }"
                    ></div>
                  </div>
                  <span class="text-[10px] font-bold text-slate-500"
                    >{{ data.milestones }}/12</span
                  >
                </div>
              </template>
            </Column>
            <Column header="Action">
              <template #body>
                <BaseButton
                  size="sm"
                  variant="ghost"
                  icon="lucide:clipboard-check"
                  >Mark Lesson</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- Quick Actions for Education -->
      <div class="xl:col-span-4">
        <AdminQuickActions
          title="Education Tasks"
          :actions="[
            {
              label: 'Register Teacher Payroll',
              icon: 'lucide:banknote',
              command: () => {},
            },
            {
              label: 'Guest Taxi Money Log',
              icon: 'lucide:car',
              command: () => {},
            },
            {
              label: 'Identify Future Teachers',
              icon: 'lucide:star',
              command: () => {},
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>
