<script setup>
definePageMeta({ layout: "admin" });
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
    verified: false,
  },
  {
    id: 3,
    name: "Yamaha Mixer",
    condition: "Perfect",
    icon: "lucide:speaker",
    verified: true,
  },
]);
const allVerified = computed(() => instruments.value.every((i) => i.verified));
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Arts & Instrument Handover
      </h1>
      <span
        class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter"
        >Handover in Progress</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Instrument Condition Check (Ref #8 Property Link) -->
      <BaseCard title="Instrument & Sound System Audit">
        <div class="space-y-4">
          <div
            v-for="item in instruments"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div class="flex items-center gap-3">
              <Icon :name="item.icon" class="text-maedot-navy" />
              <div>
                <p class="text-sm font-bold text-slate-700">{{ item.name }}</p>
                <p class="text-[9px] font-black uppercase text-slate-400">
                  Condition: {{ item.condition }}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              v-model="item.verified"
              class="rounded text-maedot-gold"
            />
          </div>
        </div>
      </BaseCard>

      <!-- Digital Asset Transfer (Ref #6) -->
      <div class="space-y-6">
        <BaseCard title="Intellectual Property Transfer">
          <p class="text-xs text-slate-500 mb-4 leading-relaxed">
            By initiating this transfer, the **Hymn Library (342 files)** and
            **Approved Scripts** will be locked and assigned to the Successor.
          </p>
          <div class="space-y-2">
            <div
              class="flex justify-between text-[10px] font-black text-slate-400"
            >
              <span>Successor: Dn. Yared</span>
              <span>ID: UoG/881/15</span>
            </div>
            <BaseButton
              block
              variant="primary"
              icon="lucide:key-round"
              :disabled="!allVerified"
            >
              Confirm Final Handover
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
