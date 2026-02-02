<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1 class="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Global User Directory
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Manage all 12 Department Leaders across Ethiopia
        </p>
      </div>
    </div>

    <BaseCard :padding="false" class="border-t-4 border-slate-900 shadow-xl">
      <div
        class="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center bg-slate-50/50"
      >
        <BaseInput
          placeholder="Search name, ID, or Gbi..."
          icon="lucide:search"
          class="flex-grow max-w-md"
        />
        <select
          class="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none"
        >
          <option>All Roles</option>
          <option>Chairperson</option>
          <option>Finance Head</option>
        </select>
      </div>

      <BaseDataTable :data="globalUsers">
        <Column field="name" header="Name" class="font-bold text-slate-800" />
        <Column field="role" header="Role" />
        <Column field="guba" header="Organization" />
        <Column field="status" header="Status">
          <template #body="{ data }">
            <span
              :class="data.isActive ? 'text-emerald-600' : 'text-rose-600'"
              class="text-[10px] font-black uppercase"
            >
              {{ data.isActive ? "Active" : "Banned" }}
            </span>
          </template>
        </Column>
        <Column header="Access Control">
          <template #body="{ data }">
            <div class="flex gap-2">
              <BaseButton variant="ghost" size="sm" class="text-maedot-gold"
                >Reset PW</BaseButton
              >
              <BaseButton
                variant="ghost"
                size="sm"
                class="text-rose-600"
                @click="data.isActive = !data.isActive"
              >
                {{ data.isActive ? "Suspend" : "Unban" }}
              </BaseButton>
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" });
const globalUsers = ref([
  {
    id: 1,
    name: "Selam Tesfaye",
    role: "Finance Head",
    guba: "Fasil Gbi",
    isActive: true,
  },
  {
    id: 2,
    name: "Abebe Kebede",
    role: "Chairperson",
    guba: "Arat Kilo",
    isActive: true,
  },
  {
    id: 3,
    name: "Dawit Zewdu",
    role: "Audit Lead",
    guba: "Tewodros Gbi",
    isActive: false,
  },
]);
</script>
