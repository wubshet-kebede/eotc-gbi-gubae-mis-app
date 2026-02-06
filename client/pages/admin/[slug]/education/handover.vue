<script setup>
/**
 * EDUCATION HANDOVER (Ref #4)
 * Logic: Final Academic Audit, PDF Generation, and Authority Transfer
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;
const isTransferLoading = ref(false);
const showSuccessModal = ref(false);

// TASK 1: The Integrity Checklist
const handoverChecklist = ref([
  { id: 1, label: "Close all Active Course Attendance", done: true },
  { id: 2, label: "Settle All Teacher Taxi Money Claims", done: true },
  { id: 3, label: "Verify 2018 E.C Graduation List", done: true },
  { id: 4, label: "Audit Clearance (Dept 12)", done: false }, // Still pending
]);

// Engineering Constraint: System blocks handover until all 4 tasks are 'done'
const canTransfer = computed(() =>
  handoverChecklist.value.every((task) => task.done),
);

// TASK 2: The Handover Execution
const initiateTransfer = () => {
  isTransferLoading.value = true;

  // Logic:
  // 1. Snapshot the 142 student profiles into the Archives
  // 2. Generate the "Academic Succession Minute" (PDF)
  // 3. Notify the Chairperson and Successor
  setTimeout(() => {
    isTransferLoading.value = false;
    showSuccessModal.value = true;

    // In production: trigger window.open('/api/generate-handover-pdf')
  }, 2500);
};

const markTaskDone = (id) => {
  const task = handoverChecklist.value.find((t) => t.id === id);
  if (task) task.done = true;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in text-maedot-navy">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black uppercase tracking-tighter italic text-maedot-navy"
        >
          Academic Succession
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Closing the 2018 E.C. Educational Cycle
        </p>
      </div>
      <div
        :class="
          canTransfer
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-rose-100 text-rose-600'
        "
        class="px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-sm transition-all duration-500"
      >
        {{ canTransfer ? "Ready for Transfer" : "Academic Audit Pending" }}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. CLEARANCE CHECKLIST -->
      <div class="lg:col-span-7">
        <BaseCard
          title="Departmental Clearance Checklist"
          subtitle="Verified requirements for role transition"
        >
          <div class="space-y-4">
            <div
              v-for="task in handoverChecklist"
              :key="task.id"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-maedot-gold"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="
                    task.done
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-200'
                      : 'bg-slate-200'
                  "
                  class="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                >
                  <Icon
                    :name="task.done ? 'lucide:check' : 'lucide:clock-4'"
                    class="w-4 h-4 text-white"
                  />
                </div>
                <span class="text-xs font-bold text-slate-700">{{
                  task.label
                }}</span>
              </div>
              <BaseButton
                v-if="!task.done"
                variant="secondary"
                size="sm"
                class="text-[9px] font-black uppercase"
                @click="markTaskDone(task.id)"
                >Complete Task</BaseButton
              >
              <span
                v-else
                class="text-[9px] font-black text-emerald-500 uppercase tracking-widest"
                >Verified</span
              >
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 2. THE SUCCESSION TERMINAL -->
      <div class="lg:col-span-5">
        <div
          class="p-8 bg-maedot-navy rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <Icon
            name="lucide:key-round"
            class="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 text-maedot-gold rotate-12"
          />

          <h3
            class="text-sm font-black text-maedot-gold uppercase tracking-widest"
          >
            Responsibility Transfer
          </h3>
          <p class="text-xs text-slate-400 leading-relaxed italic">
            "I hereby certify that the <strong>142 academic files</strong> and
            <strong>12 pending certificates</strong> are verified. By sealing
            this, I transfer all educational liability to the successor."
          </p>

          <div class="pt-6 border-t border-white/10 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-[10px] font-black uppercase text-slate-500"
                >Student Files Audited</span
              >
              <span class="text-lg font-black text-white">142</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[10px] font-black uppercase text-slate-500"
                >Curriculum Logs</span
              >
              <span class="text-lg font-black text-white text-right italic"
                >3 Streams</span
              >
            </div>
          </div>

          <BaseButton
            block
            variant="primary"
            size="lg"
            icon="lucide:shield-check"
            :disabled="!canTransfer"
            :loading="isTransferLoading"
            @click="initiateTransfer"
          >
            Seal & Transfer Role
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- 3. SUCCESS NOTIFICATION (The Result) -->
    <BaseGovernanceModal
      :is-open="showSuccessModal"
      title="Succession Sealed"
      @close="showSuccessModal = false"
    >
      <div class="text-center space-y-4 py-4">
        <div
          class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="lucide:file-down" class="w-8 h-8" />
        </div>
        <p class="text-sm font-bold text-maedot-navy uppercase">
          Handover Document Generated
        </p>
        <p class="text-xs text-slate-500 italic">
          The Academic Succession Minute has been saved to the archives. Your
          role is now marked as 'Emeritus'.
        </p>
        <BaseButton
          variant="primary"
          block
          icon="lucide:download"
          @click="showSuccessModal = false"
          >Download Signed PDF</BaseButton
        >
      </div>
    </BaseGovernanceModal>
  </div>
</template>
