<script setup>
/**
 * ABINET TRACKING MODULE (Ref #4)
 * Logic: Mastery-Based Progression, Bulk Certification, and Manual Promotion
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// 1. STATE: Selected Book Stream (The Buckets)
const selectedClass = ref(null);
const isEnrollOpen = ref(false);
const selectedStudents = ref([]); // For Bulk Actions

// 2. DATA: Traditional Subjects (The sequence: Wudase -> Dawit -> Kiddase)
const abinetClasses = ref([
  {
    id: 1,
    name: "Wudase Mariam",
    teacher: "Memhir Zewdu",
    schedule: "Daily",
    type: "ABINET",
  },
  {
    id: 2,
    name: "Mezmure Dawit",
    teacher: "Memhir Tekle",
    schedule: "Daily",
    type: "ABINET",
  },
  {
    id: 3,
    name: "Kiddase Zema",
    teacher: "Dn. Elias",
    schedule: "Daily",
    type: "ABINET",
  },
]);

// 3. DATA: Students (Mock data filtered by the selected book)
const students = ref([
  {
    id: 101,
    name: "Abebe Kebede",
    uniId: "UoG/123/14",
    present: true,
    status: "IN_PROGRESS",
  },
  {
    id: 102,
    name: "Selam Tesfaye",
    uniId: "UoG/456/14",
    present: true,
    status: "IN_PROGRESS",
  },
  {
    id: 103,
    name: "Dawit Zewdu",
    uniId: "UoG/789/14",
    present: false,
    status: "IN_PROGRESS",
  },
]);

// 4. TASK: Bulk Certification (The Status Flip)
const handleBulkPromotion = () => {
  if (selectedStudents.value.length === 0) return;

  const count = selectedStudents.value.length;
  // LOGIC:
  // - Mark 'Wudase' as CERTIFIED in DB
  // - Initialize 'Dawit' as IN_PROGRESS
  // - Remove from current view
  alert(
    `Mastery Confirmed: ${count} students certified in ${selectedClass.value.name}. They are now promoted to the next curriculum level.`,
  );

  // UI Refresh
  selectedStudents.value = [];
};

const saveDailyAttendance = () => {
  alert(
    "Daily Attendance & Mastery records have been sealed for this session.",
  );
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <div
          class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
        >
          <NuxtLink
            :to="`/admin/${slug}/education`"
            class="hover:text-maedot-gold transition-colors"
            >Education</NuxtLink
          >
          <Icon name="lucide:chevron-right" class="w-3 h-3" />
          <span>Abinet Mastery</span>
        </div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          Traditional Registry
        </h1>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:user-plus"
        @click="isEnrollOpen = true"
        >Enroll New Student</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- LEFT RAIL: Book Selectors (The Mastery Buckets) -->
      <div class="lg:col-span-4 space-y-4">
        <h3
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2"
        >
          Curriculum Streams
        </h3>
        <div
          v-for="cls in abinetClasses"
          :key="cls.id"
          @click="selectedClass = cls"
          class="p-5 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden"
          :class="
            selectedClass?.id === cls.id
              ? 'bg-white border-maedot-gold shadow-xl'
              : 'bg-white/50 border-slate-200 hover:border-slate-300'
          "
        >
          <div
            v-if="selectedClass?.id === cls.id"
            class="absolute top-0 right-0 p-2"
          >
            <Icon name="lucide:award" class="text-maedot-gold w-5 h-5" />
          </div>
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center"
              :class="
                selectedClass?.id === cls.id
                  ? 'bg-maedot-gold/10'
                  : 'bg-slate-100'
              "
            >
              <Icon
                name="lucide:book-marked"
                :class="
                  selectedClass?.id === cls.id
                    ? 'text-maedot-gold'
                    : 'text-slate-400'
                "
                class="w-6 h-6"
              />
            </div>
            <div>
              <h4
                class="font-black text-maedot-navy uppercase text-xs tracking-tight"
              >
                {{ cls.name }}
              </h4>
              <p class="text-[10px] text-slate-400 font-bold uppercase">
                {{ cls.teacher }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN VIEW: Mastery Table & Bulk Action -->
      <div class="lg:col-span-8">
        <BaseCard
          v-if="selectedClass"
          :padding="false"
          class="border-t-8 border-maedot-navy"
        >
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30"
          >
            <div>
              <h3 class="font-black text-maedot-navy uppercase text-sm italic">
                {{ selectedClass.name }} Registry
              </h3>
              <p
                class="text-[10px] text-slate-400 font-black uppercase tracking-widest"
              >
                Session: {{ new Date().toLocaleDateString("en-ET") }} E.C.
              </p>
            </div>

            <!-- THE PROMOTER ACTION (Visible only when students are checked) -->
            <BaseButton
              v-if="selectedStudents.length > 0"
              variant="primary"
              size="sm"
              icon="lucide:graduation-cap"
              class="bg-emerald-600 border-none animate-bounce"
              @click="handleBulkPromotion"
            >
              Certify & Promote ({{ selectedStudents.length }})
            </BaseButton>
          </div>

          <BaseDataTable :data="students">
            <!-- Checkbox for Manual Promotion Selection -->
            <Column headerStyle="width: 3rem">
              <template #body="{ data }">
                <input
                  type="checkbox"
                  v-model="selectedStudents"
                  :value="data.id"
                  class="w-4 h-4 rounded border-slate-300 text-maedot-gold accent-maedot-gold"
                />
              </template>
            </Column>

            <Column
              field="name"
              header="Student Name"
              class="font-bold text-slate-700 text-xs"
            />
            <Column
              field="uniId"
              header="University ID"
              class="text-[10px] text-slate-400 font-medium"
            />

            <Column header="Mastery Status">
              <template #body>
                <span
                  class="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[8px] font-black uppercase border border-amber-100"
                  >In Progress</span
                >
              </template>
            </Column>

            <Column header="Today's Attendance" class="text-right">
              <template #body="{ data }">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="data.present"
                    class="sr-only peer"
                  />
                  <div
                    class="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"
                  ></div>
                </label>
              </template>
            </Column>
          </BaseDataTable>

          <div
            class="p-4 bg-slate-50 flex justify-end border-t border-slate-100"
          >
            <BaseButton
              variant="primary"
              icon="lucide:save"
              @click="saveDailyAttendance"
              >Save Daily Record</BaseButton
            >
          </div>
        </BaseCard>

        <!-- EMPTY STATE -->
        <div
          v-else
          class="h-96 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 gap-4"
        >
          <div class="p-6 bg-slate-50 rounded-full">
            <Icon
              name="lucide:mouse-pointer-click"
              class="w-12 h-12 opacity-20"
            />
          </div>
          <p class="text-xs font-black uppercase tracking-widest">
            Select a Book Stream to Manage Mastery
          </p>
        </div>
      </div>
    </div>
    <BaseGovernanceDrawer
      :is-open="isEnrollOpen"
      title="Enroll Student in Abinet"
      subtitle="Adding a member to the Traditional School"
      action-label="Authorize Enrollment"
      @close="isEnrollOpen = false"
      @confirm="handleEnrollment"
    >
      <div class="space-y-6">
        <!-- 1. GLOBAL SEARCH (Linking to Secretary's Data) -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Search Global Registry</label
          >
          <BaseInput
            placeholder="Type Name or Uni ID..."
            icon="lucide:search"
          />
          <p class="text-[9px] text-slate-400 italic">
            Select from the existing Gbi Guba members list.
          </p>
        </div>

        <!-- 2. CONTEXT PREVIEW -->
        <div
          class="p-5 bg-maedot-navy rounded-3xl text-white space-y-3 relative overflow-hidden"
        >
          <Icon
            name="lucide:book-open"
            class="absolute -right-4 -bottom-4 w-20 h-20 opacity-10 text-maedot-gold"
          />
          <p class="text-[10px] font-black text-maedot-gold uppercase">
            Target Stream
          </p>
          <p class="text-sm font-bold">
            {{ selectedClass?.name || "Please select a book stream first" }}
          </p>
          <p class="text-[10px] opacity-60 uppercase font-black">
            Instructor: {{ selectedClass?.teacher }}
          </p>
        </div>

        <!-- 3. ADDITIONAL METADATA -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Entry Note (Optional)</label
          >
          <textarea
            class="w-full p-4 bg-slate-50 border rounded-3xl text-xs outline-none focus:border-maedot-gold"
            placeholder="e.g. Starting from the beginning of the book..."
          ></textarea>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
