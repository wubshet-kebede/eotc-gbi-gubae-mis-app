<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1 class="text-2xl font-black text-slate-900 uppercase">
          Onboarding Requests
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Verify University Recommendation Letters
        </p>
      </div>
      <BaseButton variant="secondary" icon="lucide:history"
        >Request History</BaseButton
      >
    </div>

    <!-- Requests Table -->
    <BaseCard :padding="false">
      <BaseDataTable :data="pendingRequests" :loading="loading">
        <Column field="date" header="Date Requested" />
        <Column
          field="name"
          header="Gbi Gubae Name"
          class="font-bold text-slate-900"
        />
        <Column field="university" header="University" />
        <Column field="city" header="City" />
        <Column header="Official Document">
          <template #body="{ data }">
            <BaseButton
              variant="ghost"
              size="sm"
              icon="lucide:file-text"
              class="text-maedot-gold font-bold underline"
            >
              View Letter
            </BaseButton>
          </template>
        </Column>
        <Column header="Final Action">
          <template #body="{ data }">
            <div class="flex gap-2">
              <BaseButton size="sm" variant="primary" @click="approveGuba(data)"
                >Approve</BaseButton
              >
              <BaseButton
                size="sm"
                variant="ghost"
                class="text-rose-600"
                @click="rejectGuba(data)"
                >Reject</BaseButton
              >
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: "super" });

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

const approveGuba = (data) => {
  const confirm = window.confirm(
    `Approve ${data.name} and initialize 12-department database?`,
  );
  if (confirm) {
    alert(
      `${data.name} is now ACTIVE. Admin credentials sent to their Chairperson.`,
    );
    // Logic: Trigger Hasura mutation to change status to 'ACTIVE' and create departments
  }
};
</script>
