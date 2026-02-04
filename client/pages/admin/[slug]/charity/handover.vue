<script setup>
definePageMeta({ layout: "admin" });

// Logic: Library Check from your code
const shelfCheck = ref([
  { id: 1, name: "Cabinet A: Dogma", count: 450, verified: true },
  { id: 2, name: "Cabinet B: History", count: 320, verified: true },
  { id: 3, name: "Cabinet C: Ge'ez", count: 470, verified: false },
]);

// TASK: Transferring unfinished mercy cases (Ref #10)
const ongoingMercyCases = ref([
  {
    id: 1,
    name: "Abebe K.",
    support: "Medical",
    balanceRemaining: "1,500 ETB",
  },
]);

// Requirement: Must verify all shelves AND accept open cases
const allVerified = computed(
  () =>
    shelfCheck.value.every((s) => s.verified) &&
    ongoingMercyCases.value.length > 0,
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
          Charity Handover
        </h1>
        <p
          class="text-xs text-slate-500 font-bold uppercase tracking-widest italic"
        >
          Asset & Beneficiary Succession Terminal
        </p>
      </div>
      <div class="px-4 py-2 bg-rose-50 border border-rose-100 rounded-2xl">
        <span class="text-[10px] font-black text-rose-600 uppercase"
          >Audit Phase: 75% Complete</span
        >
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. LIBRARY CABINET AUDIT (Your Logic) -->
      <div class="lg:col-span-7 space-y-6">
        <BaseCard title="Physical Library Reconciliation">
          <div class="space-y-4">
            <div
              v-for="shelf in shelfCheck"
              :key="shelf.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-maedot-gold transition-all"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm"
                >
                  <Icon name="lucide:book-open" class="text-maedot-gold" />
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-700 uppercase">
                    {{ shelf.name }}
                  </p>
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-tighter"
                  >
                    Total: {{ shelf.count }} Registered Items
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                v-model="shelf.verified"
                class="w-5 h-5 rounded border-slate-300 text-maedot-gold focus:ring-maedot-gold"
              />
            </div>
          </div>
        </BaseCard>

        <!-- 2. OPEN MERCY CASES (The Heart Transfer) -->
        <BaseCard
          title="Active Beneficiary Transfer"
          subtitle="Handing over ongoing support cases"
        >
          <div
            v-for="caseItem in ongoingMercyCases"
            :key="caseItem.id"
            class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center"
          >
            <div>
              <p class="text-xs font-black text-emerald-900 uppercase">
                {{ caseItem.name }}
              </p>
              <p class="text-[10px] text-emerald-600 font-bold uppercase">
                {{ caseItem.support }} Case • Balance:
                {{ caseItem.balanceRemaining }}
              </p>
            </div>
            <Icon name="lucide:heart" class="text-emerald-500 w-5 h-5" />
          </div>
        </BaseCard>
      </div>

      <!-- 3. FINAL SIGN-OFF (The Authority Transfer) -->
      <div class="lg:col-span-5">
        <div
          class="p-8 bg-maedot-navy rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <Icon
            name="lucide:key"
            class="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 text-maedot-gold"
          />

          <h3
            class="text-sm font-black text-maedot-gold uppercase tracking-widest"
          >
            Master Succession Statement
          </h3>
          <p class="text-xs text-slate-400 italic leading-relaxed">
            "I hereby certify that the <strong>1,240 Library Assets</strong> and
            <strong>156 Professional Contacts</strong> have been audited. Any
            discrepancies are noted in the 2017 E.C. Year-End Report."
          </p>

          <div class="pt-6 border-t border-white/10 space-y-4">
            <div
              class="flex justify-between text-[10px] uppercase font-black text-slate-500"
            >
              <span>Lost/Damaged Books</span>
              <span class="text-rose-400">03 (Flagged for Review)</span>
            </div>
            <BaseButton
              block
              variant="primary"
              icon="lucide:shield-check"
              :disabled="!allVerified"
            >
              Seal Professional Handover
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
