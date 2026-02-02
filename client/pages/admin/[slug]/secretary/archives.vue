<script setup>
definePageMeta({ layout: "admin" });

const currentYear = 2018;

const folders = [
  { name: "Senate Minutes", icon: "lucide:users", count: 12 },
  { name: "Incoming Letters", icon: "lucide:mail-warning", count: 45 },
  { name: "Outgoing Letters", icon: "lucide:send-to-back", count: 32 },
];

const sealedRecords = ref([
  {
    fileName: "Minutes_Assembly_04.pdf",
    category: "SENATE",
    dateSealed: "Oct 15",
  },
  {
    fileName: "Letter_Uni_Hall_Request.pdf",
    category: "PROTOCOL",
    dateSealed: "Oct 20",
  },
  {
    fileName: "Q1_Consolidated_Report.pdf",
    category: "REPORTS",
    dateSealed: "Oct 28",
  },
]);
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-black text-maedot-navy uppercase">
          Administrative Archives
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Current Year Records: {{ currentYear }} E.C.
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:archive-restore"
        >Restore Draft</BaseButton
      >
    </div>

    <!-- Archive Folders (Ref #3 Master Directory) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="folder in folders"
        :key="folder.name"
        class="group cursor-pointer hover:border-maedot-gold transition-all"
        padding
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3 bg-slate-50 rounded-xl group-hover:bg-maedot-gold/10 transition-colors"
          >
            <Icon :name="folder.icon" class="w-6 h-6 text-maedot-navy" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-slate-700">{{ folder.name }}</h4>
            <p class="text-[10px] text-slate-400 font-black uppercase">
              {{ folder.count }} Files Sealed
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Detailed Archive List -->
    <BaseDataTable
      title="Quick Access: Recent Sealed Records"
      :data="sealedRecords"
    >
      <Column field="fileName" header="File Name" />
      <Column field="category" header="Category" />
      <Column field="dateSealed" header="Sealed Date" />
      <Column header="Access">
        <template #body>
          <div class="flex gap-2">
            <Icon
              name="lucide:download"
              class="w-4 h-4 text-slate-400 cursor-pointer hover:text-maedot-gold"
            />
            <Icon
              name="lucide:eye"
              class="w-4 h-4 text-slate-400 cursor-pointer hover:text-maedot-gold"
            />
          </div>
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
