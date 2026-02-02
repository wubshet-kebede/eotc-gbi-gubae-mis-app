<script setup>
definePageMeta({ layout: "admin" });

const loading = ref(false);
const log = reactive({
  teacherName: "",
  topic: "",
  taxiMoney: "",
  source: "MAEKEL",
});

const programs = ref([
  {
    id: 1,
    date: "Oct 28",
    teacher: "Abba Gebriel",
    topic: "The Fast of the Prophets",
    taxi: 200,
    verified: true,
  },
  {
    id: 2,
    date: "Oct 29",
    teacher: "Memhir Tekle",
    topic: "Spiritual Discipline",
    taxi: 150,
    verified: false,
  },
  {
    id: 3,
    date: "Oct 30",
    teacher: "Dn. Elias",
    topic: "Church History",
    taxi: 100,
    verified: false,
  },
]);

const submitLog = () => {
  loading.value = true;
  // Logic:
  // 1. Create a record in 'apostolic_logs'
  // 2. Automatically create a 'PENDING' expense in 'finance_ledger' (Ref #8)
  setTimeout(() => {
    loading.value = false;
    alert(
      `Log saved. ${log.taxiMoney} ETB expense request sent to Finance Dept.`,
    );
    log.teacherName = "";
    log.taxiMoney = "";
  }, 1500);
};
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Merha-Gbir & Guest Logs
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Apostolic Outreach & Guest Speaker Management
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:mic-2"
        @click="showLogModal = true"
        >Log New Program</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 1. GUEST TEACHER TAXI LOG (Ref #4 Teacher Logistics) -->
      <div class="lg:col-span-1 space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Log Guest Logistics
        </h3>
        <BaseCard class="space-y-5 border-t-4 border-maedot-gold">
          <div class="space-y-4">
            <BaseInput
              v-model="log.teacherName"
              label="Guest Teacher Name"
              placeholder="e.g. Memhir Melaku"
              icon="lucide:user"
            />
            <BaseInput
              v-model="log.topic"
              label="Teaching Topic"
              placeholder="e.g. Life of St. Mary"
              icon="lucide:book-marked"
            />

            <div class="grid grid-cols-2 gap-4">
              <BaseInput
                v-model="log.taxiMoney"
                label="Taxi Money (ETB)"
                type="number"
                icon="lucide:banknote"
              />
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700 ml-1"
                  >Source</label
                >
                <select
                  v-model="log.source"
                  class="w-full p-3 bg-slate-50 border rounded-xl text-xs outline-none"
                >
                  <option value="MAEKEL">From Ma'ekel</option>
                  <option value="LOCAL">Local / Internal</option>
                </select>
              </div>
            </div>

            <BaseButton
              block
              variant="primary"
              :loading="loading"
              @click="submitLog"
            >
              Save & Notify Finance
            </BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- 2. PROGRAM HISTORY (Ref #4 Apostolic Coordination) -->
      <div class="lg:col-span-2">
        <BaseDataTable title="Recent Program History" :data="programs">
          <Column field="date" header="Date" />
          <Column field="teacher" header="Teacher" />
          <Column field="topic" header="Topic" />
          <Column field="taxi" header="Taxi (ETB)">
            <template #body="{ data }">
              <span class="font-bold text-maedot-navy">{{ data.taxi }}</span>
            </template>
          </Column>
          <Column field="status" header="Finance Status">
            <template #body="{ data }">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                :class="
                  data.verified
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-amber-100 text-amber-600'
                "
              >
                {{ data.verified ? "Reconciled" : "Pending" }}
              </span>
            </template>
          </Column>
        </BaseDataTable>
      </div>
    </div>
  </div>
</template>
