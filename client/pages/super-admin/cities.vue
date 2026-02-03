<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div class="space-y-1">
        <h1 class="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Geographic Grid
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Managing the diocesan reach of Ma'edot
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:map-pin-plus"
        @click="isDrawerOpen = true"
        >New City</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. CITIES TABLE -->
      <div class="lg:col-span-8">
        <BaseCard :padding="false">
          <BaseDataTable :data="cities">
            <Column
              field="name"
              header="City"
              class="font-black text-slate-800"
            />
            <Column field="diocese" header="Hagere Sibket" />
            <Column
              field="gubaeCount"
              header="Active Gubaes"
              class="font-bold text-maedot-gold text-center"
            />
            <Column header="Visibility">
              <template #body="{ data }">
                <span
                  class="px-2 py-1 rounded text-[9px] font-black uppercase"
                  :class="
                    data.isPublic
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-slate-100 text-slate-400'
                  "
                >
                  {{ data.isPublic ? "Visible" : "Hidden" }}
                </span>
              </template>
            </Column>
            <Column header="Actions">
              <template #body="{ data }">
                <button
                  @click="toggleCity(data)"
                  class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Icon
                    :name="data.isPublic ? 'lucide:eye-off' : 'lucide:eye'"
                    class="w-4 h-4"
                  />
                </button>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. REGIONAL COVERAGE (REUSED COMPONENT) -->
      <div class="lg:col-span-4">
        <BaseCard
          class="bg-slate-900 text-white border-none relative overflow-hidden"
        >
          <Icon
            name="lucide:globe"
            class="absolute -right-4 -bottom-4 w-24 h-24 text-maedot-gold opacity-10"
          />
          <h3
            class="text-[10px] font-black text-maedot-gold uppercase tracking-widest mb-4"
          >
            Regional Coverage
          </h3>
          <div class="space-y-4">
            <div
              v-for="stat in regionalStats"
              :key="stat.region"
              class="space-y-1.5"
            >
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">{{ stat.region }}</span>
                <span class="font-bold">{{ stat.count }} Gubaes</span>
              </div>
              <div class="w-full bg-white/10 h-1 rounded-full">
                <div
                  class="bg-maedot-gold h-full"
                  :style="{ width: (stat.count / 30) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- THE REUSABLE DRAWER -->
    <SuperCityFormDrawer
      :is-open="isDrawerOpen"
      @close="isDrawerOpen = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" });

const isDrawerOpen = ref(false);

const cities = ref([
  { name: "Gondar", diocese: "Central Gondar", gubaeCount: 12, isPublic: true },
  {
    name: "Addis Ababa",
    diocese: "Addis Ababa Diocese",
    gubaeCount: 24,
    isPublic: true,
  },
]);

const regionalStats = [
  { region: "Amhara", count: 22 },
  { region: "Addis Ababa", count: 24 },
  { region: "Oromia", count: 18 },
];

const handleSave = (form) => {
  console.log("Saving city to Hasura:", form);
  isDrawerOpen.value = false;
};
</script>
