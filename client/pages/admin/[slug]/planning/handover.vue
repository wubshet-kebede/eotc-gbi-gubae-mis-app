<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase tracking-tight">
        Strategy Handover
      </h1>
      <span
        class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase"
        >Plan Continuity</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. Data Integrity Check (Ref #11 Business Intelligence) -->
      <BaseCard title="Data Cleanliness Audit">
        <p class="text-xs text-slate-500 mb-4 italic">
          Verify that all 11 departments have closed their data for 2018 E.C.
        </p>
        <div class="space-y-4">
          <div
            v-for="item in dataCheck"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <span class="text-xs font-bold text-slate-700">{{
              item.label
            }}</span>
            <Icon
              :name="item.done ? 'lucide:check-circle' : 'lucide:clock'"
              :class="item.done ? 'text-emerald-500' : 'text-slate-300'"
              class="w-5 h-5"
            />
          </div>
        </div>
      </BaseCard>

      <!-- 2. Transfer of Analytics Authority -->
      <div class="space-y-6">
        <BaseCard
          title="Next Year's Draft Plan"
          class="border-t-4 border-maedot-gold"
        >
          <div
            class="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-3"
          >
            <Icon name="lucide:upload-cloud" class="w-8 h-8 text-slate-300" />
            <p class="text-[10px] font-black uppercase text-slate-400">
              Upload 2019 E.C Proposal
            </p>
            <BaseButton size="sm" variant="secondary">Browse PDF</BaseButton>
          </div>
        </BaseCard>

        <BaseButton
          block
          variant="primary"
          icon="lucide:trending-up"
          :disabled="!allDone"
        >
          Handover Strategic Control
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const allDone = ref(false);
const dataCheck = [
  { id: 1, label: "Finance Ledger Reconciled", done: true },
  { id: 2, label: "Education Milestones Sealed", done: true },
  { id: 3, label: "Final Member Directory Audited", done: false },
];
</script>
