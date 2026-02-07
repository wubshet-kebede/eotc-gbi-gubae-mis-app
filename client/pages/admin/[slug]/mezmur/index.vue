<script setup>
/**
 * ARTS & TALENT COMMAND (Ref #6)
 * Logic: Talent Tagging, Cross-Dept Script Review, and Property Reporting
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- STATE ---
const skillFilter = ref("ALL");
const isDamageReportOpen = ref(false);

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

// --- DYNAMIC ACTIONS ---
const creativeActions = [
  {
    label: "Book Performance",
    icon: "lucide:calendar-plus",
    command: () => alert("Opening Scheduling Tool for Batch Performances..."),
  },
  {
    label: "New Talent Entry",
    icon: "lucide:user-plus",
    command: () => alert("Searching Global Registry to tag new artists..."),
  },
  {
    label: "Report Asset Damage",
    icon: "lucide:wrench",
    command: () => (isDamageReportOpen.value = true),
  },
];

const handleDamageSubmit = () => {
  // Logic: Sends request to Finance (#8) and Property heads
  alert(
    "Damage Report Sent. Finance Head will be notified to release repair funds.",
  );
  isDamageReportOpen.value = false;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Arts & Talent Command
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Creative Production & Asset Stewardship
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:library"
        @click="navigateTo(`/admin/${slug}/arts/library`)"
      >
        Open Zema Library
      </BaseButton>
    </div>

    <!-- Arts Analytics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseStatCard title="Verified Hymns" value="342" icon="lucide:music-4" />
      <BaseStatCard
        title="Active Performers"
        value="86"
        icon="lucide:users"
        class="text-maedot-gold"
      />
      <BaseStatCard
        title="Pending Scripts"
        value="04"
        icon="lucide:file-signature"
        class="text-rose-600"
      />
      <BaseStatCard
        title="Asset Value"
        value="45,000 ETB"
        icon="lucide:gem"
        subtitle="Managed by Finance"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. TALENT MATRIX -->
      <div class="xl:col-span-8">
        <BaseCard
          :padding="false"
          title="Performer & Artist Directory"
          subtitle="Filter by spiritual talent tags"
        >
          <div
            class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-end"
          >
            <select
              v-model="skillFilter"
              class="p-2 border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase outline-none focus:border-maedot-gold"
            >
              <option value="ALL">All Skills</option>
              <option value="Kirar">Kirar Players</option>
              <option value="Dramatist">Dramatists</option>
              <option value="Begena">Begena</option>
              <option value="Painter">Religious Art</option>
            </select>
          </div>

          <BaseDataTable :data="performers">
            <Column
              field="name"
              header="Name"
              class="font-bold text-maedot-navy text-xs"
            />
            <Column
              field="batch"
              header="Batch"
              class="text-[10px] font-black text-slate-400 uppercase"
            />
            <Column field="tags" header="Talent Tags">
              <template #body="{ data }">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in data.tags"
                    :key="tag"
                    class="px-2 py-0.5 bg-maedot-gold/10 text-maedot-gold text-[8px] font-black rounded uppercase"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </template>
            </Column>
            <Column header="Status">
              <template #body="{ data }">
                <span
                  :class="
                    data.isAvailable ? 'text-emerald-600' : 'text-slate-300'
                  "
                  class="text-[10px] font-black uppercase"
                >
                  {{ data.isAvailable ? "Ready" : "On Leave" }}
                </span>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. ACTIONS & PIPELINE -->
      <div class="xl:col-span-4 space-y-6">
        <!-- Dynamic Quick Actions -->
        <AdminActionButton title="Creative Tasks" :actions="creativeActions" />

        <!-- Script Status (Handshake with Education #4) -->
        <BaseCard title="Script Pipeline" class="border-l-4 border-rose-500">
          <div class="space-y-4">
            <div
              v-for="s in 2"
              :key="s"
              class="flex justify-between items-center p-3 bg-slate-50 rounded-2xl"
            >
              <p
                class="text-xs font-bold text-maedot-navy truncate max-w-[120px]"
              >
                Easter Drama v2.1
              </p>
              <span
                class="text-[8px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded uppercase"
                >Awaiting Edu Approval</span
              >
            </div>
            <BaseButton
              variant="ghost"
              block
              size="sm"
              class="text-[10px] font-black uppercase"
              @click="navigateTo(`/admin/${slug}/arts/scripts`)"
            >
              View All Scripts
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- DAMAGE REPORT DRAWER (The Finance Handshake) -->
    <BaseGovernanceDrawer
      :is-open="isDamageReportOpen"
      title="Asset Damage Report"
      subtitle="Requesting Repair Authorization from Finance (#8)"
      action-label="Submit to Finance/Property"
      @close="isDamageReportOpen = false"
      @confirm="handleDamageSubmit"
    >
      <div class="space-y-6">
        <BaseInput
          label="Instrument Name"
          placeholder="e.g. Large Kebero"
          icon="lucide:music"
        />
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase"
            >Damage Severity</label
          >
          <select
            class="w-full p-4 bg-slate-50 rounded-3xl text-xs font-bold outline-none border-2 border-transparent focus:border-maedot-gold"
          >
            <option>Minor (e.g. String Broken)</option>
            <option>Major (Needs External Repair)</option>
          </select>
        </div>
        <textarea
          class="w-full p-4 bg-slate-50 rounded-3xl text-xs border-none outline-none"
          rows="3"
          placeholder="Describe the issue for the Property Head..."
        ></textarea>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
