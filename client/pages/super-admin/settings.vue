<template>
  <div class="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
    <!-- Header -->
    <div class="border-b border-slate-200 pb-6">
      <h1 class="text-3xl font-black text-slate-900 uppercase tracking-tighter">
        System Configuration
      </h1>
      <p class="text-sm text-slate-500 font-medium">
        Global parameters for the Ma'edot Network.
      </p>
    </div>

    <!-- 1. GLOBAL STATE (Ref #11 Planning Link) -->
    <BaseCard title="Academic Synchronization">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-1">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Active Ethiopian Year</label
          >
          <div class="flex items-center gap-4">
            <input
              v-model="globalYear"
              type="number"
              class="w-32 p-3 bg-slate-50 border rounded-2xl font-black text-lg text-maedot-navy outline-none focus:border-maedot-gold"
            />
            <BaseButton variant="primary" size="sm" @click="confirmYearChange"
              >Update Network</BaseButton
            >
          </div>
        </div>
        <p class="text-[11px] text-slate-400 italic">
          Changing this will refresh the "Institutional Memory" cycle for all
          active tenants.
        </p>
      </div>
    </BaseCard>

    <!-- 2. EMERGENCY & MAINTENANCE -->
    <BaseCard class="border-l-4 border-rose-600 bg-rose-50/30">
      <div class="flex justify-between items-center">
        <div class="space-y-1">
          <h3 class="font-black text-rose-700 uppercase text-sm">
            Global Maintenance Mode
          </h3>
          <p class="text-xs text-rose-600/70">
            Restrict all write access during system upgrades.
          </p>
        </div>
        <Switch
          v-model="isMaintenance"
          :class="isMaintenance ? 'bg-rose-600' : 'bg-slate-300'"
          class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none"
        >
          <span
            :class="isMaintenance ? 'translate-x-8' : 'translate-x-1'"
            class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform"
          />
        </Switch>
      </div>
    </BaseCard>

    <!-- 3. PLATFORM ANNOUNCEMENT ENGINE -->
    <BaseCard title="Global Dashboard Announcement">
      <div class="space-y-4">
        <textarea
          v-model="announcement"
          rows="3"
          class="w-full p-4 bg-slate-50 border rounded-2xl text-sm italic outline-none focus:border-maedot-gold"
          placeholder="Type a message for all 12-department leaders..."
        ></textarea>
        <div class="flex justify-end">
          <BaseButton variant="secondary" icon="lucide:megaphone"
            >Broadcast Message</BaseButton
          >
        </div>
      </div>
    </BaseCard>

    <!-- 4. SYSTEM HEALTH SNAPSHOT -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCard title="Database Health">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-slate-500">API Response Time</span>
          <span class="text-emerald-600">42ms</span>
        </div>
        <div class="mt-4 flex gap-2">
          <BaseButton
            variant="ghost"
            size="sm"
            block
            icon="lucide:database-backup"
            >Manual Backup</BaseButton
          >
        </div>
      </BaseCard>

      <BaseCard title="Storage (S3/Cloudinary)">
        <div class="flex justify-between text-xs font-bold mb-2">
          <span class="text-slate-500">Capacity Used</span>
          <span>4.2 GB / 10 GB</span>
        </div>
        <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div class="bg-maedot-navy h-full" style="width: 42%"></div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";
definePageMeta({ layout: "super" });

const globalYear = ref(2018);
const isMaintenance = ref(false);
const announcement = ref("");

const confirmYearChange = () => {
  const ok = window.confirm("This will affect all Gubaes. Proceed?");
  if (ok) alert("Network Year Updated.");
};
</script>
