<script setup>
/**
 * FINANCE & PROPERTY HANDOVER (Ref #8 & #12)
 * Task: The final transfer of liquidity and physical assets.
 */
definePageMeta({ layout: "admin" });

const physicalCash = ref(0);
const systemBalance = 329500;
const isAuditCleared = ref(false); // Task: Linked to Dept 12

// LOGIC: Discrepancy Calculation
const discrepancy = computed(() => physicalCash.value - systemBalance);

// LOGIC: Only allow handover if Audit is clear and Cash matches
const canHandover = computed(
  () => isAuditCleared.value && discrepancy.value === 0,
);
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
          Finance Handover
        </h1>
        <p
          class="text-xs text-slate-500 font-bold uppercase tracking-widest italic"
        >
          Succession & Asset Transfer Terminal
        </p>
      </div>
      <div
        :class="
          canHandover
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-rose-100 text-rose-600'
        "
        class="px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-sm"
      >
        {{ canHandover ? "Ready for Transfer" : "Awaiting Audit Clearance" }}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. CASH SYNC (Your Logic Refined) -->
      <BaseCard
        title="Liquidity Reconciliation"
        subtitle="Verification of physical box against digital ledger"
      >
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-[9px] font-black text-slate-400 uppercase">
                System Ledger
              </p>
              <p class="text-lg font-black text-maedot-navy">
                {{ systemBalance.toLocaleString() }} ETB
              </p>
            </div>
            <div
              class="p-4 rounded-2xl border"
              :class="
                discrepancy === 0
                  ? 'bg-emerald-50 border-emerald-100'
                  : 'bg-rose-50 border-rose-100'
              "
            >
              <p
                class="text-[9px] font-black uppercase"
                :class="
                  discrepancy === 0 ? 'text-emerald-600' : 'text-rose-600'
                "
              >
                Discrepancy
              </p>
              <p
                class="text-lg font-black"
                :class="
                  discrepancy === 0 ? 'text-emerald-700' : 'text-rose-700'
                "
              >
                {{ discrepancy.toLocaleString() }} ETB
              </p>
            </div>
          </div>

          <BaseInput
            v-model="physicalCash"
            label="Actual Cash in Hand (Counted)"
            placeholder="0.00"
            type="number"
            icon="lucide:banknote"
          />
        </div>
      </BaseCard>

      <!-- 2. LIABILITY TRANSFER -->
      <div class="space-y-6">
        <BaseCard
          title="Authority Succession"
          subtitle="Transferring master signatures and keys"
        >
          <div
            class="p-6 bg-maedot-navy rounded-[2rem] text-white space-y-6 relative overflow-hidden"
          >
            <Icon
              name="lucide:key"
              class="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 text-maedot-gold"
            />

            <div class="space-y-4">
              <div
                class="flex justify-between items-center text-[10px] uppercase font-black"
              >
                <span class="text-slate-400">Audit Service (#12) Status</span>
                <span
                  :class="isAuditCleared ? 'text-emerald-400' : 'text-rose-400'"
                  >{{ isAuditCleared ? "CLEARED" : "PENDING" }}</span
                >
              </div>
              <div
                class="flex justify-between items-center text-[10px] uppercase font-black"
              >
                <span class="text-slate-400">Total Assets to Transfer</span>
                <span class="text-white">156 Items Verified</span>
              </div>
            </div>

            <BaseButton
              block
              variant="primary"
              icon="lucide:shield-check"
              :disabled="!canHandover"
            >
              Execute Final Handover
            </BaseButton>
          </div>
          <p class="text-[10px] text-slate-400 italic text-center px-4">
            "Executing this will officially close the 2017 E.C. Fiscal Year and
            notify the [Super-Admin](url_to_super_admin)."
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
