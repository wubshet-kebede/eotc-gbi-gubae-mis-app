<script setup>
definePageMeta({ layout: "admin" });

// Industry Logic: Tracks meetings with Ma'ekel and Partners
const externalLogs = ref([
  {
    id: 1,
    entity: "Ma'ekel (Center)",
    subject: "Budget Revision for 2018",
    date: "Oct 29",
    outcome: "Pending Approval",
  },
  {
    id: 2,
    entity: "University Admin",
    subject: "Hall Reservation for Graduation",
    date: "Oct 25",
    outcome: "Successful",
  },
]);

// Ref #2: Tasks "Pushed" from the Chairperson to the Vice-Chair
const delegatedTasks = ref([
  { id: 1, title: "Verify Audit Discrepancies in Dept 7", due: "In 2 Days" },
  { id: 2, title: "Draft Response Letter to Ma'ekel", due: "Today" },
]);
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          External Relations & CRM
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Managing the link between {{ $route.params.slug }} and the Center
          (Ma'ekel).
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:external-link"
        @click="logExternalMeeting"
      >
        Log External Consultation
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- 1. EXTERNAL ENTITY LOG (Ref #2 Operational Link) -->
      <div class="xl:col-span-2">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-[10px] uppercase tracking-widest"
            >
              Partner & Center Interactions
            </h3>
          </div>
          <BaseDataTable :data="externalLogs">
            <Column field="subject" header="Consultation Topic" />
            <Column field="date" header="Date" />
            <Column header="Outcome">
              <template #body="{ data }">
                <span class="text-xs font-medium text-slate-600">{{
                  data.outcome
                }}</span>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. DELEGATED TASK INBOX (Ref #2 Proxy) -->
      <div class="space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Tasks Pushed by Chair
        </h3>
        <div class="space-y-3">
          <div
            v-for="task in delegatedTasks"
            :key="task.id"
            class="p-4 bg-white border-l-4 border-maedot-gold rounded-r-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="text-[10px] font-black text-maedot-navy uppercase"
                >Due: {{ task.due }}</span
              >
              <Icon
                name="lucide:corner-right-down"
                class="w-4 h-4 text-maedot-gold"
              />
            </div>
            <p class="text-sm font-bold text-slate-700 leading-tight">
              {{ task.title }}
            </p>
            <BaseButton
              variant="ghost"
              size="sm"
              class="mt-3 p-0 h-auto text-[10px] uppercase font-black text-eotc-red"
              >Mark as Resolved</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
