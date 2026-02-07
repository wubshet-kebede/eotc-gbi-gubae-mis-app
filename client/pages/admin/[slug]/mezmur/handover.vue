<script setup>
/**
 * ARTS & HYMN HANDOVER (Ref #6 & #8)
 * Logic: Property Verification & Creative IP Succession
 */
definePageMeta({ layout: "admin" });

const isProcessing = ref(false);
const instruments = ref([
  {
    id: 1,
    name: "Krar (Large)",
    condition: "Excellent",
    icon: "lucide:music",
    verified: true,
  },
  {
    id: 2,
    name: "Wireless Mics (x4)",
    condition: "Needs Battery",
    icon: "lucide:mic",
    verified: true,
  },
  {
    id: 3,
    name: "Yamaha Mixer",
    condition: "Perfect",
    icon: "lucide:speaker",
    verified: true,
  },
]);

const handoverStats = {
  hymns: 342,
  scripts: 14,
  successor: "Dn. Yared",
  successorId: "UoG/881/15",
};

const allVerified = computed(() => instruments.value.every((i) => i.verified));

const executeHandover = () => {
  isProcessing.value = true;
  // Logic:
  // 1. Generate "Property Handover Certificate" (PDF)
  // 2. Map current 'Arts Head' to 'Alumni' status
  // 3. Email Successor their new Master Keys
  setTimeout(() => {
    isProcessing.value = false;
    alert(
      "Handover Successful! All instruments and 342 hymns have been transferred to Dn. Yared.",
    );
  }, 2000);
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
          Creative Handover
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none"
        >
          Institutional Succession & Asset Transfer
        </p>
      </div>
      <div
        :class="
          allVerified
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-amber-100 text-amber-600'
        "
        class="px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-sm transition-all duration-500"
      >
        {{ allVerified ? "Inventory Verified" : "Audit in Progress" }}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. PHYSICAL ASSET AUDIT -->
      <div class="lg:col-span-7">
        <BaseCard
          title="Instrument & Sound System Audit"
          subtitle="Physical verification of Guba property"
        >
          <div class="space-y-4">
            <div
              v-for="item in instruments"
              :key="item.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-maedot-gold transition-all"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 bg-white rounded-xl shadow-sm">
                  <Icon :name="item.icon" class="text-maedot-navy w-5 h-5" />
                </div>
                <div>
                  <p
                    class="text-sm font-black text-slate-700 uppercase tracking-tight"
                  >
                    {{ item.name }}
                  </p>
                  <p
                    class="text-[9px] font-bold uppercase"
                    :class="
                      item.condition === 'Excellent'
                        ? 'text-emerald-500'
                        : 'text-amber-500'
                    "
                  >
                    Status: {{ item.condition }}
                  </p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="item.verified"
                  class="sr-only peer"
                />
                <div
                  class="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-maedot-gold after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"
                ></div>
              </label>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 2. SUCCESSION TERMINAL -->
      <div class="lg:col-span-5">
        <div
          class="p-8 bg-maedot-navy rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <Icon
            name="lucide:key"
            class="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 text-maedot-gold rotate-12"
          />

          <h3
            class="text-sm font-black text-maedot-gold uppercase tracking-widest"
          >
            Digital Succession
          </h3>
          <p class="text-[11px] text-slate-400 leading-relaxed italic">
            "I hereby transfer the
            <strong>{{ handoverStats.hymns }} hymns</strong> and
            <strong>{{ handoverStats.scripts }} approved scripts</strong>. All
            creative liability is now assigned to the successor."
          </p>

          <div class="pt-6 border-t border-white/10 space-y-3">
            <div
              class="flex justify-between items-center text-[10px] font-black uppercase text-slate-500"
            >
              <span>Successor Name</span>
              <span class="text-white">{{ handoverStats.successor }}</span>
            </div>
            <div
              class="flex justify-between items-center text-[10px] font-black uppercase text-slate-500"
            >
              <span>University ID</span>
              <span class="text-white">{{ handoverStats.successorId }}</span>
            </div>
          </div>

          <BaseButton
            block
            variant="primary"
            size="lg"
            icon="lucide:shield-check"
            :disabled="!allVerified"
            :loading="isProcessing"
            @click="executeHandover"
          >
            Finalize ርክክብ (Handover)
          </BaseButton>
        </div>
        <p class="mt-4 text-center text-[10px] text-slate-400 italic">
          Note: This action is permanent and will be logged by the [Audit
          Service (#12)](url_to_audit).
        </p>
      </div>
    </div>
  </div>
</template>
