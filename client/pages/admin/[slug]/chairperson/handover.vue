<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Leadership Succession
      </h1>
      <BaseButton
        variant="danger"
        icon="lucide:user-minus"
        @click="confirmResignation"
        >Finalize Graduation Handover</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 1. The Successor (The "Promotion" Logic) -->
      <BaseCard title="Incoming Successor">
        <div
          class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
        >
          <div
            class="w-12 h-12 rounded-full bg-maedot-gold flex items-center justify-center font-black"
          >
            {{ viceChairInitials }}
          </div>
          <div>
            <p class="text-sm font-bold text-maedot-navy">
              {{ viceChairName }}
            </p>
            <p class="text-[10px] text-slate-500 font-black uppercase">
              Current Vice-Chairperson
            </p>
          </div>
          <div class="ml-auto">
            <span
              class="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-1 rounded font-bold uppercase tracking-tighter"
              >Verified for Promotion</span
            >
          </div>
        </div>
        <p class="mt-4 text-xs text-slate-500 leading-relaxed italic">
          "Upon finalization, this user will inherit all Signature Rights and
          Administrative Control for {{ $route.params.slug }}."
        </p>
      </BaseCard>

      <!-- 2. Final Checklist (Ref #12 Audit Requirement) -->
      <BaseCard title="Handover Integrity Checklist">
        <div class="space-y-3">
          <div
            v-for="check in checklist"
            :key="check.id"
            class="flex items-center justify-between p-2"
          >
            <span class="text-xs font-medium text-slate-600">{{
              check.label
            }}</span>
            <Icon
              v-if="check.done"
              name="lucide:check-circle"
              class="text-emerald-500 w-5 h-5"
            />
            <Icon
              v-else
              name="lucide:circle-dashed"
              class="text-slate-300 w-5 h-5"
            />
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const viceChairName = ref("Dn. Melaku Teshome");
const viceChairInitials = ref("MT");

const checklist = ref([
  { id: 1, label: "All Financial Transactions Signed", done: true },
  { id: 2, label: "Senate Minutes Finalized & Locked", done: true },
  { id: 3, label: "Audit Compliance Cleared", done: false }, // Blocked until Dept 12 clears it
  { id: 4, label: "Asset Property Handover Verified", done: true },
]);
</script>
