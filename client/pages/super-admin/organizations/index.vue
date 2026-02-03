<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

definePageMeta({ layout: "super" });

const searchQuery = ref("");

const activeOrgs = ref([
  {
    id: 1,
    name: "Fasil Gbi Gubae",
    slug: "fasil",
    city: "Gondar",
    members: 1450,
    lastActive: "2 mins ago",
    status: "Active",
  },
  {
    id: 2,
    name: "Arat Kilo Gbi",
    slug: "arat-kilo",
    city: "Addis Ababa",
    members: 2100,
    lastActive: "5 mins ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Maraki Gbi Gubae",
    slug: "maraki",
    city: "Gondar",
    members: 620,
    lastActive: "1 hour ago",
    status: "Archived",
  },
]);

// TASK: Lifecycle Actions
const toggleStatus = (org, newStatus) => {
  org.status = newStatus;
  alert(`${org.name} is now ${newStatus}`);
  // In Prod: Trigger Hasura Mutation to update organization_status
};
const isModalOpen = ref(false);
const currentAction = ref("");
const selectedOrg = ref(null);

const openModal = (org, type) => {
  selectedOrg.value = org;
  currentAction.value = type;
  isModalOpen.value = true;
};

const handleConfirm = () => {
  // Execute Hasura Mutation based on currentAction
  console.log(
    `Action ${currentAction.value} executed for ${selectedOrg.value.name}`,
  );
  isModalOpen.value = false;
};
const beginInspection = (slug) => {
  // Logic: In the future, we set a 'is_inspecting' flag in Pinia
  // for now, we just navigate to their specific dashboard
  navigateTo(`/admin/${slug}/dashboard`);
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
        >
          Active Organizations
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Network Registry & Lifecycle Management
        </p>
      </div>
      <div class="flex gap-3 w-full md:w-auto">
        <BaseInput
          v-model="searchQuery"
          placeholder="Search University..."
          icon="lucide:search"
          class="w-full md:w-72"
        />
        <BaseButton variant="primary" icon="lucide:download">Report</BaseButton>
      </div>
    </div>

    <!-- Active Organizations List (Ref #2 Registry) -->
    <BaseCard :padding="false">
      <BaseDataTable :data="activeOrgs" :filters="searchQuery">
        <Column
          field="name"
          header="Organization Name"
          class="font-bold text-slate-900"
        />

        <Column field="slug" header="Slug (URL)">
          <template #body="{ data }">
            <code
              class="text-[10px] bg-slate-100 px-2 py-1 rounded font-mono text-maedot-navy"
              >/{{ data.slug }}</code
            >
          </template>
        </Column>

        <Column field="city" header="City" />
        <Column field="members" header="Members" />

        <Column header="Lifecycle Status">
          <template #body="{ data }">
            <span
              class="px-2 py-1 rounded text-[9px] font-black uppercase inline-flex items-center gap-1.5"
              :class="
                data.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-slate-100 text-slate-500'
              "
            >
              <div
                class="w-1.5 h-1.5 rounded-full"
                :class="
                  data.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                "
              ></div>
              {{ data.status }}
            </span>
          </template>
        </Column>

        <!-- THE MANAGEMENT MENU (Headless UI) -->
        <Column header="Manage Control" class="w-48">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <!-- Archive Button -->
              <button
                @click="openModal(data, 'archive')"
                class="p-2 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 rounded-lg transition-colors"
                title="Archive Batch"
              >
                <Icon name="lucide:archive" class="w-4 h-4" />
              </button>

              <!-- Suspend Button -->
              <button
                @click="openModal(data, 'suspend')"
                class="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                title="Suspend Gbi"
              >
                <Icon name="lucide:user-x" class="w-4 h-4" />
              </button>

              <!-- Edit/Inspect Button -->
              <button
                @click="beginInspection(data.slug)"
                class="p-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-all flex items-center gap-2 px-3"
              >
                <Icon name="lucide:search-code" class="w-4 h-4" />
                <span class="text-[10px] font-black uppercase">Inspect</span>
              </button>
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
    <SuperGovernanceModal
      :is-open="isModalOpen"
      :action-type="currentAction"
      :org-name="selectedOrg?.name"
      @close="isModalOpen = false"
      @confirm="handleConfirm"
    />
  </div>
</template>
