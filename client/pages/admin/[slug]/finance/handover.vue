<script setup>
definePageMeta({ layout: "admin" });
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Finance & Property Handover
      </h1>
      <span
        class="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black uppercase"
        >Final Reconciliation</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. CASH & LEDGER SYNC (Ref #8) -->
      <BaseCard title="Final Liquidity Sync">
        <div class="space-y-6">
          <div class="flex justify-between p-4 bg-slate-50 rounded-2xl">
            <span class="text-sm font-bold text-slate-600"
              >System Balance:</span
            >
            <span class="text-lg font-black text-maedot-navy">329,500 ETB</span>
          </div>

          <div
            class="p-4 border-2 border-dashed border-slate-200 rounded-2xl space-y-3"
          >
            <p class="text-xs font-bold text-slate-500 text-center uppercase">
              Physical Cash Verification
            </p>
            <BaseInput
              label="Actual Cash in Hand"
              placeholder="Enter Amount"
              type="number"
            />
            <p class="text-[10px] text-center text-slate-400 italic">
              "The system will flag any discrepancy to the Audit Dept."
            </p>
          </div>
        </div>
      </BaseCard>

      <!-- 2. ASSET HANDOVER (Ref #8 Asset Registry) -->
      <div class="space-y-6">
        <BaseCard title="Asset Registry Handover">
          <div class="space-y-3 mb-6">
            <div
              v-for="item in 3"
              :key="item"
              class="flex justify-between items-center text-xs"
            >
              <span class="text-slate-600">Property Item #{{ item }}</span>
              <span class="text-emerald-600 font-bold uppercase">Verified</span>
            </div>
          </div>

          <div class="p-4 bg-maedot-navy text-white rounded-2xl">
            <p class="text-xs mb-4 opacity-80 italic">
              "By confirming, you transfer all financial and property liability
              to the Successor."
            </p>
            <BaseButton
              block
              variant="primary"
              icon="lucide:key-round"
              :disabled="true"
            >
              Execute Final Handover
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
