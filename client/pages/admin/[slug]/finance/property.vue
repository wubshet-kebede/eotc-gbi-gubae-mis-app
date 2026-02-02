<script setup>
definePageMeta({ layout: "admin" });

const assets = ref([
  {
    id: 1,
    name: "Yamaha Sound Mixer",
    category: "Electronics",
    condition: "Excellent",
    assignedTo: "Hymn Dept",
  },
  {
    id: 2,
    name: "Plastic Chairs (x50)",
    category: "Furniture",
    condition: "Good",
    assignedTo: "Logistics",
  },
  {
    id: 3,
    name: "Traditional Krar",
    category: "Instruments",
    condition: "Needs Repair",
    assignedTo: "Hymn Dept",
  },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Asset & Property Registry
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Tracking Physical Church Property (Ref #8)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus"
        @click="showAddAsset = true"
        >Register New Asset</BaseButton
      >
    </div>

    <!-- Property Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Total Asset Value"
        value="120,400 ETB"
        icon="lucide:gem"
      />
      <BaseStatCard title="Total Items" value="156" icon="lucide:box" />
      <BaseStatCard
        title="Damaged/Missing"
        value="03"
        icon="lucide:alert-triangle"
        :trend-up="false"
        trend="Needs Repair"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. ASSET TABLE (Ref #8 Asset Registry) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Inventory List
            </h3>
            <div class="flex gap-2">
              <BaseInput
                placeholder="Search serial/name..."
                size="sm"
                icon="lucide:search"
                class="w-64"
              />
            </div>
          </div>

          <BaseDataTable :data="assets">
            <Column field="name" header="Item Name" class="font-bold" />
            <Column field="category" header="Category" />
            <Column field="condition" header="Condition">
              <template #body="{ data }">
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                  :class="
                    data.condition === 'Excellent'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-amber-100 text-amber-600'
                  "
                >
                  {{ data.condition }}
                </span>
              </template>
            </Column>
            <Column field="assignedTo" header="Current Custodian" />
            <Column header="Action">
              <template #body>
                <BaseButton
                  variant="ghost"
                  size="sm"
                  icon="lucide:edit-3"
                ></BaseButton>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. HANDOVER PREP (Ref #8 Handover Document) -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Property Actions"
          :actions="[
            {
              label: 'Generate Handover PDF',
              icon: 'lucide:file-text',
              command: () => {},
            },
            {
              label: 'Bulk Asset Tagging',
              icon: 'lucide:tag',
              command: () => {},
            },
            {
              label: 'Report Damage/Loss',
              icon: 'lucide:frown',
              command: () => {},
            },
          ]"
        />

        <BaseCard class="bg-maedot-navy text-white border-none">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="lucide:info" class="text-maedot-gold w-5 h-5" />
            <p class="text-[10px] font-black uppercase">Asset Verification</p>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            The **Audit Service (#12)** will verify this list against physical
            items before you can graduate.
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
