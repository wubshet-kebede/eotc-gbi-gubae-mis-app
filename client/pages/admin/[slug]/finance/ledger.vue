<script setup>
/**
 * GENERAL LEDGER & AUDIT VAULT (Ref #8)
 * Logic: Multi-Stage Approval & Digital Voucher Generation
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;
const isEntryOpen = ref(false);
const isVoucherOpen = ref(false);
const selectedTx = ref(null);

// TASK: The Unified Transaction Feed (Ref #8 & #1)
const transactions = ref([
  {
    id: "TX-9901",
    date: "Oct 30",
    description: "Abinet Teacher Monthly Salary",
    dept: "Education",
    amount: 12500,
    type: "OUT",
    status: "Awaiting Chair Seal", // Locked until Chairperson signs
    hasReceipt: true,
  },
  {
    id: "TX-9902",
    date: "Oct 28",
    description: "Meskel Festival Breakfast Sale",
    dept: "Development",
    amount: 5200,
    type: "IN",
    status: "Verified",
    hasReceipt: true,
  },
  {
    id: "TX-9903",
    date: "Oct 25",
    description: "Emergency Medical Support",
    dept: "Charity",
    amount: 3000,
    type: "OUT",
    status: "Finance Approved", // Waiting for next step
    hasReceipt: false,
  },
]);

// TASK: Budgetary Watchdog
const budgetStatus = ref([
  { name: "Education", allocated: 20000, spent: 14500, percent: 72 },
  { name: "Charity", allocated: 50000, spent: 48000, percent: 96 },
  { name: "Arts & Hymns", allocated: 10000, spent: 1200, percent: 12 },
]);

const openVoucher = (tx) => {
  selectedTx.value = tx;
  isVoucherOpen.value = true;
};
// --- UI STATE ---

const isStatementOpen = ref(false);

// --- FORM DATA ---
const newTx = reactive({
  type: "IN",
  amount: 0,
  dept: "Development", // Default for Breakfast Sales
  description: "",
  event: "Meskel Festival",
});

// --- HANDLERS ---
const handleRecordTransaction = () => {
  // Logic: 1. Validate budget | 2. Send to Hasura | 3. Notify Chair
  alert(
    `New ${newTx.type} of ${newTx.amount} ETB recorded for ${newTx.dept}. Status: Pending Chair Seal.`,
  );
  isEntryOpen.value = false;
};

const handlePrintStatement = () => {
  isStatementOpen.value = true;
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- 1. LEDGER HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          General Ledger
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none"
        >
          Two-Signature Compliance Terminal • {{ slug }} Gbi
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:printer"
          @click="handlePrintStatement"
          >Print Monthly Statement</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:plus-circle"
          @click="isEntryOpen = true"
          >Record Transaction</BaseButton
        >
      </div>
    </div>

    <!-- 2. BALANCE METRICS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Total Revenue"
        value="450,000 ETB"
        icon="lucide:trending-up"
        class="border-b-4 border-emerald-500"
      />
      <BaseStatCard
        title="Total Expenses"
        value="120,500 ETB"
        icon="lucide:trending-down"
        :trend-up="false"
        class="border-b-4 border-rose-500"
      />
      <BaseStatCard
        title="Net Liquidity"
        value="329,500 ETB"
        icon="lucide:landmark"
        class="border-b-4 border-maedot-gold"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 3. TRANSACTION FEED -->
      <div class="xl:col-span-8">
        <BaseCard
          :padding="false"
          title="Transaction Registry"
          subtitle="Verified Financial Activity"
        >
          <BaseDataTable :data="transactions">
            <Column
              field="date"
              header="Date"
              class="text-slate-400 font-bold"
            />
            <Column
              field="dept"
              header="Dept"
              class="text-[10px] font-black uppercase text-maedot-gold"
            />
            <Column
              field="description"
              header="Description"
              class="font-bold text-maedot-navy text-xs"
            />
            <Column field="amount" header="Amount">
              <template #body="{ data }">
                <span
                  :class="
                    data.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'
                  "
                  class="font-black"
                >
                  {{ data.type === "IN" ? "+" : "-"
                  }}{{ data.amount.toLocaleString() }}
                </span>
              </template>
            </Column>
            <Column header="Governance Status">
              <template #body="{ data }">
                <div class="flex items-center gap-1">
                  <span
                    class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter"
                    :class="
                      data.status === 'Verified'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-amber-100 text-amber-600'
                    "
                  >
                    {{ data.status }}
                  </span>
                </div>
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <BaseButton
                  variant="ghost"
                  size="sm"
                  icon="lucide:file-text"
                  @click="openVoucher(data)"
                />
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 4. BUDGETARY CONTROL -->
      <div class="xl:col-span-4 space-y-6">
        <BaseCard
          title="Departmental Utilization"
          class="border-l-4 border-maedot-navy"
        >
          <div class="space-y-5">
            <div
              v-for="dept in budgetStatus"
              :key="dept.name"
              class="space-y-2"
            >
              <div
                class="flex justify-between text-[10px] font-black uppercase"
              >
                <span class="text-slate-400">{{ dept.name }}</span>
                <span
                  :class="
                    dept.percent > 90 ? 'text-rose-600' : 'text-maedot-navy'
                  "
                  >{{ dept.percent }}%</span
                >
              </div>
              <div
                class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"
              >
                <div
                  class="h-full transition-all duration-1000"
                  :class="dept.percent > 90 ? 'bg-rose-500' : 'bg-maedot-gold'"
                  :style="{ width: dept.percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </BaseCard>
        <AdminQuickActions />
      </div>
    </div>

    <!-- 5. DIGITAL VOUCHER MODAL (The Proof) -->
    <BaseGovernanceDrawer
      :is-open="isVoucherOpen"
      title="Digital Payment Voucher"
      :description="`Voucher ID: ${selectedTx?.id}`"
      @close="isVoucherOpen = false"
    >
      <div
        class="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 space-y-4 text-center"
      >
        <div class="flex justify-center mb-2">
          <Icon name="lucide:qr-code" class="w-16 h-16 text-maedot-navy" />
        </div>
        <div class="space-y-1">
          <p
            class="text-[9px] font-black text-slate-400 uppercase leading-none"
          >
            Authorization Status
          </p>
          <p class="text-xs font-black text-maedot-navy uppercase">
            {{ selectedTx?.status }}
          </p>
        </div>
        <div
          class="flex justify-between items-center px-4 py-2 bg-white rounded-xl border"
        >
          <span class="text-[10px] font-bold text-slate-400"
            >Total Validated</span
          >
          <span class="text-sm font-black text-maedot-navy"
            >{{ selectedTx?.amount }} ETB</span
          >
        </div>
        <BaseButton variant="secondary" block icon="lucide:download" size="sm"
          >Download PDF Voucher</BaseButton
        >
      </div>
    </BaseGovernanceDrawer>
    <!-- 1. RECORD TRANSACTION DRAWER (The Input) -->
    <BaseGovernanceDrawer
      :is-open="isEntryOpen"
      title="Record New Transaction"
      subtitle="Manual Entry for Event Income or Dept Expenses"
      action-label="Authorize & Save"
      @close="isEntryOpen = false"
      @confirm="handleRecordTransaction"
    >
      <div class="space-y-6">
        <!-- Transaction Type Toggle -->
        <div class="flex p-1 bg-slate-100 rounded-2xl">
          <button
            @click="newTx.type = 'IN'"
            :class="
              newTx.type === 'IN'
                ? 'bg-white shadow-sm text-emerald-600'
                : 'text-slate-400'
            "
            class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
          >
            Income
          </button>
          <button
            @click="newTx.type = 'OUT'"
            :class="
              newTx.type === 'OUT'
                ? 'bg-white shadow-sm text-rose-600'
                : 'text-slate-400'
            "
            class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
          >
            Expense
          </button>
        </div>

        <BaseInput
          v-model="newTx.amount"
          label="Amount (ETB)"
          type="number"
          icon="lucide:banknote"
        />

        <!-- Department Source (Critical for your Breakfast Sales logic) -->
        <div class="p-4 bg-slate-50 rounded-3xl space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Originating Department</label
          >
          <select
            v-model="newTx.dept"
            class="w-full bg-transparent text-sm font-bold outline-none text-maedot-navy"
          >
            <option value="Development">Development (Breakfast Sales)</option>
            <option value="Charity">Charity & Mercy</option>
            <option value="Education">Education (Abinet)</option>
            <option value="Arts">Arts & Hymns</option>
          </select>
        </div>

        <BaseInput
          v-model="newTx.description"
          label="Memo / Description"
          placeholder="e.g. Sales from Meskel morning..."
        />
      </div>
    </BaseGovernanceDrawer>

    <!-- 2. MONTHLY STATEMENT MODAL (The Output) -->
    <BaseGovernanceDrawer
      :is-open="isStatementOpen"
      title="Monthly Financial Statement"
      description="Consolidated Report for January 2026"
      @close="isStatementOpen = false"
    >
      <div class="space-y-4">
        <div class="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
          <div
            class="flex justify-between items-center border-b border-white/10 pb-2"
          >
            <span class="text-[10px] font-black uppercase text-maedot-gold"
              >Total Revenue</span
            >
            <span class="text-sm font-black">+42,000 ETB</span>
          </div>
          <div
            class="flex justify-between items-center border-b border-white/10 pb-2"
          >
            <span class="text-[10px] font-black uppercase text-rose-400"
              >Total Expenses</span
            >
            <span class="text-sm font-black">-12,500 ETB</span>
          </div>
          <div class="flex justify-between items-center pt-2">
            <span class="text-[10px] font-black uppercase text-slate-400"
              >Net Surplus</span
            >
            <span class="text-lg font-black text-emerald-400">29,500 ETB</span>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <BaseButton variant="primary" block icon="lucide:file-down"
            >Download PDF for Senate</BaseButton
          >
          <p class="text-[9px] text-center text-slate-400 italic">
            "This document is digitally signed by the Finance Head &
            Chairperson."
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
