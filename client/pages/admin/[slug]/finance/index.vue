<script setup>
/**
 * TREASURY COMMAND CENTER (Ref #8)
 * Logic: Activity-Based Revenue & Departmental Budget Control
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// TASK 1: The "Money Buckets" (Fund Separation)
const funds = ref([
  { label: "General Fund", balance: "245,000", color: "text-maedot-navy" },
  { label: "Charity Fund", balance: "84,500", color: "text-emerald-600" },
]);

// TASK 2: Budget Monitoring (The 12-Dept Spending Control)
const budgetHealth = ref([
  { dept: "Charity", allocated: 20000, spent: 12000, percent: 60 },
  { dept: "Education", allocated: 15000, spent: 14500, percent: 96 }, // Red Alert
  { dept: "Arts & Hymns", allocated: 5000, spent: 1200, percent: 24 },
]);

// TASK 3: Revenue from Development Dept (Breakfast Sales)
const recentIncome = ref([
  {
    event: "Meskel Breakfast",
    source: "Development Dept",
    amount: "+5,200",
    date: "Oct 28",
  },
  {
    event: "St. Teklehaymanot Sale",
    source: "Development Dept",
    amount: "+3,100",
    date: "Oct 15",
  },
]);
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. TREASURY HEADER -->
    <div class="flex justify-between items-end border-b border-slate-200 pb-6">
      <div>
        <h1
          class="text-3xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Treasury Command
        </h1>
        <p class="text-sm text-slate-500 font-medium tracking-tight">
          Finance Oversight for {{ slug }} Gbi
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:file-text"
          @click="navigateTo(`/admin/${slug}/finance/budget`)"
          >Annual Budgeting</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:book-open"
          @click="navigateTo(`/admin/${slug}/finance/ledger`)"
          >Open General Ledger</BaseButton
        >
      </div>
    </div>

    <!-- 2. FUND SEPARATION (The Buckets) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseStatCard
        title="Total Liquidity"
        value="329,500 ETB"
        icon="lucide:landmark"
        class="border-t-4 border-maedot-gold"
      />
      <BaseStatCard
        v-for="fund in funds"
        :key="fund.label"
        :title="fund.label"
        :value="fund.balance + ' ETB'"
        icon="lucide:wallet"
        :class="fund.color"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 3. BUDGET COMPLIANCE (The 12-Dept Watchdog) -->
      <div class="xl:col-span-8">
        <BaseCard
          title="Departmental Budget Health"
          subtitle="Monitoring spending limits for the 2018 E.C. Year"
        >
          <div class="space-y-6 py-4">
            <div
              v-for="item in budgetHealth"
              :key="item.dept"
              class="space-y-2"
            >
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-xs font-black text-maedot-navy uppercase">
                    {{ item.dept }}
                  </p>
                  <p class="text-[10px] text-slate-400 font-bold uppercase">
                    Allocated: {{ item.allocated }} ETB
                  </p>
                </div>
                <span
                  class="text-xs font-black"
                  :class="
                    item.percent > 90 ? 'text-rose-600' : 'text-slate-700'
                  "
                >
                  {{ item.percent }}% Spent
                </span>
              </div>
              <!-- Visual Progress Bar -->
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  class="h-full transition-all duration-1000"
                  :class="item.percent > 90 ? 'bg-rose-500' : 'bg-maedot-gold'"
                  :style="{ width: item.percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 4. REVENUE & ACTIONS -->
      <div class="xl:col-span-4 space-y-6">
        <!-- Revenue Tracker (Development Dept Link) -->
        <BaseCard title="Recent Event Income">
          <div class="space-y-4">
            <div
              v-for="inc in recentIncome"
              :key="inc.event"
              class="flex justify-between items-center p-3 bg-emerald-50 rounded-2xl border border-emerald-100"
            >
              <div>
                <p class="text-[10px] font-black text-emerald-600 uppercase">
                  {{ inc.event }}
                </p>
                <p class="text-[9px] text-slate-400 font-bold uppercase">
                  {{ inc.source }}
                </p>
              </div>
              <span class="text-sm font-black text-emerald-700">{{
                inc.amount
              }}</span>
            </div>
          </div>
        </BaseCard>

        <AdminQuickActions />
      </div>
    </div>
  </div>
</template>
