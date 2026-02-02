<script setup>
definePageMeta({ layout: "admin" });
const showForm = ref(false);
const newLetter = reactive({ ref: "", subject: "", type: "IN" });
const letters = ref([
  { ref: "FG-045/18", subject: "University Meeting", type: "IN" },
  { ref: "FG-046/18", subject: "Budget Proposal", type: "OUT" },
]);
const saveLetter = () => {
  showForm.value = false;
};
</script>
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Protocol Registry
      </h1>
      <BaseButton variant="primary" icon="lucide:plus" @click="showForm = true"
        >New Letter Entry</BaseButton
      >
    </div>

    <!-- Registration Form (Modal style) -->
    <BaseCard v-if="showForm" class="border-t-4 border-maedot-gold">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BaseInput
          v-model="newLetter.ref"
          label="Ref Number"
          placeholder="FG-001/18"
        />
        <BaseInput
          v-model="newLetter.subject"
          label="Subject"
          placeholder="Hall Request"
        />
        <div class="space-y-1.5">
          <label class="text-sm font-medium">Direction</label>
          <select
            v-model="newLetter.type"
            class="w-full p-3 bg-slate-50 border rounded-xl"
          >
            <option value="IN">Inward (Received)</option>
            <option value="OUT">Outward (Sent)</option>
          </select>
        </div>
      </div>
      <div class="mt-6 flex justify-end gap-3">
        <BaseButton variant="ghost" @click="showForm = false"
          >Cancel</BaseButton
        >
        <BaseButton variant="primary" @click="saveLetter"
          >Save to Registry</BaseButton
        >
      </div>
    </BaseCard>

    <BaseDataTable title="Correspondence Log" :data="letters">
      <Column field="ref" header="Reference" />
      <Column field="subject" header="Subject" />
      <Column field="type" header="Type" />
      <Column header="Scan">
        <template #body>
          <Icon
            name="lucide:file-search"
            class="text-maedot-gold cursor-pointer"
          />
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
