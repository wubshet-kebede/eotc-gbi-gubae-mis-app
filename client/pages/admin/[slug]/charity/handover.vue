<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Professional Handover
      </h1>
      <span
        class="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase"
        >Library Audit Phase</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 1. PHYSICAL BOOK AUDIT (Ref #10 ILS) -->
      <BaseCard title="Library Cabinet Audit">
        <div class="space-y-4">
          <div
            v-for="shelf in shelfCheck"
            :key="shelf.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <Icon name="lucide:library" class="text-slate-400" />
              <div>
                <p class="text-sm font-bold text-slate-700">{{ shelf.name }}</p>
                <p class="text-[10px] text-slate-500">
                  Target: {{ shelf.count }} Books
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              v-model="shelf.verified"
              class="rounded text-maedot-gold"
            />
          </div>
        </div>
      </BaseCard>

      <!-- 2. VOLUNTEER NETWORK TRANSFER (Ref #10) -->
      <div class="space-y-6">
        <BaseCard class="bg-maedot-navy text-white">
          <h3 class="text-maedot-gold font-black uppercase text-xs mb-4">
            Professional Talent Transfer
          </h3>
          <p class="text-[11px] text-slate-400 leading-relaxed mb-6">
            "I hereby transfer control of the **Library Catalog (1,240 items)**
            and the **Volunteer Professional Directory (156 members)** to the
            incoming coordinator."
          </p>
          <div class="space-y-2 mb-6 border-t border-white/10 pt-4">
            <div
              class="flex justify-between text-[10px] uppercase font-black text-maedot-gold"
            >
              <span>Missing/Lost Books</span>
              <span class="text-white">03</span>
            </div>
          </div>
          <BaseButton
            block
            variant="primary"
            icon="lucide:key-round"
            :disabled="!allVerified"
          >
            Finalize Professional Handover
          </BaseButton>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
const allVerified = ref(false);
const shelfCheck = ref([
  { id: 1, name: "Cabinet A: Dogma/Theology", count: 450, verified: true },
  { id: 2, name: "Cabinet B: Church History", count: 320, verified: true },
  { id: 3, name: "Cabinet C: Ge'ez & Zema", count: 470, verified: false },
]);
</script>
