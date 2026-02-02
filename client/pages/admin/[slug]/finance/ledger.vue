<script setup>
definePageMeta({ layout: "admin" });

const transactions = ref([
  {
    id: 1,
    date: "Oct 28",
    description: "Zikir Campaign Income",
    category: "REVENUE",
    amount: 320500,
    type: "IN",
    hasReceipt: true,
  },
  {
    id: 2,
    date: "Oct 29",
    description: "Monthly Hall Rent",
    category: "LOGISTICS",
    amount: 15000,
    type: "OUT",
    hasReceipt: true,
  },
  {
    id: 3,
    date: "Oct 30",
    description: "Abinet Teacher Salary",
    category: "EDUCATION",
    amount: 12500,
    type: "OUT",
    hasReceipt: false,
  },
]);

const budgetStatus = ref([
  { name: "Education", percent: 65 },
  { name: "Hymn & Arts", percent: 92 },
  { name: "Member Care", percent: 40 },
]);
</script>
<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          General Ledger
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Double-Entry Accounting & Receipt Vault (Ref #8)
        </p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="secondary" icon="lucide:file-down"
          >Export Ledger</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:plus"
          @click="showEntryForm = true"
          >Record Transaction</BaseButton
        >
      </div>
    </div>

    <!-- Ledger Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Total Income"
        value="450,000 ETB"
        icon="lucide:arrow-up-right"
        class="border-b-4 border-emerald-500"
      />
      <BaseStatCard
        title="Total Expense"
        value="120,500 ETB"
        icon="lucide:arrow-down-left"
        :trend-up="false"
        class="border-b-4 border-rose-500"
      />
      <BaseStatCard
        title="Net Balance"
        value="329,500 ETB"
        icon="lucide:wallet"
        class="border-b-4 border-maedot-gold"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. TRANSACTION FEED (Ref #8 Double-Entry Ledger) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/20"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Transaction History
            </h3>
            <div class="flex gap-2">
              <select
                class="p-2 border rounded-xl text-[10px] font-black uppercase outline-none"
              >
                <option>All Types</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
          </div>

          <BaseDataTable :data="transactions" :loading="loading">
            <Column field="date" header="Date" />
            <Column field="description" header="Description" />
            <Column field="category" header="Category" />
            <Column field="amount" header="Amount (ETB)">
              <template #body="{ data }">
                <span
                  :class="
                    data.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'
                  "
                  class="font-bold"
                >
                  {{ data.type === "IN" ? "+" : "-"
                  }}{{ data.amount.toLocaleString() }}
                </span>
              </template>
            </Column>
            <Column header="Receipt">
              <template #body="{ data }">
                <Icon
                  v-if="data.hasReceipt"
                  name="lucide:image"
                  class="text-maedot-gold cursor-pointer hover:scale-110 transition-transform"
                />
                <Icon v-else name="lucide:alert-circle" class="text-rose-400" />
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. BUDGETARY CONTROL SIDEBAR (Ref #8) -->
      <div class="xl:col-span-4 space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Dept Spending Health
        </h3>

        <div class="space-y-4">
          <BaseCard v-for="dept in budgetStatus" :key="dept.name" padding>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-maedot-navy uppercase">{{
                dept.name
              }}</span>
              <span
                class="text-[10px] font-black"
                :class="dept.percent > 90 ? 'text-rose-600' : 'text-slate-400'"
              >
                {{ dept.percent }}% Used
              </span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-500"
                :class="dept.percent > 90 ? 'bg-rose-500' : 'bg-maedot-gold'"
                :style="{ width: dept.percent + '%' }"
              ></div>
            </div>
          </BaseCard>
        </div>

        <BaseCard class="bg-maedot-navy text-white border-none">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="lucide:shield-check" class="text-maedot-gold w-5 h-5" />
            <p class="text-[10px] font-black uppercase tracking-widest">
              Audit Readiness
            </p>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            Every transaction is auto-reconciled. Ensure
            <span class="text-white">Dept 12</span> has access to the digital
            receipt vault for monthly verification.
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
