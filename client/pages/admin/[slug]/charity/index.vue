<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Professional & Library Hub
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Managing intellectual assets and professional volunteerism.
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:search"
        @click="showSkillSearch = true"
      >
        Find Professional Talent
      </BaseButton>
    </div>

    <!-- Dept Stats (Ref #10) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard title="Total Books" value="1,240" icon="lucide:book-open" />
      <BaseStatCard
        title="Books On Loan"
        value="42"
        icon="lucide:arrow-right-left"
        trend="Active"
      />
      <BaseStatCard
        title="Pro Volunteers"
        value="156"
        icon="lucide:briefcase"
      />
      <BaseStatCard
        title="Charity Hours"
        value="840h"
        icon="lucide:heart"
        trend="+12%"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. LIBRARY BORROWER TRACKER (Ref #10 ILS) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Active Library Loans
            </h3>
            <BaseButton variant="secondary" size="sm" icon="lucide:plus"
              >New Loan</BaseButton
            >
          </div>

          <BaseDataTable :data="activeLoans">
            <Column field="student" header="Borrower" />
            <Column field="bookTitle" header="Book Title" />
            <Column field="dueDate" header="Due Date">
              <template #body="{ data }">
                <span
                  :class="
                    isOverdue(data.dueDate)
                      ? 'text-rose-600 font-black'
                      : 'text-slate-600'
                  "
                >
                  {{ data.dueDate }}
                </span>
              </template>
            </Column>
            <Column header="Status">
              <template #body="{ data }">
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                  :class="
                    isOverdue(data.dueDate)
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-emerald-100 text-emerald-600'
                  "
                >
                  {{ isOverdue(data.dueDate) ? "Overdue" : "On Time" }}
                </span>
              </template>
            </Column>
            <Column header="Action">
              <template #body>
                <BaseButton variant="ghost" size="sm" icon="lucide:check-circle"
                  >Return</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. PROFESSIONAL SKILL SEARCH (Ref #10 Talent Directory) -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Coordinator Tools"
          :actions="[
            {
              label: 'Map Civil Engineers',
              icon: 'lucide:construction',
              command: () => {},
            },
            {
              label: 'Health Service Log',
              icon: 'lucide:stethoscop',
              command: () => {},
            },
            {
              label: 'Generate Impact Report',
              icon: 'lucide:file-text',
              command: () => {},
            },
          ]"
        />

        <BaseCard
          title="Shelf Location Guide"
          class="bg-maedot-navy text-white border-none"
        >
          <div class="space-y-3">
            <div
              v-for="shelf in [
                'Cabinet A: Dogma',
                'Cabinet B: History',
                'Cabinet C: Ge\'ez',
              ]"
              :key="shelf"
              class="flex justify-between text-[11px] border-b border-white/10 pb-2"
            >
              <span>{{ shelf }}</span>
              <Icon name="lucide:info" class="text-maedot-gold w-3 h-3" />
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const activeLoans = ref([
  {
    id: 1,
    student: "Abebe Kebede",
    bookTitle: "Hamer Magazine Vol. 24",
    dueDate: "Feb 01, 2026",
  },
  {
    id: 2,
    student: "Selam Tesfaye",
    bookTitle: "Introduction to Ge'ez",
    dueDate: "Feb 10, 2026",
  },
]);

const isOverdue = (date) => new Date(date) < new Date();
</script>
