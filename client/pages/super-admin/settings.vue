<template>
  <div class="space-y-8 max-w-4xl mx-auto py-6">
    <div class="border-b pb-4">
      <h1 class="text-3xl font-black text-slate-900 uppercase">
        System Parameters
      </h1>
      <p class="text-sm text-slate-500 font-medium">
        Control global variables for the entire Ma'edot network.
      </p>
    </div>

    <!-- 1. ACADEMIC CALENDAR (Ref #11) -->
    <BaseCard title="Global Calendar Config">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-2">
          <label class="text-xs font-black text-slate-400 uppercase"
            >Active Ethiopian Year</label
          >
          <BaseInput v-model="systemYear" type="number" placeholder="2018" />
          <p
            class="text-[10px] text-slate-400 italic font-medium leading-relaxed"
          >
            Changing this will update all dashboard headers and archive current
            records across all 48 Gubaes.
          </p>
        </div>
        <BaseButton variant="primary" icon="lucide:refresh-cw" block
          >Update Network Year</BaseButton
        >
      </div>
    </BaseCard>

    <!-- 2. EMERGENCY LOCKDOWN (Proactive Maintenance) -->
    <BaseCard class="border-l-4 border-rose-600 bg-rose-50/30">
      <div class="flex justify-between items-center">
        <div class="space-y-1">
          <h3 class="font-black text-rose-700 uppercase text-sm">
            Maintenance Mode
          </h3>
          <p class="text-xs text-rose-600/80">
            Immediately block access to all admin dashboards for system
            upgrades.
          </p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="isMaintenance" class="sr-only peer" />
          <div
            class="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-rose-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
        </label>
      </div>
    </BaseCard>

    <!-- 3. PLATFORM BRANDING -->
    <BaseCard title="Landing Page Meta">
      <div class="space-y-4">
        <BaseInput
          label="System Support Email"
          placeholder="support@maedot.org"
        />
        <div class="flex gap-4">
          <BaseButton variant="secondary" icon="lucide:database-backup"
            >Manual DB Backup</BaseButton
          >
          <BaseButton variant="ghost" class="text-slate-400"
            >View System Logs</BaseButton
          >
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" });
const systemYear = ref(2018);
const isMaintenance = ref(false);
</script>
