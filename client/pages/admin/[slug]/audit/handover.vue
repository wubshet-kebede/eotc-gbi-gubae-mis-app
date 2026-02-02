<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase tracking-tight">
        Audit Handover & Transition
      </h1>
      <span
        class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter animate-pulse"
        >Final System Seal</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. GLOBAL CLEARANCE STATUS (Ref #12 Digital Sign-off Log) -->
      <BaseCard title="Departmental Clearance Summary">
        <div class="space-y-4">
          <div
            v-for="dept in clearanceStatus"
            :key="dept.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <span
              class="text-xs font-bold text-slate-700 uppercase tracking-tight"
              >{{ dept.name }}</span
            >
            <div class="flex items-center gap-2">
              <span
                :class="dept.cleared ? 'text-emerald-600' : 'text-rose-500'"
                class="text-[10px] font-black uppercase"
              >
                {{ dept.cleared ? "Cleared" : "Blocked" }}
              </span>
              <Icon
                :name="dept.cleared ? 'lucide:check-circle' : 'lucide:x-circle'"
                :class="dept.cleared ? 'text-emerald-500' : 'text-rose-500'"
              />
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- 2. AUDIT KEY TRANSFER -->
      <div class="space-y-6">
        <BaseCard
          class="bg-maedot-navy text-white border-none relative overflow-hidden"
        >
          <Icon
            name="lucide:shield-check"
            class="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 text-maedot-gold"
          />
          <h3 class="text-maedot-gold font-black uppercase text-xs mb-4">
            Transfer Oversight Authority
          </h3>
          <p
            class="text-[11px] text-slate-400 mb-6 leading-relaxed relative z-10"
          >
            "By finalizing this, I confirm that all 12 departments of
            {{ $route.params.slug }} have been reconciled and the Guba is ready
            for the 2019 E.C. cycle."
          </p>
          <BaseButton
            block
            variant="primary"
            icon="lucide:lock-keyhole"
            :disabled="!allCleared"
          >
            Seal Audit & Exit
          </BaseButton>
        </BaseCard>

        <p
          v-if="!allCleared"
          class="text-[10px] text-rose-500 font-bold text-center italic"
        >
          * Cannot exit until Education and Programs resolve pending findings.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const allCleared = ref(false); // Controlled by Dept 12 logic
const clearanceStatus = [
  { id: 1, name: "Finance", cleared: true },
  { id: 2, name: "Education", cleared: false },
  { id: 3, name: "Programs", cleared: false },
  { id: 4, name: "Secretary", cleared: true },
];
</script>
