<script setup>
/**
 * PROTOCOL & CORRESPONDENCE REGISTRY (Ref #3)
 * Logic: Letter Digitization, Conversational Threading, and Ref-Number Integrity
 */
definePageMeta({ layout: "admin" });

const showForm = ref(false);
const isUploading = ref(false);

const letters = ref([
  {
    ref: "FG-045/18",
    subject: "University Hall Meeting",
    type: "IN",
    date: "2024-10-28",
    hasScan: true,
  },
  {
    ref: "FG-046/18",
    subject: "Budget Proposal Submission",
    type: "OUT",
    date: "2024-10-29",
    hasScan: false,
  },
]);

const newLetter = reactive({
  ref: "",
  subject: "",
  type: "IN",
  date: new Date().toISOString().substr(0, 10),
});

const saveLetter = () => {
  // Logic: 1. Push to public.protocol | 2. Trigger Scan Upload | 3. Update Index Stats
  isUploading.value = true;
  setTimeout(() => {
    letters.value.unshift({ ...newLetter, hasScan: true });
    showForm.value = false;
    isUploading.value = false;
    alert(
      `Protocol ${newLetter.ref} successfully registered in the 2018 E.C. Ledger.`,
    );
  }, 1500);
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Protocol Registry
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic italic"
        >
          Managing Inward & Outward Correspondence
        </p>
      </div>
      <BaseButton variant="primary" icon="lucide:plus" @click="showForm = true"
        >New Letter Entry</BaseButton
      >
    </div>

    <!-- Registration UI (Using the Governance Drawer logic for better UX) -->
    <Transition name="fade-down">
      <BaseCard
        v-if="showForm"
        class="border-t-8 border-maedot-gold bg-slate-50/50"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BaseInput
            v-model="newLetter.ref"
            label="Official Ref #"
            placeholder="e.g. FG-047/18"
          />
          <BaseInput
            v-model="newLetter.subject"
            label="Subject of Letter"
            placeholder="e.g. Donation Request"
          />
          <div class="space-y-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >Letter Direction</label
            >
            <select
              v-model="newLetter.type"
              class="w-full p-3 bg-white border-2 border-slate-100 rounded-2xl text-xs font-bold outline-none focus:border-maedot-gold"
            >
              <option value="IN">Inward (Received)</option>
              <option value="OUT">Outward (Sent)</option>
            </select>
          </div>
          <!-- Logic: Scan Upload Trigger -->
          <div class="space-y-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >Digital Attachment</label
            >
            <div
              class="p-3 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <Icon name="lucide:upload-cloud" class="w-5 h-5 text-slate-300" />
              <span class="text-[10px] font-bold text-slate-400 ml-2"
                >Upload Scan</span
              >
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <BaseButton variant="ghost" @click="showForm = false"
            >Discard Draft</BaseButton
          >
          <BaseButton
            variant="primary"
            :loading="isUploading"
            @click="saveLetter"
            >Commit to Registry</BaseButton
          >
        </div>
      </BaseCard>
    </Transition>

    <!-- The Data Log -->
    <BaseCard :padding="false">
      <BaseDataTable title="Verified Correspondence Log" :data="letters">
        <Column
          field="ref"
          header="Reference"
          class="font-black text-maedot-navy text-[10px]"
        />
        <Column field="subject" header="Subject" class="text-xs font-bold" />
        <Column field="type" header="Type">
          <template #body="{ data }">
            <span
              :class="
                data.type === 'IN'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-maedot-gold/10 text-maedot-gold'
              "
              class="px-2 py-0.5 rounded text-[8px] font-black uppercase border border-current"
            >
              {{ data.type === "IN" ? "Received" : "Sent" }}
            </span>
          </template>
        </Column>
        <Column header="Digital Copy">
          <template #body="{ data }">
            <div class="flex items-center gap-2 group cursor-pointer">
              <Icon
                :name="
                  data.hasScan ? 'lucide:file-check-2' : 'lucide:file-warning'
                "
                :class="data.hasScan ? 'text-maedot-gold' : 'text-slate-300'"
                class="w-5 h-5"
              />
              <span
                class="text-[9px] font-black uppercase text-slate-400 group-hover:text-maedot-navy transition-colors"
              >
                {{ data.hasScan ? "View Archive" : "Missing Scan" }}
              </span>
            </div>
          </template>
        </Column>
      </BaseDataTable>
    </BaseCard>
  </div>
</template>
