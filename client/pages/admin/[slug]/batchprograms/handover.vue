<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase tracking-tight">
        Logistics Handover
      </h1>
      <span
        class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase"
        >Transferring Calendar</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. Master Calendar Status (Ref #9) -->
      <BaseCard title="Program & Venue Status">
        <div class="space-y-4">
          <div
            v-for="item in logisticsCheck"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <Icon
                :name="
                  item.done ? 'lucide:check-circle' : 'lucide:alert-circle'
                "
                :class="item.done ? 'text-emerald-500' : 'text-rose-500'"
                class="w-5 h-5"
              />
              <span class="text-xs font-bold text-slate-700">{{
                item.label
              }}</span>
            </div>
            <span class="text-[10px] font-black text-slate-400 uppercase">{{
              item.status
            }}</span>
          </div>
        </div>
      </BaseCard>

      <!-- 2. Transfer Authority -->
      <div class="space-y-6">
        <BaseCard
          title="Succession Verification"
          class="bg-maedot-navy text-white"
        >
          <p class="text-xs text-slate-400 mb-6 italic leading-relaxed">
            "I hereby transfer control of the Automated Announcement Engine and
            Master Calendar to the Incoming Batch Coordinator."
          </p>
          <div class="space-y-2 mb-6">
            <div
              class="flex justify-between text-[10px] uppercase font-black text-maedot-gold"
            >
              <span>Remaining SMS Credits</span>
              <span>2,450</span>
            </div>
          </div>
          <BaseButton
            block
            variant="primary"
            icon="lucide:key-round"
            :disabled="!allDone"
            >Confirm Transfer</BaseButton
          >
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const allDone = ref(false);
const logisticsCheck = [
  { id: 1, label: "Hall Bookings Finalized", status: "Clean", done: true },
  {
    id: 2,
    label: "Announcement Engine Handover",
    status: "Verified",
    done: true,
  },
  { id: 3, label: "Audit of Program Expenses", status: "Pending", done: false },
];
</script>
