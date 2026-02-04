<script setup>
/**
 * BUDGETARY CONTROL & ENFORCEMENT (Ref #8)
 * Tasks: Yearly Allocation, Fund Top-ups, and Spending Locks
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;
const isAdjusting = ref(false);
const isInitOpen = ref(false);

const handleYearReset = () => {
  // Logic:
  // 1. Snapshot current budgets to 'public.archives'
  // 2. Set all 'spent' columns to 0 in 'public.budgets'
  // 3. Update 'fiscal_year' to 2018 E.C.
  alert(
    "Fiscal Year 2018 E.C. has been initialized. All departments are reset to 0 ETB.",
  );
  isInitOpen.value = false;
};

// TASK: Departmental Budget State with Locking Logic
const budgets = ref([
  {
    id: 1,
    name: "Education & Apostolic",
    total: 50000,
    spent: 32500,
    percent: 65,
    isLocked: false,
  },
  {
    id: 2,
    name: "Hymn & Arts",
    total: 20000,
    spent: 18400,
    percent: 92,
    isLocked: false,
  },
  {
    id: 3,
    name: "Member Care",
    total: 15000,
    spent: 4500,
    percent: 30,
    isLocked: false,
  },
  {
    id: 4,
    name: "General Admin",
    total: 30000,
    spent: 28500,
    percent: 95,
    isLocked: true,
  }, // LOCKED: High Risk
]);

// FORM DATA for "Adjust Allocations"
const adjustmentForm = reactive({
  deptId: null,
  amount: 0,
  reason: "",
});

const handleAdjustment = () => {
  // Logic: 1. Verify General Fund Balance | 2. Update Dept Total | 3. Log in Ledger
  alert(
    `Budget Adjustment of ${adjustmentForm.amount} ETB submitted for Chairperson's Seal.`,
  );
  isAdjusting.value = false;
};

const toggleLock = (dept) => {
  dept.isLocked = !dept.isLocked;
  alert(`${dept.name} budget is now ${dept.isLocked ? "LOCKED" : "UNLOCKED"}.`);
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- 1. HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Budgetary Control
        </h1>
        <p
          class="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none"
        >
          Spending Enforcement Terminal • 2018 E.C. Cycle
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:list-restart"
          @click="isInitOpen = true"
          >Set Annual Budget</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:sliders-horizontal"
          @click="isAdjusting = true"
        >
          Adjust Allocations
        </BaseButton>
      </div>
    </div>

    <!-- 2. DEPT BUDGET GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCard
        v-for="dept in budgets"
        :key="dept.id"
        class="relative overflow-hidden transition-all duration-500"
        :class="
          dept.isLocked ? 'bg-slate-50 opacity-75 grayscale-[0.5]' : 'bg-white'
        "
      >
        <!-- Status Overlays -->
        <div class="absolute top-4 right-4 flex gap-2">
          <div
            v-if="dept.percent > 90 && !dept.isLocked"
            class="bg-rose-100 p-1.5 rounded-lg"
          >
            <Icon
              name="lucide:alert-circle"
              class="text-rose-600 w-4 h-4 animate-pulse"
            />
          </div>
          <div
            v-if="dept.isLocked"
            class="bg-maedot-navy p-1.5 rounded-lg shadow-lg"
          >
            <Icon name="lucide:lock" class="text-maedot-gold w-4 h-4" />
          </div>
        </div>

        <div class="flex justify-between items-start mb-4">
          <div>
            <h3
              class="font-black text-maedot-navy uppercase text-sm tracking-tight"
            >
              {{ dept.name }}
            </h3>
            <p class="text-[10px] text-slate-400 font-bold uppercase italic">
              Ref: 2018-{{ dept.id }}
            </p>
          </div>
          <div class="text-right">
            <span
              class="text-2xl font-black block leading-none"
              :class="dept.percent > 90 ? 'text-rose-600' : 'text-maedot-gold'"
            >
              {{ dept.percent }}%
            </span>
            <span
              class="text-[8px] font-black text-slate-300 uppercase tracking-widest"
              >Utilization</span
            >
          </div>
        </div>

        <!-- Progress Bar Logic -->
        <div class="space-y-3">
          <div
            class="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200"
          >
            <div
              class="h-full transition-all duration-1000"
              :class="
                dept.percent > 90
                  ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-maedot-gold'
              "
              :style="{ width: dept.percent + '%' }"
            ></div>
          </div>

          <div class="flex justify-between items-center">
            <div class="space-y-0.5">
              <p class="text-[9px] font-black text-slate-400 uppercase">
                Allocated / Spent
              </p>
              <p class="text-xs font-bold text-slate-700">
                {{ dept.total.toLocaleString() }} /
                <span
                  :class="
                    dept.percent > 90 ? 'text-rose-600' : 'text-maedot-navy'
                  "
                  >{{ dept.spent.toLocaleString() }}</span
                >
                ETB
              </p>
            </div>

            <!-- Lock/Unlock Action -->
            <BaseButton
              variant="ghost"
              size="sm"
              @click="toggleLock(dept)"
              class="text-[9px] font-black uppercase"
            >
              {{ dept.isLocked ? "Unlock Spending" : "Freeze Budget" }}
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- 3. ADJUSTMENT DRAWER (The Logic Bridge) -->
    <BaseGovernanceDrawer
      :is-open="isAdjusting"
      title="Budget Allocation Adjustment"
      subtitle="Transferring Funds to Departmental Limits"
      action-label="Submit for Chairperson's Seal"
      @close="isAdjusting = false"
      @confirm="handleAdjustment"
    >
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Select Target Department</label
          >
          <select
            v-model="adjustmentForm.deptId"
            class="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold outline-none"
          >
            <option v-for="d in budgets" :key="d.id" :value="d.id">
              {{ d.name }}
            </option>
          </select>
        </div>

        <BaseInput
          v-model="adjustmentForm.amount"
          label="Additional Funds (ETB)"
          type="number"
          icon="lucide:plus-square"
        />

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Justification for Top-up</label
          >
          <textarea
            v-model="adjustmentForm.reason"
            class="w-full p-4 bg-slate-50 border rounded-3xl text-xs italic"
            rows="3"
            placeholder="Explain why this department needs more money..."
          ></textarea>
        </div>

        <div
          class="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3"
        >
          <Icon name="lucide:info" class="text-amber-600 w-5 h-5 shrink-0" />
          <p class="text-[10px] font-bold text-amber-800 leading-tight">
            Note: This adjustment will reduce the **General Fund** and requires
            a **Digital Signature** from the Chairperson.
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isInitOpen"
      title="Initialize 2018 E.C. Fiscal Year"
      description="This will lock the current ledger and reset departmental spending limits."
      @close="isInitOpen = false"
    >
      <div class="space-y-6">
        <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
          <p class="text-[10px] font-bold text-amber-800">
            Current Balance to Rollover:
            <span class="font-black">329,500 ETB</span>
          </p>
        </div>

        <!-- Set the new targets -->
        <div class="space-y-3">
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Set Initial Budget Strategy
          </p>
          <BaseInput
            label="Projected Total Budget"
            type="number"
            placeholder="e.g. 500,000"
          />
        </div>

        <div class="flex flex-col gap-2 pt-4">
          <BaseButton variant="primary" block class="bg-rose-600 border-none"
            >Execute Fiscal Reset</BaseButton
          >
          <p class="text-[9px] text-center text-slate-400 italic">
            This action requires your Master Security PIN.
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
