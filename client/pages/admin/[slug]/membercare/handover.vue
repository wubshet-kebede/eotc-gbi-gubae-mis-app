<script setup>
definePageMeta({ layout: "admin" });

const allCleared = ref(false);

const checklist = ref([
  { id: 1, label: "Mentorship Map Finalized", done: true },
  { id: 2, label: "All Cases Updated to Recent", done: true },
  { id: 3, label: "Audit Compliance Signed", done: false }, // Blocked by Dept 12
  { id: 4, label: "Successor ID Verified", done: true },
]);

const sensitiveCases = ref([
  { studentInitials: "A.K.", category: "Spiritual", urgency: "High" },
  { studentInitials: "S.T.", category: "Academic", urgency: "Medium" },
  { studentInitials: "D.Z.", category: "Financial", urgency: "Low" },
]);
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center border-b pb-4">
      <div>
        <h1 class="text-2xl font-black text-maedot-navy uppercase">
          Member Care Handover
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic"
        >
          "Transferring the trust of the Guba's children."
        </p>
      </div>
      <div
        class="px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-tighter animate-pulse"
      >
        Confidential Data Transfer
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. Lifecycle & Case Summary (Ref #5) -->
      <div class="lg:col-span-8 space-y-6">
        <BaseCard title="Case Transfer Summary">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-[10px] font-black text-slate-400 uppercase">
                Active Cases
              </p>
              <p class="text-xl font-black text-maedot-navy">12</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-[10px] font-black text-slate-400 uppercase">
                Resolved (2018)
              </p>
              <p class="text-xl font-black text-maedot-navy">142</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-[10px] font-black text-slate-400 uppercase">
                Mentorships
              </p>
              <p class="text-xl font-black text-maedot-navy">1,120</p>
            </div>
          </div>

          <!-- The List (Sensitive data is blurred/masked until authorized) -->
          <BaseDataTable
            title="Sensitive Support Pipeline"
            :data="sensitiveCases"
          >
            <Column field="studentInitials" header="Initials" />
            <Column field="category" header="Category" />
            <Column field="urgency" header="Urgency" />
            <Column header="Privacy">
              <template #body>
                <span class="text-[9px] font-bold text-slate-400 italic"
                  >🔐 Encrypted for Successor</span
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>

        <!-- Graduation List Verification (Ref #5 Lifecycle Management) -->
        <BaseCard class="border-t-4 border-maedot-gold">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-maedot-navy">
                Graduation Magazine List
              </h4>
              <p class="text-xs text-slate-500">
                Ensure all graduating members are verified for the yearbook.
              </p>
            </div>
            <BaseButton variant="secondary" size="sm" icon="lucide:check-square"
              >Verify List</BaseButton
            >
          </div>
        </BaseCard>
      </div>

      <!-- 2. Succession Control (Ref #12 Audit) -->
      <div class="lg:col-span-4 space-y-6">
        <BaseCard title="Handover Controls">
          <div class="space-y-4">
            <div
              v-for="item in checklist"
              :key="item.id"
              class="flex items-center gap-3"
            >
              <Icon
                :name="item.done ? 'lucide:check-circle' : 'lucide:circle'"
                :class="item.done ? 'text-emerald-500' : 'text-slate-300'"
              />
              <span class="text-xs font-medium text-slate-700">{{
                item.label
              }}</span>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="bg-maedot-navy text-white">
          <h3 class="text-xs font-black text-maedot-gold uppercase mb-3">
            Authorize Successor
          </h3>
          <p class="text-[11px] text-slate-400 mb-4 leading-relaxed">
            By clicking below, you grant full access to the Counseling Logs to
            the Incoming Leader.
          </p>
          <BaseButton
            block
            variant="primary"
            icon="lucide:key-round"
            :disabled="!allCleared"
          >
            Execute Handover
          </BaseButton>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
