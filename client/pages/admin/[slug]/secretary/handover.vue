<script setup>
/**
 * ADMINISTRATIVE SUCCESSION (Ref #3 & #12)
 * Logic: Data Integrity Sealing, Role-Based Authority Transfer, and Audit Clearance
 */
definePageMeta({ layout: "admin" });

const isProcessing = ref(false);
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
    done: true,
  }, // Changed to true for demo
  {
    id: 4,
    label: "Audit Clearance",
    description: "Verified by Dept 12",
    done: true,
  },
]);

const allDone = computed(() => handoverItems.value.every((item) => item.done));

const finalizeHandover = () => {
  isProcessing.value = true;
  // Logic: 1. Archive the 2018 E.C. Dataset | 2. Reset Role for Yared | 3. Generate Official Succession PDF
  setTimeout(() => {
    isProcessing.value = false;
    alert(
      "ርክክብ (Handover) Successful. Administrative authority has been transferred to Yared Teshome.",
    );
  }, 2000);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header with Dynamic Audit Badge -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Secretary Succession
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none"
        >
          Institutional Custody Transfer
        </p>
      </div>
      <div
        :class="
          allDone
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-rose-100 text-rose-600'
        "
        class="px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-sm animate-pulse"
      >
        {{ allDone ? "Audit Cleared" : "Audit Pending" }}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 1. THE AUDIT LOG -->
      <div class="lg:col-span-2 space-y-6">
        <BaseCard
          title="Administrative Transfer Checklist"
          subtitle="Verified closure of 2018 E.C. records"
        >
          <div class="space-y-4">
            <div
              v-for="item in handoverItems"
              :key="item.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-maedot-gold"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="
                    item.done
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-100'
                      : 'bg-slate-200'
                  "
                  class="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                >
                  <Icon
                    :name="item.done ? 'lucide:check' : 'lucide:lock-keyhole'"
                    class="w-4 h-4 text-white"
                  />
                </div>
                <div>
                  <p class="text-xs font-bold text-maedot-navy">
                    {{ item.label }}
                  </p>
                  <p
                    class="text-[9px] text-slate-400 font-black uppercase tracking-widest"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <span
                v-if="item.done"
                class="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic"
                >Sealed</span
              >
              <BaseButton
                v-else
                variant="secondary"
                size="sm"
                class="text-[9px] font-black uppercase tracking-tighter"
                >Seal Task</BaseButton
              >
            </div>
          </div>
        </BaseCard>

        <!-- 2. THE LEGAL OATH -->
        <div
          class="p-8 bg-maedot-navy rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <Icon
            name="lucide:feather"
            class="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 text-maedot-gold rotate-12"
          />
          <p class="text-xs italic text-slate-300 leading-relaxed">
            "I hereby certify that all official records for 2018 E.C. have been
            verified and archived. I transfer the **Global Registry** and
            **Protocol Keys** to the successor."
          </p>
          <BaseButton
            block
            variant="primary"
            size="lg"
            icon="lucide:key-round"
            :disabled="!allDone"
            :loading="isProcessing"
            @click="finalizeHandover"
          >
            Finalize ርክክብ (Succession)
          </BaseButton>
        </div>
      </div>

      <!-- 3. SUCCESSOR CARD -->
      <div class="space-y-6">
        <BaseCard title="Incoming Custodian">
          <div class="text-center space-y-6 py-4">
            <div class="relative inline-block">
              <div
                class="w-24 h-24 bg-maedot-gold rounded-[2.5rem] flex items-center justify-center text-maedot-navy text-3xl font-black shadow-2xl"
              >
                YT
              </div>
              <div
                class="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Icon
                  name="lucide:shield-check"
                  class="text-emerald-500 w-6 h-6"
                />
              </div>
            </div>
            <div>
              <h4
                class="font-black text-maedot-navy uppercase tracking-tighter"
              >
                Yared Teshome
              </h4>
              <p
                class="text-xs text-slate-400 font-bold uppercase tracking-widest"
              >
                Successor ID: UoG/889/15
              </p>
            </div>
            <div class="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p
                class="text-[10px] text-slate-400 font-black uppercase tracking-widest"
              >
                Authority Status
              </p>
              <p class="text-[10px] font-black text-amber-600 uppercase italic">
                Awaiting Final Key
              </p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
