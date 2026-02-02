<script setup>
definePageMeta({ layout: "admin" });

const selectedClass = ref(null);
const showAddClass = ref(false);

const abinetClasses = ref([
  {
    id: 1,
    name: "Kiddase Zema",
    teacher: "Memhir Zewdu",
    schedule: "Sat/Sun",
    milestones: 8,
  },
  {
    id: 2,
    name: "Wudase Mariam",
    teacher: "Dn. Elias",
    schedule: "Tues/Thurs",
    milestones: 11,
  },
  {
    id: 3,
    name: "Ge'ez Language Lvl 1",
    teacher: "Memhir Tekle",
    schedule: "Mon/Wed",
    milestones: 4,
  },
]);

const students = ref([
  {
    id: 1,
    name: "Abebe Kebede",
    uniId: "UoG/123/14",
    progress: 75,
    present: true,
  },
  {
    id: 2,
    name: "Selam Tesfaye",
    uniId: "UoG/456/14",
    progress: 40,
    present: false,
  },
  {
    id: 3,
    name: "Dawit Zewdu",
    uniId: "UoG/789/14",
    progress: 95,
    present: true,
  },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Breadcrumbs -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div class="space-y-1">
        <div
          class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
        >
          <NuxtLink
            :to="`/admin/${$route.params.slug}/education`"
            class="hover:text-maedot-gold"
            >Education</NuxtLink
          >
          <Icon name="lucide:chevron-right" class="w-3 h-3" />
          <span>Abinet Tracking</span>
        </div>
        <h1 class="text-2xl font-black text-maedot-navy uppercase">
          Traditional Class Registry
        </h1>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus"
        @click="showAddClass = true"
        >Create New Stream</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. ACTIVE CLASS SELECTOR (Left Rail) -->
      <div class="lg:col-span-4 space-y-4">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Select Active Class
        </h3>
        <div
          v-for="cls in abinetClasses"
          :key="cls.id"
          @click="selectedClass = cls"
          class="p-4 rounded-2xl border cursor-pointer transition-all space-y-3"
          :class="
            selectedClass?.id === cls.id
              ? 'bg-white border-maedot-gold shadow-lg ring-1 ring-maedot-gold/20'
              : 'bg-white/50 border-slate-200 hover:border-slate-300'
          "
        >
          <div class="flex justify-between items-start">
            <div
              class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"
            >
              <Icon
                name="lucide:church"
                :class="
                  selectedClass?.id === cls.id
                    ? 'text-maedot-gold'
                    : 'text-slate-400'
                "
                class="w-6 h-6"
              />
            </div>
            <span
              class="text-[10px] font-black px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase"
              >{{ cls.schedule }}</span
            >
          </div>
          <div>
            <h4 class="font-bold text-maedot-navy">{{ cls.name }}</h4>
            <p class="text-xs text-slate-500">Instructor: {{ cls.teacher }}</p>
          </div>
        </div>
      </div>

      <!-- 2. ATTENDANCE & MILESTONE LOG (Main View) -->
      <div class="lg:col-span-8">
        <BaseCard
          v-if="selectedClass"
          :padding="false"
          class="border-t-4 border-maedot-gold"
        >
          <div
            class="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h3 class="font-black text-maedot-navy uppercase text-sm">
                Attendance: {{ selectedClass.name }}
              </h3>
              <p class="text-xs text-slate-400 font-medium">
                Session: {{ new Date().toLocaleDateString("en-ET") }} (E.C.)
              </p>
            </div>
            <div class="flex gap-2">
              <BaseButton
                variant="secondary"
                size="sm"
                icon="lucide:check-circle-2"
                >Mark All Present</BaseButton
              >
              <BaseButton variant="primary" size="sm" icon="lucide:save"
                >Save Attendance</BaseButton
              >
            </div>
          </div>

          <!-- Student List with Toggle (Fast Interaction) -->
          <div class="overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead
                class="bg-slate-50 text-[10px] uppercase font-bold text-slate-500"
              >
                <tr>
                  <th class="px-6 py-3">Student Name</th>
                  <th class="px-6 py-3">ID Number</th>
                  <th class="px-6 py-3">Progress</th>
                  <th class="px-6 py-3 text-right">Attendance</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr
                  v-for="student in students"
                  :key="student.id"
                  class="hover:bg-slate-50/50 transition-colors"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-7 h-7 rounded-full bg-maedot-navy text-white text-[10px] flex items-center justify-center font-bold uppercase"
                      >
                        {{ student.name.charAt(0) }}
                      </div>
                      <span class="text-sm font-bold text-slate-700">{{
                        student.name
                      }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-xs text-slate-400">
                    {{ student.uniId }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="w-24 bg-slate-100 h-1.5 rounded-full">
                      <div
                        class="bg-maedot-gold h-full"
                        :style="{ width: student.progress + '%' }"
                      ></div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <label
                      class="relative inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        v-model="student.present"
                        class="sr-only peer"
                      />
                      <div
                        class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"
                      ></div>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>

        <!-- Placeholder when no class is selected -->
        <div
          v-else
          class="h-64 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 space-y-3"
        >
          <Icon
            name="lucide:mouse-pointer-click"
            class="w-10 h-10 opacity-20"
          />
          <p class="text-sm font-medium">
            Select an Abinet class stream to start tracking
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
