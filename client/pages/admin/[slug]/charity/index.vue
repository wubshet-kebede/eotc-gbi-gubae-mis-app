<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseGovernanceDrawer from "~/components/base/BaseGovernanceDrawer.vue";
import CharityNewLoanDrawer from "~/components/charity/NewLoanDrawer.vue";

definePageMeta({ layout: "admin" });
const isMercyDrawerOpen = ref(false);
const isServiceOpen = ref(false);
const isReturnModalOpen = ref(false);
const isNewLoanDrawerOpen = ref(false);

const selectedLoan = ref(null);
// --- CHARITY & MERCY LOGIC ---
const mercyCases = ref([
  {
    id: 1,
    name: "Kassa T.",
    type: "Rent Support",
    amount: "1,200",
    status: "Paid",
  },
  {
    id: 2,
    name: "Mulu B.",
    type: "Medical Help",
    amount: "3,000",
    status: "Pending Approval",
  },
]);

// --- PROFESSIONAL SERVICE LOG (Recording Hours) ---
const volunteerActivity = ref([
  { id: 1, name: "Dr. Henok S.", skill: "Medical", hours: 4, date: "Today" },
  {
    id: 2,
    name: "Eng. Martha L.",
    skill: "Civil",
    hours: 6,
    date: "Yesterday",
  },
]);

// Helper for Library from your previous code
const activeLoans = ref([
  {
    id: 1,
    student: "Abebe Kebede",
    bookTitle: "Hamer Magazine",
    dueDate: "Feb 01, 2026",
  },
  {
    id: 2,
    student: "Selam Tesfaye",
    bookTitle: "Introduction to Economics",
    dueDate: "Jan 28, 2026",
  },
  {
    id: 3,
    student: "Dawit Zewdu",
    bookTitle: "Advanced Mathematics",
    dueDate: "Jan 20, 2026",
  },
]);

const isOverdue = (date) => new Date(date) < new Date();

// --- ACTION HANDLERS ---
const logServiceHours = () => {
  isServiceOpen.value = true;
  // Logic: Opens the BaseGovernanceDrawer for "Professional Service Log"
};

const handleSubmitCase = () => {
  alert("Mercy Case Submitted for Approval!");
  isMercyDrawerOpen.value = false;
};
// --- FORM DATA ---
const returnForm = reactive({ condition: "Excellent", notes: "" });

// --- HANDLERS ---
const openReturnModal = (loan) => {
  selectedLoan.value = loan;
  isReturnModalOpen.value = true;
};

