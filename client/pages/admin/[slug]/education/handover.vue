<script setup>
definePageMeta({ layout: "admin" });
const handoverChecklist = ref([
  { id: 1, label: "Close all Active Course Attendance", done: true },
  { id: 2, label: "Settle All Teacher Taxi Money Claims", done: true },
  { id: 3, label: "Verify 2018 E.C Graduation List", done: false },
  { id: 4, label: "Audit Clearance (Dept 12)", done: false },
]);
</script>
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Education Handover
      </h1>
      <span
        class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase"
        >Finalizing Term</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Succession Checklist (Ref #4 Succession Planning) -->
      <BaseCard title="Succession Requirements">
        <div class="space-y-4">
          <div
            v-for="task in handoverChecklist"
            :key="task.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div class="flex items-center gap-3">
              <Icon
                :name="task.done ? 'lucide:check-circle' : 'lucide:circle'"
                :class="task.done ? 'text-emerald-500' : 'text-slate-300'"
              />
              <span class="text-sm font-medium text-slate-700">{{
                task.label
              }}</span>
            </div>
            <BaseButton v-if="!task.done" variant="secondary" size="sm"
              >Complete</BaseButton
            >
          </div>
        </div>
      </BaseCard>

      <!-- Departmental Summary -->
      <div class="space-y-6">
        <BaseCard
          title="Handover Summary Stats"
          class="bg-maedot-navy text-white border-none"
        >
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-black">
                Active Students
              </p>
              <p class="text-xl font-bold">142</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-black">
                Pending Certificates
              </p>
              <p class="text-xl font-bold">12</p>
            </div>
          </div>
        </BaseCard>

        <!-- Signature for Handover -->
        <BaseButton block variant="primary" size="lg" icon="lucide:key-round"
          >Initiate Transfer to Successor</BaseButton
        >
      </div>
    </div>
  </div>
</template>
