<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Master Logistics Hub
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Unified Event & Batch Coordination (Ref #9)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:calendar-plus"
        @click="showEventForm = true"
        >Schedule Program</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. THE SCHEDULE (Ref #9 Integrated Master Calendar) -->
      <div class="lg:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Upcoming Guba Events
            </h3>
            <div class="flex gap-2">
              <span
                class="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold"
                >No Room Conflicts</span
              >
            </div>
          </div>

          <BaseDataTable :data="events" :loading="loading">
            <Column field="date" header="Date/Time" class="font-bold" />
            <Column field="title" header="Program Name" />
            <Column field="location" header="Venue" />
            <Column field="target" header="Target Batch">
              <template #body="{ data }">
                <span
                  class="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black text-slate-500 uppercase"
                  >{{ data.target }}</span
                >
              </template>
            </Column>
            <Column header="Broadcast">
              <template #body="{ data }">
                <Icon
                  :name="
                    data.announced ? 'lucide:megaphone' : 'lucide:megaphone-off'
                  "
                  :class="
                    data.announced ? 'text-maedot-gold' : 'text-slate-300'
                  "
                  class="w-4 h-4"
                />
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. ANNOUNCEMENT ENGINE (Ref #9) -->
      <div class="lg:col-span-4 space-y-6">
        <BaseCard
          title="Announcement Engine"
          class="bg-maedot-navy text-white border-none"
        >
          <div class="space-y-4">
            <p class="text-[11px] text-slate-400">
              Select target batch to broadcast approved program details via SMS.
            </p>
            <select
              class="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-xs outline-none"
            >
              <option>Select Batch...</option>
              <option>All Batches</option>
              <option>1st Year (Freshmen)</option>
              <option>Graduating Batch</option>
            </select>
            <BaseButton block variant="primary" icon="lucide:send"
              >Send Broadcast</BaseButton
            >
          </div>
        </BaseCard>

        <!-- Preparation Checklist (Ref #9) -->
        <BaseCard title="Program Checklist">
          <div class="space-y-3">
            <div
              v-for="task in checklist"
              :key="task.id"
              class="flex items-center gap-3"
            >
              <input
                type="checkbox"
                v-model="task.done"
                class="rounded text-maedot-gold"
              />
              <span class="text-xs font-medium text-slate-600">{{
                task.label
              }}</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const events = ref([
  {
    id: 1,
    date: "Nov 05 | 4:00 PM",
    title: "General Spiritual Assembly",
    location: "Main Hall",
    target: "ALL",
    announced: true,
  },
  {
    id: 2,
    date: "Nov 07 | 2:00 PM",
    title: "Freshman Orientation",
    location: "Class B2",
    target: "1st Year",
    announced: false,
  },
]);

const checklist = ref([
  { id: 1, label: "Secure Hall Keys", done: true },
  { id: 2, label: "Notify Sound System Dept", done: true },
  { id: 3, label: "Guest Teacher Water/Service", done: false },
]);
</script>
