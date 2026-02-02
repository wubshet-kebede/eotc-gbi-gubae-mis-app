<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1 class="text-2xl font-black text-slate-900 uppercase tracking-tight">
          City & Diocese Registry
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Managing the Geographic Grid of Ma'edot
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:map-pin-plus"
        @click="showAddCity = true"
        >Add New City</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. CITY MANAGEMENT TABLE -->
      <div class="lg:col-span-8">
        <BaseCard :padding="false" class="border-t-4 border-slate-900">
          <BaseDataTable title="Registered Cities" :data="cities">
            <Column
              field="name"
              header="City Name"
              class="font-black text-slate-800"
            />
            <Column field="diocese" header="Diocese (Hagere Sibket)" />
            <Column field="gubaeCount" header="Active Gubaes">
              <template #body="{ data }">
                <span class="font-bold text-maedot-navy">{{
                  data.gubaeCount
                }}</span>
              </template>
            </Column>
            <Column field="status" header="Public Status">
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
            <Column header="Action">
              <template #body>
                <div class="flex gap-2">
                  <button
                    class="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-maedot-navy transition-colors"
                  >
                    <Icon name="lucide:edit-2" class="w-4 h-4" />
                  </button>
                </div>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. QUICK ADD & REGIONAL STATS -->
      <div class="lg:col-span-4 space-y-6">
        <BaseCard title="Add New Territory" v-if="showAddCity">
          <div class="space-y-4">
            <BaseInput label="City Name" placeholder="e.g. Hawassa" />
            <BaseInput label="Diocese Name" placeholder="e.g. Sidama Diocese" />
            <div class="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="public"
                v-model="newCityPublic"
                class="rounded text-maedot-gold"
              />
              <label for="public" class="text-xs font-bold text-slate-600"
                >Make Public on Landing Page</label
              >
            </div>
            <div class="flex gap-2">
              <BaseButton variant="primary" block size="sm"
                >Save City</BaseButton
              >
              <BaseButton
                variant="ghost"
                block
                size="sm"
                @click="showAddCity = false"
                >Cancel</BaseButton
              >
            </div>
          </div>
        </BaseCard>

        <!-- Stats per Region -->
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
          <div class="space-y-3">
            <div
              v-for="stat in regionalStats"
              :key="stat.region"
              class="flex justify-between items-center text-xs"
            >
              <span class="text-slate-400">{{ stat.region }}</span>
              <span class="font-bold">{{ stat.count }} Gubaes</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" });

const showAddCity = ref(false);
const newCityPublic = ref(true);

const cities = ref([
  { name: "Gondar", diocese: "Central Gondar", gubaeCount: 12, isPublic: true },
  {
    name: "Addis Ababa",
    diocese: "Addis Ababa Diocese",
    gubaeCount: 24,
    isPublic: true,
  },
  {
    name: "Bahir Dar",
    diocese: "Gozjam Diocese",
    gubaeCount: 8,
    isPublic: true,
  },
  {
    name: "Mekelle",
    diocese: "Tigray Diocese",
    gubaeCount: 4,
    isPublic: false,
  },
]);

const regionalStats = [
  { region: "Amhara", count: 22 },
  { region: "Addis Ababa", count: 24 },
  { region: "Oromia", count: 18 },
];
</script>
