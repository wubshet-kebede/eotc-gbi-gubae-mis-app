<script setup>
definePageMeta({ layout: "admin" });

const activeCourses = ref([
  {
    id: 1,
    title: "Orthodox Dogma & Melekote",
    instructor: "Memhir Melaku",
    completedLessons: 10,
    duration: 12,
    icon: "lucide:book-check",
    status: "Active",
  },
  {
    id: 2,
    title: "Early Church History",
    instructor: "Dn. Solomon",
    completedLessons: 3,
    duration: 8,
    icon: "lucide:history",
    status: "Active",
  },
  {
    id: 3,
    title: "Sacraments & Liturgy",
    instructor: "Memhir Elias",
    completedLessons: 12,
    duration: 12,
    icon: "lucide:award",
    status: "Completed",
  },
]);

const students = ref([
  { name: "Abebe Kebede", batch: "2015 E.C", attendance: 92 },
  { name: "Selam Tesfaye", batch: "2016 E.C", attendance: 75 },
  { name: "Dawit Zewdu", batch: "2014 E.C", attendance: 88 },
]);

const manageLessons = (course) => {
  console.log("Updating milestones for:", course.title);
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
          Faith Course Modules
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Theological & Dogmatic Studies
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus"
        @click="showNewCourse = true"
        >Add New Module</BaseButton
      >
    </div>

    <!-- Course Grid (Ref #4: Curriculum Milestone Logger) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard
        v-for="course in activeCourses"
        :key="course.id"
        class="border-t-4"
        :class="
          course.status === 'Completed'
            ? 'border-emerald-500'
            : 'border-maedot-gold'
        "
      >
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <div class="p-3 bg-slate-50 rounded-xl">
              <Icon :name="course.icon" class="w-6 h-6 text-maedot-navy" />
            </div>
            <span
              class="text-[10px] font-black px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase"
            >
              {{ course.duration }} Weeks
            </span>
          </div>

          <div>
            <h3 class="font-bold text-maedot-navy leading-tight">
              {{ course.title }}
            </h3>
            <p class="text-xs text-slate-500">
              Teacher: {{ course.instructor }}
            </p>
          </div>

          <!-- Milestone Tracker -->
          <div class="space-y-2 pt-2">
            <div
              class="flex justify-between text-[10px] font-black uppercase text-slate-400"
            >
              <span>Curriculum Progress</span>
              <span>{{ course.completedLessons }}/12 Lessons</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-500"
                :class="
                  course.status === 'Completed'
                    ? 'bg-emerald-500'
                    : 'bg-maedot-gold'
                "
                :style="{ width: (course.completedLessons / 12) * 100 + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex gap-2 pt-2">
            <BaseButton
              variant="secondary"
              size="sm"
              block
              class="text-[10px]"
              @click="manageLessons(course)"
            >
              Update Lessons
            </BaseButton>
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:users"
              class="text-[10px]"
            ></BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Active Students List for Selected Course -->
    <BaseDataTable title="Student Performance & Certification" :data="students">
      <Column field="name" header="Student Name" />
      <Column field="batch" header="Batch" />
      <Column field="attendance" header="Att. %">
        <template #body="{ data }">
          <span
            :class="data.attendance < 80 ? 'text-rose-600' : 'text-emerald-600'"
            class="font-bold"
          >
            {{ data.attendance }}%
          </span>
        </template>
      </Column>
      <Column header="Certification Status">
        <template #body="{ data }">
          <div
            v-if="data.attendance >= 80"
            class="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase"
          >
            <Icon name="lucide:award" /> Ready to Graduate
          </div>
          <div
            v-else
            class="text-[10px] font-black text-slate-400 uppercase tracking-tighter"
          >
            Requires Attendance
          </div>
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
