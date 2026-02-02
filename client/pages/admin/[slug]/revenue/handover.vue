<script setup>
definePageMeta({ layout: "admin" });
const stockCheck = ref([
  { id: 1, name: "Hamer Magazines", count: 45, verified: true },
  { id: 2, name: "Spiritual Books", count: 12, verified: false },
]);
</script>
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Revenue Handover
      </h1>
      <span
        class="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase"
        >Final Audit Phase</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. Inventory Verification -->
      <BaseCard title="Physical Stock Accountability">
        <div class="space-y-4">
          <div
            v-for="item in stockCheck"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <Icon name="lucide:box" class="text-slate-400" />
              <div>
                <p class="text-sm font-bold text-slate-700">{{ item.name }}</p>
                <p class="text-[10px] text-slate-500">
                  System Count: {{ item.count }}
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

      <!-- 2. Final Fund Transfer (Ref #7 Compliance) -->
      <div class="space-y-6">
        <BaseCard class="bg-maedot-navy text-white">
          <h3 class="text-maedot-gold font-black uppercase text-xs mb-4">
            Unreconciled Revenue
          </h3>
          <div class="text-center py-6">
            <p class="text-3xl font-black">5,200 ETB</p>
            <p
              class="text-[10px] text-slate-400 uppercase tracking-widest mt-2"
            >
              Held in Local Petty Cash
            </p>
          </div>
          <p class="text-[11px] text-slate-400 mb-6 italic text-center">
            "You must transfer all remaining cash to the Finance Department and
            get Audit approval before the handover is finalized."
          </p>
          <BaseButton block variant="primary" icon="lucide:check-square"
            >Authorize Final Transfer</BaseButton
          >
        </BaseCard>
      </div>
    </div>
  </div>
</template>
