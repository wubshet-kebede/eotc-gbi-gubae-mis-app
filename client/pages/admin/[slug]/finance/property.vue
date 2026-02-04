<script setup>
definePageMeta({ layout: "admin" });

const assets = ref([
  {
    id: 1,
    name: "Yamaha Sound Mixer",
    category: "Electronics",
    condition: "Excellent",
    assignedTo: "Hymn Dept",
    value: 15000, // NEW: The cost
    voucherId: "TX-9904", // NEW: Linked to Ledger
    lastInspected: "Jan 12", // NEW: Accountability date
  },
  {
    id: 2,
    name: "Plastic Chairs (x50)",
    category: "Furniture",
    condition: "Good",
    assignedTo: "Logistics",
    value: 5000,
    voucherId: "TX-9821",
    lastInspected: "Feb 05",
  },
  {
    id: 3,
    name: "Traditional Krar",
    category: "Instruments",
    condition: "Needs Repair",
    assignedTo: "Hymn Dept",
    value: 3000,
    voucherId: "TX-9765",
    lastInspected: "Dec 20",
  },
]);
const isAddAssetOpen = ref(false);
const isAuditOpen = ref(false);
const newAsset = reactive({
  name: "",
  value: 0,
  voucher: "",
  dept: "Logistics",
});

const requestRepair = (item) => {
  // Logic: Automatically sends a budget request to the Chairperson
  alert(
    `Repair request for ${item.name} initiated. Sent to Chairperson for budget approval.`,
  );
};

const handleSaveAsset = () => {
  // Logic: 1. Save to 'public.assets' | 2. Notify Auditor
  isAddAssetOpen.value = false;
};
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Asset Registry
        </h1>
        <p
          class="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none"
        >
          Physical Property & Capital Management (Ref #8)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus-circle"
        @click="isAddAssetOpen = true"
      >
        Register New Asset
      </BaseButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Total Inventory Value"
        value="120,400 ETB"
        icon="lucide:gem"
        class="border-b-4 border-maedot-gold"
      />
      <BaseStatCard title="Items in Custody" value="156" icon="lucide:box" />
      <BaseStatCard
        title="Repair Required"
        value="03"
        icon="lucide:wrench"
        :trend-up="false"
        class="text-rose-600"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. THE INVENTORY TABLE -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <BaseDataTable :data="assets">
            <Column
              field="name"
              header="Item Name"
              class="font-black text-maedot-navy text-xs"
            />
            <Column field="value" header="Value (ETB)">
              <template #body="{ data }">
                <span class="font-bold text-slate-600">{{
                  data.value?.toLocaleString()
                }}</span>
              </template>
            </Column>
            <Column field="condition" header="Status">
              <template #body="{ data }">
                <span
                  :class="
                    data.condition === 'Excellent'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-rose-100 text-rose-600'
                  "
                  class="px-2 py-0.5 rounded text-[9px] font-black uppercase"
                >
                  {{ data.condition }}
                </span>
              </template>
            </Column>
            <Column field="assignedTo" header="Custodian" />
            <Column header="Actions">
              <template #body="{ data }">
                <div class="flex gap-2">
                  <BaseButton
                    v-if="data.condition !== 'Excellent'"
                    variant="ghost"
                    size="sm"
                    icon="lucide:wrench"
                    @click="requestRepair(data)"
                  />
                  <BaseButton
                    variant="ghost"
                    size="sm"
                    icon="lucide:info"
                    @click="viewDetails(data)"
                  />
                </div>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. PRO TASKS SIDEBAR -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions />

        <BaseCard
          title="Asset Handover Prep"
          class="bg-slate-900 text-white border-none"
        >
          <p class="text-[11px] text-slate-400 italic mb-4">
            "Verify physical existence of all 156 items before leadership
            transition."
          </p>
          <BaseButton
            variant="secondary"
            block
            size="sm"
            icon="lucide:file-check"
            @click="isAuditOpen = true"
            >Run Property Audit</BaseButton
          >
        </BaseCard>
      </div>
    </div>

    <!-- 3. ADD ASSET DRAWER (The Logic Bridge) -->
    <BaseGovernanceDrawer
      :is-open="isAddAssetOpen"
      title="New Property Entry"
      subtitle="Linking Physical Assets to Finance Ledger"
      action-label="Authorize Asset Entry"
      @close="isAddAssetOpen = false"
      @confirm="handleSaveAsset"
    >
      <div class="space-y-4">
        <BaseInput
          v-model="newAsset.name"
          label="Asset Name"
          icon="lucide:box"
        />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="newAsset.value"
            label="Cost (ETB)"
            type="number"
          />
          <BaseInput v-model="newAsset.voucher" label="Ledger Voucher #" />
        </div>
        <div class="p-4 bg-slate-50 rounded-2xl">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Assigned Department</label
          >
          <select
            v-model="newAsset.dept"
            class="w-full bg-transparent text-sm font-bold outline-none"
          >
            <option>Hymn & Arts</option>
            <option>Logistics</option>
            <option>Education</option>
          </select>
        </div>
        <div
          class="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center bg-slate-50"
        >
          <Icon name="lucide:camera" class="w-8 h-8 text-slate-300" />
          <p class="text-[9px] font-black text-slate-400 uppercase mt-2">
            Upload Asset Photo
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isAuditOpen"
      title="Property Audit Session"
      subtitle="Physical Verification of Guba Assets"
      action-label="Seal Audit Report"
      @close="isAuditOpen = false"
    >
      <div class="space-y-6">
        <div class="p-4 bg-maedot-navy rounded-2xl text-white text-center">
          <p class="text-[10px] font-black uppercase text-maedot-gold">
            Audit Progress
          </p>
          <p class="text-xl font-black">42 / 156 Items Verified</p>
        </div>

        <!-- The Checklist -->
        <div class="space-y-3 max-h-96 overflow-y-auto pr-2">
          <div
            v-for="asset in assets"
            :key="asset.id"
            class="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div>
              <p class="text-xs font-bold text-maedot-navy uppercase">
                {{ asset.name }}
              </p>
              <p class="text-[9px] text-slate-400 font-black uppercase">
                Loc: {{ asset.assignedTo }}
              </p>
            </div>
            <div class="flex gap-2">
              <button class="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Icon name="lucide:check" />
              </button>
              <button class="p-2 bg-rose-100 text-rose-600 rounded-lg">
                <Icon name="lucide:x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
