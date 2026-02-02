<script setup>
definePageMeta({ layout: "admin" });

const activeCampaigns = ref([
  {
    id: 1,
    title: "Zikir 2018",
    description: "Annual Feast and Fundraising",
    goal: 500000,
    collected: 320500,
    icon: "lucide:flame",
  },
  {
    id: 2,
    title: "Library Expansion",
    description: "Purchasing 500+ New Books",
    goal: 100000,
    collected: 88000,
    icon: "lucide:book-open",
  },
]);

const recentDonations = ref([
  {
    id: 1,
    name: "Anonymous Student",
    amount: 500,
    campaign: "Zikir 2018",
    smsSent: true,
  },
  {
    id: 2,
    name: "Deacon Elias",
    amount: 2000,
    campaign: "Library Expansion",
    smsSent: true,
  },
  {
    id: 3,
    name: "Abebe Kebede",
    amount: 150,
    campaign: "Zikir 2018",
    smsSent: false,
  },
]);

const logDonation = (camp) => {
  const amount = prompt(`Enter donation amount for ${camp.title}:`);
  if (amount && !isNaN(amount)) {
    alert(`Donation of ${amount} ETB logged. SMS Receipt Queued.`);
    // Logic: In prod, this updates the 'campaigns' table and 'donations' table in Hasura
  }
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
          Campaign & Zikir Manager
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Fundraising, Bazaars & Donation Tracking (Ref #7)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:piggy-bank"
        @click="showNewCampaign = true"
        >Launch New Campaign</BaseButton
      >
    </div>

    <!-- Active Campaign Pulse (Ref #7 Campaign Manager) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <BaseCard
        v-for="camp in activeCampaigns"
        :key="camp.id"
        class="border-l-8 border-maedot-gold relative overflow-hidden"
      >
        <div class="absolute -right-4 -bottom-4 opacity-5">
          <Icon :name="camp.icon" class="w-32 h-32" />
        </div>

        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-xl font-black text-maedot-navy uppercase">
              {{ camp.title }}
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              {{ camp.description }}
            </p>
          </div>
          <span
            class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase"
            >Active</span
          >
        </div>

        <!-- Progress Bar -->
        <div class="space-y-2">
          <div class="flex justify-between text-xs font-bold">
            <span class="text-slate-500"
              >Collected:
              <span class="text-maedot-navy"
                >{{ camp.collected.toLocaleString() }} ETB</span
              ></span
            >
            <span class="text-slate-400"
              >Goal: {{ camp.goal.toLocaleString() }} ETB</span
            >
          </div>
          <div
            class="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200"
          >
            <div
              class="bg-maedot-gold h-full transition-all duration-1000 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              :style="{ width: (camp.collected / camp.goal) * 100 + '%' }"
            ></div>
          </div>
          <p
            class="text-right text-[10px] font-black text-maedot-gold uppercase tracking-widest"
          >
            {{ ((camp.collected / camp.goal) * 100).toFixed(1) }}% Funded
          </p>
        </div>

        <div class="mt-6 flex gap-3">
          <BaseButton
            variant="secondary"
            size="sm"
            icon="lucide:plus"
            @click="logDonation(camp)"
            >Add Donation</BaseButton
          >
          <BaseButton variant="ghost" size="sm" icon="lucide:share-2"
            >Share Link</BaseButton
          >
        </div>
      </BaseCard>
    </div>

    <!-- Recent Donors Table -->
    <BaseDataTable title="Recent Contributions" :data="recentDonations">
      <Column field="name" header="Donor Name" />
      <Column field="amount" header="Amount (ETB)">
        <template #body="{ data }">
          <span class="font-bold text-maedot-navy">{{
            data.amount.toLocaleString()
          }}</span>
        </template>
      </Column>
      <Column field="campaign" header="Campaign" />
      <Column header="SMS Status">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Icon
              :name="data.smsSent ? 'lucide:check-circle' : 'lucide:clock'"
              :class="data.smsSent ? 'text-emerald-500' : 'text-slate-300'"
              class="w-4 h-4"
            />
            <span class="text-[10px] font-bold uppercase text-slate-400">{{
              data.smsSent ? "Sent" : "Queued"
            }}</span>
          </div>
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
