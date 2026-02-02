<script setup>
definePageMeta({ layout: "admin" });

const skillFilter = ref("ALL");

const performers = ref([
  {
    id: 1,
    name: "Dn. Yohannes",
    batch: "2016 E.C",
    tags: ["Kirar", "Zema"],
    isAvailable: true,
  },
  {
    id: 2,
    name: "Saba Tesfaye",
    batch: "2015 E.C",
    tags: ["Dramatist", "Painter"],
    isAvailable: true,
  },
  {
    id: 3,
    name: "Yared T.",
    batch: "2017 E.C",
    tags: ["Begena", "Poet"],
    isAvailable: false,
  },
]);
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Arts & Talent Command
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Managing performers, assets, and creative production.
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:search"
        @click="navigateTo(`/admin/${$route.params.slug}/arts/library`)"
      >
        Browse Asset Library
      </BaseButton>
    </div>

    <!-- Arts Analytics (Ref #6) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard title="Verified Hymns" value="342" icon="lucide:music-4" />
      <BaseStatCard
        title="Active Performers"
        value="86"
        icon="lucide:users"
        trend="+12"
      />
      <BaseStatCard
        title="Pending Scripts"
        value="04"
        icon="lucide:file-signature"
        trend="Review Needed"
        :trend-up="false"
      />
      <BaseStatCard title="Asset Value" value="45k ETB" icon="lucide:gem" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. TALENT SCOUT MATRIX (Ref #6 Talent Tagging) -->
      <div class="xl:col-span-8">
        <BaseCard :padding="false">
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
          >
            <h3
              class="font-bold text-maedot-navy text-xs uppercase tracking-widest"
            >
              Performer & Artist Directory
            </h3>
            <div class="flex gap-2">
              <select
                v-model="skillFilter"
                class="p-2 border rounded-xl text-[10px] font-black uppercase outline-none"
              >
                <option value="ALL">All Skills</option>
                <option value="Kirar">Kirar Players</option>
                <option value="Dramatist">Dramatists</option>
                <option value="Begena">Begena</option>
                <option value="Painter">Religious Art</option>
              </select>
            </div>
          </div>

          <BaseDataTable :data="performers">
            <Column field="name" header="Name" class="font-bold" />
            <Column field="batch" header="Batch" />
            <Column field="tags" header="Talent Tags">
              <template #body="{ data }">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in data.tags"
                    :key="tag"
                    class="px-2 py-0.5 bg-maedot-gold/10 text-maedot-gold text-[9px] font-black rounded uppercase"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </template>
            </Column>
            <Column header="Availability">
              <template #body="{ data }">
                <span
                  :class="
                    data.isAvailable ? 'text-emerald-600' : 'text-slate-300'
                  "
                  class="text-[10px] font-bold uppercase"
                >
                  {{ data.isAvailable ? "Ready" : "On Leave" }}
                </span>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. QUICK ACTIONS & PERFORMANCE PIPELINE -->
      <div class="xl:col-span-4 space-y-6">
        <AdminQuickActions
          title="Creative Actions"
          :actions="[
            {
              label: 'Book Performance',
              icon: 'lucide:calendar-plus',
              command: () => {},
            },
            {
              label: 'New Talent Entry',
              icon: 'lucide:user-plus',
              command: () => {},
            },
            {
              label: 'Asset Handover',
              icon: 'lucide:package-check',
              command: () =>
                navigateTo(`/admin/${$route.params.slug}/arts/handover`),
            },
          ]"
        />

        <!-- Script Status Preview (Ref #6) -->
        <BaseCard
          title="Script Review Status"
          class="border-l-4 border-eotc-red"
        >
          <div class="space-y-4">
            <div
              v-for="s in 2"
              :key="s"
              class="flex justify-between items-center"
            >
              <p
                class="text-xs font-bold text-maedot-navy truncate max-w-[150px]"
              >
                Easter Drama v2.1
              </p>
              <span class="text-[9px] font-black text-amber-500 uppercase"
                >Awaiting Edu Review</span
              >
            </div>
            <BaseButton
              variant="ghost"
              block
              size="sm"
              class="text-[10px]"
              @click="navigateTo(`/admin/${$route.params.slug}/arts/scripts`)"
            >
              Go to Pipeline
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
