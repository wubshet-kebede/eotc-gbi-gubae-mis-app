<template>
  <div class="space-y-6 animate-fade-in">
    <!-- 1. HEADER & SEARCH -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
        >
          Global Identity Control
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Master Chairperson Directory & Security Access
        </p>
      </div>
      <div class="flex gap-3 w-full md:w-auto">
        <BaseInput
          v-model="searchQuery"
          placeholder="Search by name, phone or university..."
          icon="lucide:search"
          class="w-full md:w-80"
        />
      </div>
    </div>

    <!-- 2. MASTER USER TABLE (Ref #12 Audit & Security) -->
    <BaseCard :padding="false">
      <BaseDataTable :data="globalUsers" :filters="searchQuery">
        <Column
          field="name"
          header="Full Name"
          class="font-bold text-slate-900"
        />

        <Column field="university" header="University / Gbi" />

        <Column header="Live Status">
          <template #body="{ data }">
            <Tag
              :severity="data.isOnline ? 'success' : 'secondary'"
              class="uppercase text-[9px] font-black"
            >
              <div class="flex items-center gap-1.5">
                <div
                  v-if="data.isOnline"
                  class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                ></div>
                {{ data.isOnline ? "Online" : "Offline" }}
              </div>
            </Tag>
          </template>
        </Column>

        <Column header="Verification">
          <template #body="{ data }">
            <button
              @click="viewCreds(data)"
              class="text-maedot-gold font-black uppercase text-[10px]"
            >
              View Credentials
            </button>
          </template>
        </Column>

        <Column header="Security">
          <template #body="{ data }">
            <div class="flex gap-2">
              <BaseButton variant="ghost" @click="triggerAction(data, 'reset')"
                >Reset</BaseButton
              >
              <BaseButton
                variant="ghost"
                class="text-rose-600"
                @click="triggerAction(data, 'ban')"
                >Ban</BaseButton
              >
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
    <SuperSecurityModal
      :is-open="isModalOpen"
      :action-type="activeAction"
      :user-name="selectedUser?.name"
      @close="isModalOpen = false"
      @confirm="executeAction"
    />
    <SuperCredentialDrawer
      :is-open="isCredsOpen"
      :user="selectedUser"
      @close="isCredsOpen = false"
    />
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import Tag from "primevue/tag";

definePageMeta({ layout: "super" });

const searchQuery = ref("");

const globalUsers = ref([
  {
    id: 1,
    name: "Dn. Solomon Tesfaye",
    university: "Fasil University Gbi",
    isOnline: true,
    phone: "+251911...",
  },
  {
    id: 2,
    name: "Selamawit Tadesse",
    university: "Arat Kilo Gbi",
    isOnline: false,
    phone: "+251912...",
  },
  {
    id: 3,
    name: "Bereket Zewdu",
    university: "Hawassa University",
    isOnline: true,
    phone: "+251920...",
  },
]);

const handleReset = (user) => {
  const confirm = window.confirm(`Generate new Master PIN for ${user.name}?`);
  if (confirm) alert("Reset link sent via SMS to verified phone.");
};

const handleBan = (user) => {
  alert(`Security Alert: ${user.name} has been globally suspended.`);
};
const isModalOpen = ref(false);
const activeAction = ref("");
const selectedUser = ref(null);

const triggerAction = (user, type) => {
  selectedUser.value = user;
  activeAction.value = type;
  isModalOpen.value = true;
};

const executeAction = () => {
  // Logic: Call Hasura Action
  alert(`${activeAction.value} successful for ${selectedUser.value.name}`);
  isModalOpen.value = false;
};
const isCredsOpen = ref(false);
const viewCreds = (user) => {
  selectedUser.value = user;
  isCredsOpen.value = true;
};
</script>