const handleConfirmReturn = () => {
  // Logic: 1. Set book to 'Available' 2. Mark loan as 'Returned'
  alert(
    `Book "${selectedLoan.value.bookTitle}" returned. Status: ${returnForm.condition}`,
  );
  activeLoans.value = activeLoans.value.filter(
    (l) => l.id !== selectedLoan.value.id,
  );
  isReturnModalOpen.value = false;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          Charity & Professional Hub
        </h1>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Compassion & Intellectual Growth
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:book-plus"
          @click="isNewLoanDrawerOpen = true"
          >New Book Loan</BaseButton
        >
        <BaseButton
          variant="secondary"
          icon="lucide:clock"
          @click="logServiceHours"
          >Log Prof. Hours</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:heart-handshake"
          @click="isMercyDrawerOpen = true"
          >New Mercy Case</BaseButton
        >
      </div>
    </div>

    <!-- 1. DUAL-PURPOSE STATS -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <BaseStatCard title="Total Books" value="1,240" icon="lucide:book-open" />
      <BaseStatCard
        title="Mercy Cases"
        value="08"
        icon="lucide:heart"
        trend="Active"
      />
      <BaseStatCard
        title="Pro Volunteers"
        value="156"
        icon="lucide:briefcase"
      />
      <BaseStatCard
        title="Total Service"
        value="840h"
        icon="lucide:timer"
        trend="+12h today"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 2. LIBRARY & MERCY TABS (Main Work Area) -->
      <div class="xl:col-span-8 space-y-8">
        <!-- Mercy Case Tracker -->
        <BaseCard
          :padding="false"
          title="Active Mercy Support"
          class="border-l-4 border-emerald-500"
        >
          <BaseDataTable :data="mercyCases">
            <Column
              field="name"
              header="Beneficiary Name"
              class="font-bold text-maedot-navy"
            />
            <Column field="type" header="Support Type" />
            <Column field="amount" header="Amount (ETB)" />
            <Column header="Status">
              <template #body="{ data }">
                <span
                  :class="
                    data.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-amber-100 text-amber-600'
                  "
                  class="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                >
                  {{ data.status }}
                </span>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>

        <!-- Library Loans (Your Original Table) -->
        <BaseCard :padding="false" title="Library Loans">
          <BaseDataTable :data="activeLoans">
            <Column field="student" header="Borrower" />
            <Column field="bookTitle" header="Book" />
            <Column field="dueDate" header="Due Date" />
            <Column header="status">
              <template #body="{ data }">
                <span
                  :class="
                    isOverdue(data.dueDate)
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-emerald-100 text-emerald-600'
                  "
                  class="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                >
                  {{ isOverdue(data.dueDate) ? "Overdue" : "On Time" }}
                </span>
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <BaseButton
                  variant="ghost"
                  size="sm"
                  @click="openReturnModal(data)"
                  >Return</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 3. VOLUNTEER LOG & QUICK TOOLS -->
      <div class="xl:col-span-4 space-y-6">
        <BaseCard title="Recent Professional Service">
          <div class="space-y-4">
            <div
              v-for="act in volunteerActivity"
              :key="act.id"
              class="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div class="space-y-1">
                <p
                  class="text-xs font-black text-maedot-navy uppercase tracking-tight"
                >
                  {{ act.name }}
                </p>
                <p class="text-[10px] text-slate-400 font-bold">
                  {{ act.skill }} Service
                </p>
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-maedot-gold"
                  >{{ act.hours }}h</span
                >
                <p class="text-[9px] text-slate-300 font-bold">
                  {{ act.date }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <AdminQuickActions />
      </div>
    </div>
    <!-- Inside your index.vue call -->
    <BaseGovernanceDrawer
      :is-open="isMercyDrawerOpen"
      title="New Mercy Case"
      subtitle="Initiating Support for a Guba Member"
      action-label="Submit for Approval"
      theme-bg="bg-emerald-600"
      @close="isMercyDrawerOpen = false"
      @confirm="handleSubmitCase"
    >
      <div class="space-y-6">
        <!-- 1. Beneficiary Info -->
        <div class="space-y-4">
          <BaseInput
            label="Beneficiary Name"
            placeholder="Full Name"
            icon="lucide:user"
          />
          <BaseInput
            label="University ID (If student)"
            placeholder="UoG/..."
            icon="lucide:id-card"
          />
        </div>

        <!-- 2. Support Details -->
        <div class="space-y-4">
          <div class="p-4 bg-slate-50 rounded-2xl space-y-3">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >Support Category</label
            >
            <select
              class="w-full bg-transparent text-sm font-bold outline-none text-maedot-navy"
            >
              <option>House Rent Support</option>
              <option>Medical Emergency</option>
              <option>Educational Materials</option>
              <option>Daily Bread (Food)</option>
            </select>
          </div>
          <BaseInput
            label="Required Amount (ETB)"
            placeholder="e.g. 2,500"
            icon="lucide:banknote"
          />
        </div>

        <!-- 3. Proof of Need (Ref #12 Audit) -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Supporting Document (Scanned)</label
          >
          <div
            class="p-6 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center bg-slate-50 hover:border-maedot-gold transition-colors"
          >
            <Icon name="lucide:file-up" class="w-8 h-8 text-slate-300" />
            <p
              class="text-[9px] font-black text-slate-400 uppercase mt-2 text-center"
            >
              Attach Rent Note, Hospital Bill, or Request Letter
            </p>
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isServiceOpen"
      title="Log Pro Service"
      subtitle="Recording skilled volunteer hours"
      action-label="Save Hours"
      @close="isServiceOpen = false"
    >
      <div class="space-y-4">
        <BaseInput label="Volunteer Name" placeholder="Search member..." />
        <BaseInput label="Total Hours" type="number" icon="lucide:timer" />
        <BaseInput
          label="Description of Work"
          placeholder="e.g. Medical Checkup"
        />
      </div>
    </BaseGovernanceDrawer>
    <BaseGovernanceDrawer
      :is-open="isReturnModalOpen"
      title="Confirm Book Return"
      :description="`Verifying the condition of: ${selectedLoan?.bookTitle}`"
      action-label="Confirm Return"
      theme-bg="bg-maedot-navy"
      @close="isReturnModalOpen = false"
      @confirm="handleConfirmReturn"
    >
      <div class="space-y-4 py-2">
        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Book Condition</label
          >
          <select
            v-model="returnForm.condition"
            class="w-full p-3 bg-slate-100 rounded-xl text-sm font-bold"
          >
            <option>Excellent</option>
            <option>Good (Minor Wear)</option>
            <option>Damaged (Needs Repair)</option>
          </select>
        </div>
        <BaseInput
          v-model="returnForm.notes"
          label="Notes"
          placeholder="Any missing pages?"
        />
      </div>
    </BaseGovernanceDrawer>
    <CharityNewLoanDrawer
      :is-open="isNewLoanDrawerOpen"
      @close="isNewLoanDrawerOpen = false"
      @success="isNewLoanDrawerOpen = false"
    >
    </CharityNewLoanDrawer>
  </div>
</template>
