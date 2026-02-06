<script setup>
/**
 * ACADEMIC ARCHIVES (Ref #4 & #1)
 * Logic: Permanent Record of Curriculum & Graduation History
 */
definePageMeta({ layout: "admin" });

const archiveFolders = [
  { year: "2017 E.C", graduates: 38, topSubject: "Dogma" },
  { year: "2016 E.C", graduates: 52, topSubject: "History" },
  { year: "2015 E.C", graduates: 45, topSubject: "Ge'ez" },
];

const pastCourses = ref([
  {
    course: "Dogma 101",
    teacher: "Memhir Melaku",
    batch: "2016 E.C",
    avgAttendance: "94%",
  },
  {
    course: "Ge'ez Level 1",
    teacher: "Dn. Elias",
    batch: "2015 E.C",
    avgAttendance: "88%",
  },
]);

const downloadMasterReport = (yr) => {
  alert(`Generating Full Academic Report for ${yr}...`);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          Academic Archives
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest italic"
        >
          Institutional Memory & Alumni Registry
        </p>
      </div>
      <BaseButton
        variant="secondary"
        icon="lucide:file-search"
        @click="handleGlobalSearch"
        >Forensic Student Search</BaseButton
      >
    </div>

    <!-- Yearly Envelopes with Top Subject -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        class="group hover:border-maedot-gold cursor-pointer transition-all border-b-4 border-b-slate-200 hover:border-b-maedot-gold"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10 transition-colors"
          >
            <Icon name="lucide:library-big" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4
              class="font-black text-sm text-maedot-navy uppercase tracking-tight"
            >
              {{ folder.year }} Term
            </h4>
            <p class="text-[9px] text-slate-400 font-black uppercase">
              {{ folder.graduates }} Certified • Top: {{ folder.topSubject }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Historical Table with Analytics -->
    <BaseCard :padding="false" title="Historical Curriculum Performance">
      <BaseDataTable :data="pastCourses">
        <Column
          field="course"
          header="Course Name"
          class="font-bold text-maedot-navy text-xs"
        />
        <Column
          field="batch"
          header="Batch"
          class="text-[10px] font-black text-slate-400"
        />
        <Column field="teacher" header="Instructor" />
        <Column field="avgAttendance" header="Avg. Attendance" />
        <Column header="Archived Data">
          <template #body="{ data }">
            <div class="flex gap-2">
              <BaseButton
                variant="ghost"
                size="sm"
                icon="lucide:file-down"
                class="text-maedot-gold text-[10px] uppercase font-black"
                @click="downloadMasterReport(data.batch)"
                >Syllabus</BaseButton
              >
              <BaseButton
                variant="ghost"
                size="sm"
                icon="lucide:users-2"
                class="text-maedot-navy text-[10px] uppercase font-black"
                >Graduates</BaseButton
              >
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
  </div>
</template>
