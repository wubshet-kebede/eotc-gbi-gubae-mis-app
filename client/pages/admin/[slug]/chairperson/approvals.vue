<script setup>
import BaseInput from "~/components/base/BaseInput.vue";

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

const isReviewOpen = ref(false);

const handleReview = (data) => {
  activeRequest.value = data;
  isReviewOpen.value = true;
};

const handleSignTrigger = () => {
  isReviewOpen.value = false;
  showSignModal.value = true;
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

    <!-- The Master Table -->
    <BaseCard :padding="false" class="border-t-4 border-maedot-navy">
      <BaseDataTable :data="queueData">
        <Column field="type" header="Department" class="font-bold text-xs" />
        <Column field="description" header="Request Details" />
        <Column header="Verification">
          <template #body="{ data }">
            <span
              v-if="data.planningVerified"
              class="text-[9px] font-black text-emerald-600 uppercase flex items-center gap-1"
            >
              <Icon name="lucide:check-circle-2" /> Verified by Planning
            </span>
          </template>
        </Column>
        <Column header="Actions" class="text-right">
          <template #body="{ data }">
            <BaseButton
              variant="primary"
              size="sm"
              icon="lucide:eye"
              @click="handleReview(data)"
              >Review & Sign</BaseButton
            >
          </template>
        </Column>
        <!-- <Column header="Seal" class="text-right">
          <template #body="{ data }">
            <BaseButton
              variant="primary"
              size="sm"
              icon="lucide:eye"
              @click="handleSignTrigger(data)"
              >Seals</BaseButton
            >
          </template>
        </Column> -->
      </BaseDataTable>
    </BaseCard>
    <!-- 1. THE REVIEW DRAWER (Using our Base Component) -->
    <BaseGovernanceDrawer
      :is-open="isReviewOpen"
      :title="'Review: ' + activeRequest?.type"
      subtitle="Verify documentation before digital signature"
      action-label="Proceed to Signature"
      @close="isReviewOpen = false"
      @confirm="handleSignTrigger"
    >
      <div class="space-y-6">
        <div
          class="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center"
        >
          <Icon name="lucide:file-text" class="w-12 h-12 text-slate-300 mb-2" />
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Attached Receipt/Voucher
          </p>
          <BaseButton variant="ghost" size="sm" class="mt-4"
            >View Full Document</BaseButton
          >
        </div>

        <div class="space-y-4">
          <div class="flex justify-between border-b pb-2">
            <span class="text-[10px] font-black text-slate-400 uppercase"
              >Requester</span
            >
            <span class="text-xs font-bold text-maedot-navy">{{
              activeRequest?.requester
            }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-[10px] font-black text-slate-400 uppercase"
              >Total Value</span
            >
            <span class="text-lg font-black text-maedot-navy"
              >{{ activeRequest?.amount }} ETB</span
            >
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>
    <!-- 2. THE PIN MODAL (Final Seal) -->
    <BaseGovernanceModal
      :is-open="showSignModal"
      title="Enter Security PIN"
      description="Type your 4-digit master code to seal this transaction."
      @close="showSignModal = false"
      action-label="Apply Digital Seal"
    >
      <div class="flex justify-center py-4">
        <BaseInput
          v-model="pin"
          type="password"
          maxlength="4"
          class="w-48 h-16 text-center text-3xl font-black tracking-[0.5em] bg-slate-100 rounded-2xl border-2 border-maedot-gold outline-none"
        />
      </div>
    </BaseGovernanceModal>
  </div>
</template>
