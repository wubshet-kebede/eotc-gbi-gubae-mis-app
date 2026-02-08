<script setup>
/**
 * STRATEGIC HANDOVER (Ref #2 & #11)
 * Logic: Cross-Departmental Data Locking & Archive Migration
 */
definePageMeta({ layout: "admin" });

const isSealing = ref(false);
const dataCheck = ref([
  { id: 1, label: "Finance Ledger Reconciled", done: true },
  { id: 2, label: "Education Milestones Sealed", done: true },
  { id: 3, label: "Final Member Directory Audited", done: true }, // Verified for demo
]);

// Engineering Constraint: Handover button only works when all Depts are 'done'
const allDone = computed(() => dataCheck.value.every((item) => item.done));

const finalizeSuccession = () => {
  isSealing.value = true;
  // Logic:
  // 1. Snapshot all 12 Dept KPIs
  // 2. Move 2018 E.C. data to the 'public.archives' table
  // 3. Generate the 'Ma'ekel Master Handover Minute'
  setTimeout(() => {
    isSealing.value = false;
    alert(
      "Strategic Control Transferred. 2018 E.C. Data is now LOCKED and moved to Archives.",
    );
  }, 2500);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Strategy Succession
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic italic"
        >
          Sealing the 2018 E.C. Institutional Record
        </p>
      </div>
      <div
        :class="
          allDone
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-rose-100 text-rose-600'
        "
        class="px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-sm"
      >
        {{ allDone ? "System Audit Complete" : "Depts Pending Closure" }}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. DATA INTEGRITY AUDIT -->
      <div class="lg:col-span-7">
        <BaseCard
          title="Cross-Departmental Data Audit"
          subtitle="Verification that all 11 departments have sealed their records"
        >
          <div class="space-y-4">
            <div
              v-for="item in dataCheck"
              :key="item.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-maedot-gold"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="
                    item.done
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-200'
                      : 'bg-slate-200'
                  "
                  class="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                >
                  <Icon
                    :name="item.done ? 'lucide:check' : 'lucide:lock-keyhole'"
                    class="w-4 h-4 text-white"
                  />
                </div>
                <span class="text-xs font-bold text-slate-700">{{
                  item.label
                }}</span>
              </div>
              <span
                v-if="item.done"
                class="text-[9px] font-black text-emerald-500 uppercase tracking-widest"
                >Verified</span
              >
              <BaseButton
                v-else
                variant="secondary"
                size="sm"
                class="text-[9px] font-black uppercase"
                >Send Reminder</BaseButton
              >
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 2. ANALYTICS TRANSFER -->
      <div class="lg:col-span-5 space-y-6">
        <div
          class="p-8 bg-maedot-navy rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <Icon
            name="lucide:trending-up"
            class="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 text-maedot-gold rotate-12"
          />

          <h3
            class="text-sm font-black text-maedot-gold uppercase tracking-widest"
          >
            Succession Terminal
          </h3>
          <p class="text-[11px] text-slate-400 leading-relaxed italic">
            "By sealing this, I certify that the **Strategic Goal Attainment**
            for 2018 E.C. is final. The system will now transition to 2019 E.C.
            parameters."
          </p>

          <div class="pt-6 border-t border-white/10 space-y-4">
            <div
              class="p-4 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-2"
            >
              <p class="text-[9px] font-black uppercase text-slate-400">
                Next Year's Draft Plan
              </p>
              <BaseButton
                size="sm"
                variant="secondary"
                class="bg-white/10 border-white/20 hover:bg-white/20"
                >Upload 2019 Proposal</BaseButton
              >
            </div>
          </div>

          <BaseButton
            block
            variant="primary"
            size="lg"
            icon="lucide:key-round"
            :disabled="!allDone"
            :loading="isSealing"
            @click="finalizeSuccession"
          >
            Authorize Strategic Handover
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
