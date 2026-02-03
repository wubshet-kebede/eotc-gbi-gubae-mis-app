<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const slug = route.params.slug;

// Logic: Approvals waiting for the Chairperson's 'Two-Signature' compliance (Ref #1)
const pendingApprovals = ref([
  {
    id: 1,
    source: "Finance",
    item: "Spiritual Trip Budget",
    amount: 1200,
    date: "2h ago",
    priority: "High",
  },
  {
    id: 2,
    source: "Secretary",
    item: "32 New Members",
    amount: null,
    date: "5h ago",
    priority: "Medium",
  },
  {
    id: 3,
    source: "Development",
    item: "Magazine Printing",
    amount: 4500,
    date: "1d ago",
    priority: "High",
  },
]);

// Logic: Council Reporting Compliance (Ref #11 Planning & Monitoring)
const councilCompliance = ref([
  { name: "Finance", status: "Submitted", color: "bg-emerald-500" },
  { name: "Education", status: "Pending", color: "bg-amber-500" },
  { name: "Arts", status: "Submitted", color: "bg-emerald-500" },
  { name: "Charity", status: "Overdue", color: "bg-rose-500" },
]);
const isReviewerOpen = ref(false);
const selectedItem = ref(null);
const isBroadcastOpen = ref(false);

const openReview = (data) => {
  selectedItem.value = data; // Pass the clicked row data to the drawer
  isReviewerOpen.value = true; // Open the Headless UI transition
};

const handleFinalApprove = (id) => {
  // Logic: Change status in database from 'Pending' to 'Approved'
  console.log("Chairperson Signed Item ID:", id);
  isReviewerOpen.value = false;
};
const broadcastAnnouncement = () => {
  isBroadcastOpen.value = true;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6"
    >
      <div>
        <h1
          class="text-3xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          Executive Command
        </h1>
        <p class="text-sm text-slate-500 font-medium italic">
          Strategic Oversight of {{ slug }} Gbi Gubae
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          icon="lucide:megaphone"
          @click="broadcastAnnouncement"
          >Broadcast Announcement</BaseButton
        >
        <BaseButton
          variant="primary"
          icon="lucide:scroll"
          @click="navigateTo(`/admin/${slug}/chairperson/senate`)"
          >Open Senate Session</BaseButton
        >
      </div>
    </div>

    <!-- 2. OVERSIGHT METRICS (Ref #1 & #11 Logic) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard
        title="Pending Sign-offs"
        value="03"
        icon="lucide:pen-tool"
        trend="Action Required"
        class="border-l-4 border-maedot-gold cursor-pointer"
        @click="navigateTo(`/admin/${slug}/chairperson/approvals`)"
      />
      <BaseStatCard
        title="Council Compliance"
        value="82%"
        icon="lucide:gauge"
        trend="9/12 Depts"
      />
      <BaseStatCard
        title="Total Guba Funds"
        value="12,400 ETB"
        icon="lucide:wallet"
        trend="Combined Liquidity"
      />
      <BaseStatCard
        title="Active Students"
        value="452"
        icon="lucide:users"
        trend="+12 New"
      />
    </div>
    <div class="pt-4">
      <ChairCouncilGrid />
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 3. APPROVAL QUEUE PREVIEW (The Chairperson's Primary Task) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b flex justify-between items-center bg-slate-50/50"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Sign-off Pipeline
            </h3>
            <NuxtLink
              :to="`/admin/${slug}/chairperson/approvals`"
              class="text-[10px] font-black text-maedot-gold uppercase underline"
              >Go to Approvals Terminal</NuxtLink
            >
          </div>

          <BaseDataTable :data="pendingApprovals">
            <Column
              field="source"
              header="Department"
              class="font-bold text-slate-700"
            />
            <Column field="item" header="Request Item" />
            <Column field="priority" header="Priority">
              <template #body="{ data }">
                <span
                  :class="
                    data.priority === 'High'
                      ? 'text-rose-600 font-black'
                      : 'text-slate-400'
                  "
                  class="text-[10px] uppercase"
                >
                  {{ data.priority }}
                </span>
              </template>
            </Column>
            <Column header="Action">
              <template #body>
                <BaseButton
                  variant="ghost"
                  size="sm"
                  icon="lucide:shield-check"
                  class="text-maedot-navy font-bold hover:bg-maedot-gold/10"
                  @click="openReview(data)"
                  >Review</BaseButton
                >
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 4. COUNCIL STATUS (Ref #11 Monitoring) -->
      <div class="xl:col-span-4 space-y-6">
        <BaseCard title="Departmental Reporting Status">
          <div class="space-y-4 py-2">
            <div
              v-for="dept in councilCompliance"
              :key="dept.name"
              class="flex items-center justify-between"
            >
              <span
                class="text-xs font-bold text-slate-600 uppercase tracking-tight"
                >{{ dept.name }}</span
              >
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-black uppercase text-slate-400">{{
                  dept.status
                }}</span>
                <div
                  :class="dept.color"
                  class="w-2 h-2 rounded-full shadow-sm"
                ></div>
              </div>
            </div>
          </div>
          <BaseButton
            variant="secondary"
            block
            class="mt-6 text-[10px] font-black uppercase"
            @click="navigateTo(`/admin/${slug}/planning`)"
            >View KPI Analytics</BaseButton
          >
        </BaseCard>

        <!-- Ref #1 External Relations Access -->
        <AdminQuickActions />
      </div>
    </div>
    <ChairApprovalReviewDrawer
      :is-open="isReviewerOpen"
      :request="selectedItem"
      @close="isReviewerOpen = false"
      @approve="handleFinalApprove"
      @reject="handleFinalReject"
    />
    <ChairBroadcastModal
      :is-open="isBroadcastOpen"
      @close="isBroadcastOpen = false"
    />
  </div>
</template>
