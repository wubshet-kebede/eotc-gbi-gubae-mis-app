<script setup>
/**
 * HANDOVER & SUCCESSION (Ref #1 & #12)
 * Task: Finalizing the ርክክብ (Handover) between leadership cycles.
 */
definePageMeta({ layout: "admin" });

const isFinalizing = ref(false);
const viceChairName = "Dn. Melaku Teshome";

const checklist = ref([
  { id: 1, label: "Finance Ledger Balanced", done: true },
  { id: 2, label: "Senate Policy Minutes Locked", done: true },
  { id: 3, label: "Audit Clearance (Dept #12)", done: true }, // CRITICAL BLOCKER
  { id: 4, label: "Asset/Property Registry Verified", done: true },
]);

const canFinalize = computed(() => checklist.value.every((item) => item.done));

const triggerHandover = () => {
  if (!canFinalize.value) {
    alert(
      "CRITICAL: Handover blocked. Audit Department (#12) must provide clearance first.",
    );
    return;
  }
  isFinalizing.value = true;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          Succession Terminal
        </h1>
        <p
          class="text-xs text-slate-500 font-bold uppercase tracking-widest italic tracking-tight"
        >
          Year-End Handover & Authority Transfer
        </p>
      </div>
      <BaseButton
        :variant="canFinalize ? 'primary' : 'secondary'"
        :class="!canFinalize && 'opacity-50'"
        icon="lucide:key"
        @click="triggerHandover"
      >
        Finalize Authority Transfer
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. SUCCESSOR IDENTITY -->
      <BaseCard
        title="Incoming Successor"
        subtitle="Verified from current Vice-Chair role"
      >
        <div
          class="p-6 bg-maedot-navy rounded-[2rem] text-white flex items-center gap-6 relative overflow-hidden"
        >
          <Icon
            name="lucide:user-plus"
            class="absolute -right-2 -bottom-2 w-24 h-24 opacity-10"
          />
          <div
            class="w-16 h-16 rounded-2xl bg-maedot-gold flex items-center justify-center text-maedot-navy text-2xl font-black shadow-xl"
          >
            MT
          </div>
          <div>
            <h4 class="text-lg font-black text-white leading-none">
              {{ viceChairName }}
            </h4>
            <p
              class="text-[10px] font-black text-maedot-gold uppercase tracking-widest mt-2"
            >
              Certified Successor
            </p>
          </div>
        </div>
        <div
          class="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[11px] text-slate-500"
        >
          Note: Finalizing this will revoke your
          <strong>Executive Signature</strong> and grant it to the successor.
        </div>
      </BaseCard>

      <!-- 2. INTEGRITY CHECKLIST (Task Alignment) -->
      <BaseCard title="Pre-Succession Checklist">
        <div class="space-y-4">
          <div
            v-for="item in checklist"
            :key="item.id"
            class="flex items-center justify-between p-4 rounded-2xl transition-all"
            :class="
              item.done
                ? 'bg-emerald-50 border border-emerald-100'
                : 'bg-rose-50 border border-rose-100'
            "
          >
            <div class="flex items-center gap-3">
              <Icon
                :name="
                  item.done ? 'lucide:check-circle-2' : 'lucide:alert-circle'
                "
                :class="item.done ? 'text-emerald-500' : 'text-rose-500'"
                class="w-5 h-5"
              />
              <span
                class="text-xs font-bold"
                :class="item.done ? 'text-emerald-900' : 'text-rose-900'"
                >{{ item.label }}</span
              >
            </div>
            <span
              v-if="!item.done"
              class="text-[9px] font-black uppercase text-rose-600 bg-white px-2 py-1 rounded shadow-sm"
              >Required</span
            >
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- THE HANDOVER DRAWER (The Final Meeting Minute) -->
    <BaseGovernanceDrawer
      :is-open="isFinalizing"
      title="The Final Handover"
      subtitle="Generating the Master Succession Document"
      action-label="Seal & Graduate"
      @close="isFinalizing = false"
    >
      <div class="space-y-6">
        <div class="p-6 bg-slate-900 text-white rounded-3xl text-center">
          <p class="text-[10px] font-black text-maedot-gold uppercase">
            Digital Handover Report
          </p>
          <p class="text-xs mt-2 text-slate-300">
            A PDF summary of the 2017 E.C. Ledger and Member Growth will be
            generated and signed by both parties.
          </p>
        </div>
        <BaseInput
          label="Meeting Minute Reference"
          placeholder="e.g. Senate-2017-FINAL"
          icon="lucide:hash"
        />
        <div
          class="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-[10px] font-bold text-amber-800"
        >
          WARNING: This action is irreversible. Your account will be moved to
          the ALUMNI registry.
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
