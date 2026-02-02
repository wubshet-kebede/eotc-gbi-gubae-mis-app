<script setup>
definePageMeta({ layout: "admin" });
const archiveFolders = [
  { year: "2015 E.C", graduates: 45 },
  { year: "2016 E.C", graduates: 52 },
  { year: "2017 E.C", graduates: 38 },
];
const pastCourses = ref([
  { course: "Dogma 101", teacher: "Memhir Melaku", batch: "2016 E.C" },
  { course: "Ge'ez Level 1", teacher: "Dn. Elias", batch: "2015 E.C" },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Academic Archives
      </h1>
      <BaseButton variant="secondary" icon="lucide:search"
        >Search Past Students</BaseButton
      >
    </div>

    <!-- Archive Categorization (Ref #1 Institutional Memory) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in archiveFolders"
        :key="folder.year"
        class="hover:border-maedot-gold cursor-pointer transition-all"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-slate-50 rounded-xl">
            <Icon name="lucide:folder-lock" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-maedot-navy">
              {{ folder.year }} Academic Year
            </h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ folder.graduates }} Students Certified
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Historical Course Records -->
    <BaseDataTable title="Past Course Completions" :data="pastCourses">
      <Column field="course" header="Course Name" />
      <Column field="teacher" header="Instructor" />
      <Column field="batch" header="Batch Year" />
      <Column header="Final Report">
        <template #body>
          <BaseButton
            variant="ghost"
            size="sm"
            icon="lucide:file-text"
            class="text-maedot-gold"
            >Download PDF</BaseButton
          >
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
