<template>
  <BaseGovernanceDrawer
    :is-open="isOpen"
    title="Dispatch New Loan"
    subtitle="Linking a Guba Member to a Library Asset"
    action-label="Issue Book"
    @close="$emit('close')"
    @confirm="handleIssue"
  >
    <div class="space-y-6">
      <!-- 1. SEARCH MEMBER (The 'Who') -->
      <div class="space-y-2">
        <label
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >Identify Borrower</label
        >
        <!-- PrimeVue AutoComplete for real-time member search -->
        <AutoComplete
          v-model="selectedUser"
          :suggestions="filteredMembers"
          field="full_name"
          placeholder="Search by Name or Phone..."
          class="w-full"
          inputClass="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm"
          @complete="searchMembers"
        />
        <p
          v-if="selectedUser"
          class="text-[10px] text-emerald-600 font-bold px-2"
        >
          Verified Member: {{ selectedUser.university_id }}
        </p>
      </div>

      <!-- 2. SEARCH BOOK (The 'What') -->
      <div class="space-y-2">
        <label
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >Identify Book</label
        >
        <AutoComplete
          v-model="selectedBook"
          :suggestions="filteredBooks"
          field="title"
          placeholder="Type Book Title or Author..."
          class="w-full"
          inputClass="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm"
          @complete="searchBooks"
        />
      </div>

      <!-- 3. DURATION (The 'When') -->
      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          label="Loan Duration (Days)"
          type="number"
          v-model="loanDays"
        />
        <div class="flex flex-col">
          <label class="text-[10px] font-black text-slate-400 uppercase mb-2"
            >Due Date</label
          >
          <div
            class="p-3 bg-slate-100 rounded-2xl text-xs font-black text-maedot-navy text-center"
          >
            {{ calculatedDueDate }}
          </div>
        </div>
      </div>
    </div>
  </BaseGovernanceDrawer>
</template>

<script setup>
import AutoComplete from "primevue/autocomplete";
import BaseGovernanceDrawer from "../base/BaseGovernanceDrawer.vue";

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "success"]);

const selectedUser = ref(null);
const selectedBook = ref(null);
const loanDays = ref(7);

// Logic: Auto-calculate date for the '2-day reminder' email system
const calculatedDueDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + parseInt(loanDays.value));
  return d.toLocaleDateString("en-ET", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

const searchMembers = (event) => {
  // Logic: Fetch from 'public.users' where role is MEMBER
};

const handleIssue = () => {
  // Logic: Insert into 'public.library_loans'
  emit("success");
};
</script>
