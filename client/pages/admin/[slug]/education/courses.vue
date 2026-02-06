<script setup>
/**
 * FAITH COURSE MODULES (Ref #4)
 * Logic: Batch-Specific Filtering, Dynamic Phases, and Attendance Sync
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// 1. STATE: Selected Context
const selectedCourse = ref(null);
const isLessonDrawerOpen = ref(false);
const isAddModuleOpen = ref(false);

// 2. DATA: Batch-Specific Courses (The Cards)
const activeCourses = ref([
  {
    id: 1,
    title: "Orthodox Dogma & Melekote",
    instructor: "Memhir Melaku",
    batch: "1st Year",
    totalPhases: 3,
    currentPhase: 1,
    completedLessons: 10,
    duration: 12,
    status: "Active",
    icon: "lucide:book-check",
  },
  {
    id: 2,
    title: "Sacraments & Liturgy",
    instructor: "Memhir Elias",
    batch: "2nd Year",
    totalPhases: 2,
    currentPhase: 2,
    completedLessons: 12,
    duration: 12,
    status: "Completed",
    icon: "lucide:award",
  },
]);

// 3. DATA: Students (Mock data - in production, this filters by selectedCourse.batch)
const students = ref([
  {
    id: 101,
    name: "Abebe Kebede",
    batch: "1st Year",
    attendance: 92,
    isPresent: true,
  },
  {
    id: 102,
    name: "Selam Tesfaye",
    batch: "1st Year",
    attendance: 75,
    isPresent: true,
  },
  {
    id: 103,
    name: "Dawit Zewdu",
    batch: "1st Year",
    attendance: 88,
    isPresent: false,
  },
]);

// 4. HANDLERS
const selectCourse = (course) => {
  selectedCourse.value = course;
  // Logic: Fetch students belonging to course.batch from Hasura
};

const handleLessonUpdate = () => {
  // Logic: 1. Increment Milestone | 2. Log Attendance | 3. Check Phase Completion
  alert(
    `Lesson logged for ${selectedCourse.value.title}. Attendance for ${selectedCourse.value.batch} synchronized.`,
  );
  isLessonDrawerOpen.value = false;
};

const handleGraduation = (student) => {
  // Logic: Generate PDF Certificate via PrimeVue/jsPDF | Save to Member Archives
  alert(
    `Generating Graduation Certificate for ${student.name}. Attendance: ${student.attendance}%`,
  );
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Faith Course Modules
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none"
        >
          Modern Curriculum & Batch Oversight
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus-circle"
        @click="isAddModuleOpen = true"
        >Add New Module</BaseButton
      >
    </div>

    <!-- 1. DYNAMIC COURSE CARDS (Batch-Aware) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard
        v-for="course in activeCourses"
        :key="course.id"
        @click="selectCourse(course)"
        class="cursor-pointer transition-all duration-300 border-t-8"
        :class="[
          selectedCourse?.id === course.id
            ? 'ring-2 ring-maedot-gold shadow-xl'
            : 'hover:shadow-md',
          course.status === 'Completed'
            ? 'border-emerald-500'
            : 'border-maedot-navy',
        ]"
      >
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <div
              class="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase"
            >
              {{ course.batch }}
            </div>
            <span v-if="course.status === 'Completed'" class="text-emerald-500"
              ><Icon name="lucide:check-circle" class="w-5 h-5"
            /></span>
          </div>

          <div>
            <h3
              class="font-black text-maedot-navy uppercase text-sm leading-tight"
            >
              {{ course.title }}
            </h3>
            <p class="text-[10px] text-slate-400 font-bold uppercase">
              {{ course.instructor }}
            </p>
          </div>

          <!-- Phase & Progress Logic -->
          <div class="space-y-2">
            <div
              class="flex justify-between text-[9px] font-black uppercase text-slate-400"
            >
              <span
                >Phase {{ course.currentPhase }} of
                {{ course.totalPhases }}</span
              >
              <span>{{ course.completedLessons }}/12 Lessons</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                class="h-full bg-maedot-gold transition-all duration-700"
                :style="{ width: (course.completedLessons / 12) * 100 + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex gap-2 pt-2">
            <BaseButton
              variant="secondary"
              size="sm"
              block
              class="text-[9px] font-black uppercase"
              @click.stop="isLessonDrawerOpen = true"
              >Update Lesson</BaseButton
            >
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:users"
              @click.stop="selectCourse(course)"
            />
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- 2. DYNAMIC STUDENT LIST (Filtered by Selection) -->
    <BaseCard
      v-if="selectedCourse"
      :padding="false"
      class="border-t-4 border-maedot-gold"
    >
      <div
        class="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center"
      >
        <div>
          <h3 class="font-black text-maedot-navy uppercase text-xs">
            Students: {{ selectedCourse.title }}
          </h3>
          <p class="text-[9px] text-slate-400 font-bold uppercase">
            Enrolled Batch: {{ selectedCourse.batch }}
          </p>
        </div>
        <div
          v-if="selectedCourse.status === 'Completed'"
          class="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase"
        >
          <Icon name="lucide:award" /> Final Assessment Complete
        </div>
      </div>

      <BaseDataTable :data="students">
        <Column
          field="name"
          header="Student Name"
          class="font-bold text-slate-700 text-xs"
        />
        <Column field="attendance" header="Attendance %">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <div class="w-16 bg-slate-100 h-1 rounded-full">
                <div
                  class="bg-emerald-500 h-full"
                  :style="{ width: data.attendance + '%' }"
                ></div>
              </div>
              <span
                class="text-[10px] font-bold"
                :class="
                  data.attendance < 80 ? 'text-rose-500' : 'text-emerald-600'
                "
                >{{ data.attendance }}%</span
              >
            </div>
          </template>
        </Column>
        <Column header="Certification">
          <template #body="{ data }">
            <BaseButton
              v-if="
                data.attendance >= 80 && selectedCourse.status === 'Completed'
              "
              variant="primary"
              size="sm"
              class="bg-emerald-600 border-none text-[8px] h-auto px-3 py-1 uppercase font-black"
              @click="handleGraduation(data)"
            >
              Issue Certificate
            </BaseButton>
            <span
              v-else
              class="text-[9px] font-black text-slate-300 uppercase italic"
              >Not Eligible</span
            >
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>

    <!-- 3. LESSON & ATTENDANCE DRAWER -->
    <BaseGovernanceDrawer
      :is-open="isLessonDrawerOpen"
      :title="'Lesson Update: ' + selectedCourse?.title"
      subtitle="Logging Attendance & Curriculum Progress"
      action-label="Sync & Save Lesson"
      @close="isLessonDrawerOpen = false"
      @confirm="handleLessonUpdate"
    >
      <div class="space-y-6">
        <div class="p-4 bg-maedot-navy rounded-3xl text-white text-center">
          <p class="text-[10px] font-black text-maedot-gold uppercase mb-1">
            Current Progress
          </p>
          <p class="text-xl font-black">
            {{ selectedCourse?.completedLessons + 1 }} / 12 Lessons
          </p>
        </div>

        <div class="space-y-3">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Attendance: {{ selectedCourse?.batch }}</label
          >
          <div class="max-h-60 overflow-y-auto space-y-2 pr-2">
            <div
              v-for="s in students"
              :key="s.id"
              class="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <span class="text-xs font-bold text-slate-700">{{ s.name }}</span>
              <input
                type="checkbox"
                v-model="s.isPresent"
                class="w-5 h-5 rounded border-slate-300 text-emerald-500 accent-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isAddModuleOpen"
      title="Register New Module"
      subtitle="Defining Curriculum Roadmap & Batch Assignment"
      action-label="Authorize Module Creation"
      @close="isAddModuleOpen = false"
      @confirm="handleCreateModule"
    >
      <div class="space-y-6">
        <!-- 1. BASIC INFO -->
        <BaseInput
          label="Module Title"
          placeholder="e.g. Dogmatic Theology I"
          icon="lucide:book-open"
        />

        <div class="grid grid-cols-2 gap-4">
          <!-- 2. BATCH ASSIGNMENT -->
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Target Batch</label
            >
            <select
              class="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xs font-bold outline-none"
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year+</option>
            </select>
          </div>

          <!-- 3. INSTRUCTOR LINK -->
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Assign Instructor</label
            >
            <select
              class="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xs font-bold outline-none"
            >
              <option>Memhir Melaku</option>
              <option>Dn. Solomon</option>
            </select>
          </div>
        </div>

        <!-- 4. DYNAMIC PHASE LOGIC -->
        <div class="p-6 bg-maedot-navy rounded-[2.5rem] text-white space-y-4">
          <div class="flex justify-between items-center">
            <p class="text-[10px] font-black text-maedot-gold uppercase">
              Course Structure
            </p>
            <Icon name="lucide:layers" class="text-maedot-gold w-5 h-5" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              label="Total Phases"
              type="number"
              value="3"
              class="bg-white/10"
            />
            <BaseInput
              label="Total Lessons"
              type="number"
              value="12"
              class="bg-white/10"
            />
          </div>
          <p class="text-[9px] text-slate-400 italic">
            "Phases allow for mid-term batch progression gates."
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
