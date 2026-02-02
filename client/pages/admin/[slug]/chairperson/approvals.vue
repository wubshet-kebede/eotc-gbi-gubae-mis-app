<script setup>
definePageMeta({ layout: "admin" });

const loading = ref(false);
const showSignModal = ref(false);
const pin = ref("");
const activeRequest = ref(null);

const queueData = ref([
  {
    id: 1,
    type: "FINANCE",
    description: "Abinet Teacher Monthly Salary",
    amount: "12,500",
    planningVerified: true,
  },
  {
    id: 2,
    type: "ARTS",
    description: "Mezmur Uniform Procurement",
    amount: "8,000",
    planningVerified: true,
  },
  {
    id: 3,
    type: "CHARITY",
    description: "Monthly Orphanage Donation",
    amount: "3,000",
    planningVerified: false,
  },
]);

const triggerSignature = (data) => {
  activeRequest.value = data;
  showSignModal.value = true;
};

const confirmSignature = () => {
  // PIN Verification Logic here
  showSignModal.value = false;
  pin.value = "";
  alert(
    `Document "${activeRequest.value.description}" has been Digitally Signed.`,
  );
};
</script>
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Authorization Pipeline
      </h1>
      <p class="text-sm text-slate-500 font-medium italic">
        "Every signature is a commitment to the Gubae's resources."
      </p>
    </div>

    <!-- Stats for context -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Awaiting Signature"
        value="12"
        icon="lucide:pen-tool"
      />
      <BaseStatCard
        title="Approved Today"
        value="5"
        icon="lucide:check-circle"
      />
      <BaseStatCard
        title="Rejected/Flagged"
        value="1"
        icon="lucide:x-circle"
        :trend-up="false"
      />
    </div>

    <!-- The Master Approval Table -->
    <BaseDataTable title="Approval Queue" :data="queueData" :loading="loading">
      <Column field="type" header="Category">
        <template #body="{ data }">
          <span class="font-bold text-xs">{{ data.type }}</span>
        </template>
      </Column>
      <Column field="description" header="Request Details" />
      <Column field="amount" header="Total Value">
        <template #body="{ data }">
          <span class="font-black text-maedot-navy">{{ data.amount }} ETB</span>
        </template>
      </Column>
      <Column header="Verification">
        <template #body="{ data }">
          <!-- Checks if Planning Dept approved it first (Ref #11) -->
          <div
            v-if="data.planningVerified"
            class="flex items-center gap-1 text-emerald-600 text-[10px] font-bold"
          >
            <Icon name="lucide:shield-check" /> Verified by Planning
          </div>
        </template>
      </Column>
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-2">
            <BaseButton size="sm" variant="secondary" @click="viewDetails(data)"
              >View</BaseButton
            >
            <BaseButton
              size="sm"
              variant="primary"
              @click="triggerSignature(data)"
              >Sign</BaseButton
            >
          </div>
        </template>
      </Column>
    </BaseDataTable>

    <!-- Digital Signature Modal (The PIN logic) -->
    <BaseCard
      v-if="showSignModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-maedot-navy/50 backdrop-blur-sm"
    >
      <div
        class="bg-white p-8 rounded-3xl max-w-sm w-full shadow-2xl border-t-8 border-maedot-gold space-y-6"
      >
        <div class="text-center">
          <Icon
            name="lucide:lock"
            class="w-12 h-12 text-maedot-gold mx-auto mb-2"
          />
          <h3 class="text-lg font-black text-maedot-navy">
            Authorize Transaction
          </h3>
          <p class="text-xs text-slate-500">
            Please enter your Secure PIN to digitally sign.
          </p>
        </div>

        <BaseInput
          v-model="pin"
          type="password"
          placeholder="••••"
          class="text-center text-2xl tracking-[1em]"
        />

        <div class="flex gap-3">
          <BaseButton variant="ghost" block @click="showSignModal = false"
            >Cancel</BaseButton
          >
          <BaseButton variant="primary" block @click="confirmSignature"
            >Confirm Signature</BaseButton
          >
        </div>
      </div>
    </BaseCard>
  </div>
</template>
