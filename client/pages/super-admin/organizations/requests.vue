<script setup>
definePageMeta({ layout: "super" });

const isReviewerOpen = ref(false);
const selectedRequest = ref(null);
const loading = ref(false);

const pendingRequests = ref([
  {
    id: 1,
    date: "Oct 30",
    name: "Wollo University Gbi",
    university: "Wollo University",
    city: "Dessie",
  },
  {
    id: 2,
    date: "Oct 31",
    name: "Debre Markos Gbi",
    university: "DMU",
    city: "Debre Markos",
  },
]);

const openReview = (data) => {
  selectedRequest.value = data;
  isReviewerOpen.value = true;
};

const handleApprove = ({ id, comment }) => {
  // LOGIC: Create Chairperson account + Init 12 Depts
  isReviewerOpen.value = false;
  alert(`Organization approved with comment: ${comment}`);
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
        >
          Verification Queue
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Verify University Credentials & Provision Tenants
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-slate-400"
          >Total Pending: {{ pendingRequests.length }}</span
        >
        <BaseButton variant="secondary" size="sm" icon="lucide:history"
          >Archives</BaseButton
        >
      </div>
    </div>

    <!-- Requests Table -->
    <BaseCard :padding="false">
      <BaseDataTable :data="pendingRequests" :loading="loading">
        <Column field="date" header="Date" />
        <Column
          field="name"
          header="Organization"
          class="font-bold text-slate-900"
        />
        <Column field="university" header="University" />
        <Column header="Verification">
          <template #body="{ data }">
            <BaseButton
              variant="secondary"
              size="sm"
              icon="lucide:shield-search"
              @click="openReview(data)"
            >
              Review Application
            </BaseButton>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>

    <!-- THE REUSABLE REVIEW TERMINAL -->
    <SuperRequestReviewDrawer
      :is-open="isReviewerOpen"
      :request="selectedRequest"
      @close="isReviewerOpen = false"
      @approve="handleApprove"
    />
  </div>
</template>
