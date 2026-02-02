<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-slate-900 uppercase">
        Active Organizations
      </h1>
      <div class="flex gap-4">
        <BaseInput
          placeholder="Search Gbi or City..."
          icon="lucide:search"
          class="w-64"
        />
        <BaseButton variant="primary" icon="lucide:download"
          >Export Network Report</BaseButton
        >
      </div>
    </div>

    <!-- Active Organizations List -->
    <BaseCard :padding="false">
      <BaseDataTable :data="activeOrgs">
        <Column
          field="name"
          header="Organization Name"
          class="font-bold text-slate-900"
        />
        <Column field="slug" header="Slug (URL)">
          <template #body="{ data }">
            <code class="text-[10px] bg-slate-100 px-2 py-1 rounded"
              >/admin/{{ data.slug }}</code
            >
          </template>
        </Column>
        <Column field="city" header="City" />
        <Column field="members" header="Total Members" />
        <Column field="lastActive" header="Last Sync" />
        <Column header="Status">
          <template #body="{ data }">
            <span
              class="px-2 py-1 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-600"
            >
              ● Synchronized
            </span>
          </template>
        </Column>
        <Column header="Manage">
          <template #body>
            <button
              class="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900"
            >
              <Icon name="lucide:settings" class="w-4 h-4" />
            </button>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" });

const activeOrgs = ref([
  {
    id: 1,
    name: "Fasil Gbi Gubae",
    slug: "fasil",
    city: "Gondar",
    members: 1450,
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Arat Kilo Gbi",
    slug: "arat-kilo",
    city: "Addis Ababa",
    members: 2100,
    lastActive: "5 mins ago",
  },
  {
    id: 3,
    name: "Maraki Gbi Gubae",
    slug: "maraki",
    city: "Gondar",
    members: 620,
    lastActive: "1 hour ago",
  },
]);
</script>
