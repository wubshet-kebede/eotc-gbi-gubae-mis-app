<script setup>
/**
 * MASTER DIRECTORY & APPROVAL GATEWAY (Ref #3)
 * Logic: Reviewing Public Registrations & Authorizing Guba Membership
 */
definePageMeta({ layout: "admin" });

const viewMode = ref("DIRECTORY"); // Switch between 'DIRECTORY' and 'PENDING_REQUESTS'
const isReviewOpen = ref(false);
const selectedRequest = ref(null);

const pendingRequests = ref([
  {
    id: 901,
    name: "Tewodros M.",
    uniId: "UoG/992/17",
    college: "Technology",
    batch: "2017 E.C",
    submittedAt: "1 hour ago",
  },
]);

const members = ref([
  {
    name: "Abebe Kebede",
    id: "UoG/123/14",
    dept: "Finance",
    batch: "2014 E.C",
    status: "Active",
  },
]);

const approveMember = (request) => {
  // Logic: 1. Move from 'pending_requests' to 'users' table | 2. Send Welcome SMS
  alert(
    `Authorization Successful: ${request.name} is now an official member of the Guba.`,
  );
  isReviewOpen.value = false;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header with Toggle -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Membership Gateway
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none"
        >
          {{
            viewMode === "DIRECTORY"
              ? "Official Registry"
              : "Reviewing Public Submissions"
          }}
        </p>
      </div>
      <div class="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
        <button
          @click="viewMode = 'DIRECTORY'"
          :class="
            viewMode === 'DIRECTORY'
              ? 'bg-white shadow-sm text-maedot-navy'
              : 'text-slate-500'
          "
          class="px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
        >
          Directory
        </button>
        <button
          @click="viewMode = 'PENDING'"
          :class="
            viewMode === 'PENDING'
              ? 'bg-rose-500 shadow-sm text-white'
              : 'text-slate-500'
          "
          class="px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all relative"
        >
          Requests
          <span
            v-if="pendingRequests.length > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full flex items-center justify-center text-[8px] border-2 border-white"
          >
            {{ pendingRequests.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- VIEW 1: THE MASTER DIRECTORY -->
    <div v-if="viewMode === 'DIRECTORY'" class="space-y-6">
      <!-- ... Keep your search/filter/table here ... -->
      <BaseDataTable title="Validated Members" :data="members">
        <Column field="name" header="Full Name" />
        <Column field="batch" header="Batch" />
        <Column field="status" header="Status" />
      </BaseDataTable>
    </div>

    <!-- VIEW 2: THE PENDING QUEUE (The New Feature) -->
    <div v-else class="space-y-6">
      <BaseCard
        :padding="false"
        title="Pending Public Submissions"
        subtitle="Review and verify student identities"
      >
        <BaseDataTable :data="pendingRequests">
          <Column field="name" header="Applicant" class="font-bold" />
          <Column field="uniId" header="Uni ID" />
          <Column field="submittedAt" header="Received" />
          <Column header="Action">
            <template #body="{ data }">
              <BaseButton
                variant="primary"
                size="sm"
                icon="lucide:shield-check"
                @click="
                  selectedRequest = data;
                  isReviewOpen = true;
                "
                >Review Request</BaseButton
              >
            </template>
          </Column>
        </BaseDataTable>
      </BaseCard>
    </div>

    <!-- REVIEW DRAWER -->
    <BaseGovernanceDrawer
      :is-open="isReviewOpen"
      title="Verify Membership Request"
      subtitle="Ensuring University ID & Batch Validity"
      @close="isReviewOpen = false"
    >
      <div v-if="selectedRequest" class="space-y-6">
        <div
          class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4"
        >
          <div class="flex justify-between border-b pb-2">
            <span class="text-[10px] font-black text-slate-400 uppercase"
              >Applicant</span
            >
            <span class="text-xs font-bold">{{ selectedRequest.name }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-[10px] font-black text-slate-400 uppercase"
              >University ID</span
            >
            <span class="text-xs font-bold text-maedot-gold">{{
              selectedRequest.uniId
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[10px] font-black text-slate-400 uppercase"
              >College</span
            >
            <span class="text-xs font-bold">{{ selectedRequest.college }}</span>
          </div>
        </div>

        <div class="pt-4 space-y-3">
          <BaseButton
            block
            variant="primary"
            icon="lucide:user-check"
            @click="approveMember(selectedRequest)"
            >Authorize Membership</BaseButton
          >
          <BaseButton
            block
            variant="ghost"
            class="text-rose-600 font-black text-[10px] uppercase"
            >Reject Request</BaseButton
          >
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
