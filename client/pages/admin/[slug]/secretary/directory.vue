<script setup>
definePageMeta({ layout: "admin" });
const members = ref([
  { name: "Abebe Kebede", id: "UoG/123/14", dept: "Finance", status: "Active" },
  {
    name: "Selam Tesfaye",
    id: "UoG/456/14",
    dept: "Education",
    status: "Active",
  },
]);
</script>
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Master Directory
      </h1>
      <div class="flex gap-2">
        <BaseButton variant="secondary" icon="lucide:download"
          >Export CSV</BaseButton
        >
      </div>
    </div>

    <!-- Filter Bar -->
    <BaseCard class="flex gap-4 p-4 bg-slate-50">
      <BaseInput
        class="flex-grow"
        icon="lucide:search"
        placeholder="Search by name or ID..."
      />
      <select class="p-2 border rounded-xl text-xs">
        <option>All Batches</option>
        <option>2014 E.C</option>
        <option>2015 E.C</option>
      </select>
    </BaseCard>

    <BaseDataTable title="Validated Members" :data="members">
      <Column field="name" header="Full Name" />
      <Column field="id" header="Uni ID" />
      <Column field="dept" header="Spiritual Dept" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <span
            class="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-700"
          >
            {{ data.status }}
          </span>
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
