<script setup>
definePageMeta({ layout: "admin" });

const currentDept = "Secretary";
const allDone = ref(false);

const handoverItems = ref([
  {
    id: 1,
    label: "Senate Minutes Log",
    description: "All 12 sessions locked",
    done: true,
  },
  {
    id: 2,
    label: "Protocol Book",
    description: "All 45 letters archived",
    done: true,
  },
  {
    id: 3,
    label: "Member Directory",
    description: "2018 graduates marked",
    done: false,
  },
  {
    id: 4,
    label: "Audit Clearance",
    description: "Verified by Dept 12",
    done: false,
  },
]);
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-black text-maedot-navy uppercase">
          Departmental Handover
        </h1>
        <p class="text-sm text-slate-500 font-bold uppercase tracking-widest">
          Role: {{ currentDept }} Secretary
        </p>
      </div>
      <!-- Status Badge -->
      <div
        class="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-xs font-black uppercase tracking-tighter"
      >
        Status: Awaiting Audit Clearance
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 1. Master Handover Checklist (Ref #12 Compliance) -->
      <div class="lg:col-span-2 space-y-6">
        <BaseCard title="Administrative Transfer Checklist">
          <div class="space-y-4">
            <div
              v-for="item in handoverItems"
              :key="item.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div class="flex items-center gap-4">
                <Icon
                  :name="item.done ? 'lucide:check-circle' : 'lucide:circle'"
                  :class="item.done ? 'text-emerald-500' : 'text-slate-300'"
                  class="w-6 h-6"
                />
                <div>
                  <p class="text-sm font-bold text-maedot-navy">
                    {{ item.label }}
                  </p>
                  <p class="text-[10px] text-slate-500 uppercase">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <BaseButton v-if="!item.done" variant="secondary" size="sm"
                >Seal Records</BaseButton
              >
            </div>
          </div>
        </BaseCard>

        <!-- 2. Legal Affirmation -->
        <BaseCard class="bg-maedot-navy border-none text-white">
          <p class="text-xs italic opacity-80 mb-4">
            "I hereby certify that all official letters, senate minutes, and
            member directories have been updated and sealed for the 2018 E.C.
            fiscal year."
          </p>
          <BaseButton
            variant="primary"
            block
            icon="lucide:key-round"
            :disabled="!allDone"
          >
            Initiate Transfer to Successor
          </BaseButton>
        </BaseCard>
      </div>

      <!-- 3. Successor Info (The Recipient) -->
      <div class="space-y-6">
        <BaseCard title="Incoming Secretary">
          <div class="text-center space-y-4">
            <div
              class="w-20 h-20 bg-maedot-gold rounded-full mx-auto flex items-center justify-center text-maedot-navy text-2xl font-black shadow-xl"
            >
              YT
            </div>
            <div>
              <h4 class="font-black text-maedot-navy">Yared Teshome</h4>
              <p class="text-xs text-slate-500">ID: UoG/889/15</p>
            </div>
            <div
              class="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-400 font-bold uppercase"
            >
              Pending Acceptance
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
