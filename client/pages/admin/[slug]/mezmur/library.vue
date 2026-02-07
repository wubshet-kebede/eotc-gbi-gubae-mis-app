<script setup>
/**
 * HYMN & LYRIC LIBRARY (Ref #6)
 * Logic: PDF Master Archiving, Multi-Lingual Search, and Seasonal Filtering
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- UI STATE ---
const searchQuery = ref("");
const filterLang = ref("ALL");
const filterSeason = ref("ALL");
const isUploadOpen = ref(false);

// --- DATA: The Digital PDF Vault ---
const hymns = ref([
  {
    id: 1,
    title: "Ye Dingil Mariam",
    lang: "AMH",
    manual: "Manual Vol. 1",
    season: "MESKEL",
    pdfUrl: "/files/ye-dingil.pdf",
    isVerified: true,
  },
  {
    id: 2,
    title: "Bismab Wowold",
    lang: "GEEZ",
    manual: "Traditional Zema",
    season: "ALL",
    pdfUrl: "/files/bismab.pdf",
    isVerified: true,
  },
  {
    id: 3,
    title: "Galata Keeti",
    lang: "ORO",
    manual: "Oromo Collection",
    season: "FASIKA",
    pdfUrl: "/files/galata.pdf",
    isVerified: false,
  },
]);

// --- LOGIC: The Multi-Filter Engine ---
const filteredHymns = computed(() => {
  return hymns.value.filter((h) => {
    const matchesSearch = h.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesLang =
      filterLang.value === "ALL" || h.lang === filterLang.value;
    const matchesSeason =
      filterSeason.value === "ALL" || h.season === filterSeason.value;
    return matchesSearch && matchesLang && matchesSeason;
  });
});

// --- ACTIONS ---
const openMasterPDF = (hymn) => {
  // Logic: Opens the official Guba Master PDF for printing/review
  window.open(hymn.pdfUrl, "_blank");
  alert(
    `Opening Master PDF for ${hymn.title}. Ensure your printer is connected.`,
  );
};

const handleShareLink = (hymn) => {
  // Logic: Generate a secure temp-link for the Batch Telegram/Social Group
  const link = `https://maedot.app{hymn.id}`;
  navigator.clipboard.writeText(link);
  alert(
    "Secure download link copied! You can now share this with the students.",
  );
};

const handleUpload = () => {
  // Logic: 1. File validation | 2. Send to Firebase/S3 | 3. Record in PostgreSQL
  alert("Uploading Scanned Manual to Guba Cloud Storage...");
  isUploadOpen.value = false;
};
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Hymn & PDF Library
        </h1>
        <p
          class="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none italic"
        >
          Digital Master Repository for Manual Records
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-up"
        @click="isUploadOpen = true"
      >
        Upload Master PDF
      </BaseButton>
    </div>

    <!-- SEARCH & GOVERNANCE FILTERS -->
    <BaseCard
      class="bg-slate-50 border-none p-4 flex flex-wrap gap-4 items-center"
    >
      <div class="flex-grow min-w-[250px]">
        <BaseInput
          v-model="searchQuery"
          icon="lucide:search"
          placeholder="Search by title or manual volume..."
        />
      </div>

      <div class="flex gap-2">
        <select
          v-model="filterLang"
          class="p-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase outline-none focus:border-maedot-gold"
        >
          <option value="ALL">All Languages</option>
          <option value="AMH">Amharic</option>
          <option value="GEEZ">Ge'ez</option>
          <option value="ORO">Afan Oromo</option>
        </select>

        <select
          v-model="filterSeason"
          class="p-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase outline-none focus:border-maedot-gold"
        >
          <option value="ALL">All Seasons</option>
          <option value="TSOM">Tsom (Fast)</option>
          <option value="FASIKA">Fasika (Easter)</option>
          <option value="MESKEL">Meskel</option>
        </select>
      </div>
    </BaseCard>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. PDF REGISTRY -->
      <div class="xl:col-span-8">
        <BaseCard
          :padding="false"
          title="Verified Hymn Collection"
          subtitle="Authorized PDFs from Guba Manuals"
        >
          <BaseDataTable :data="filteredHymns">
            <Column
              field="title"
              header="Hymn Title"
              class="font-bold text-maedot-navy text-xs"
            />
            <Column
              field="manual"
              header="Source Manual"
              class="text-[10px] text-slate-400 font-bold"
            />

            <Column header="Verification">
              <template #body="{ data }">
                <div
                  v-if="data.isVerified"
                  class="flex items-center gap-1 text-emerald-600 font-black text-[9px] uppercase"
                >
                  <Icon name="lucide:shield-check" class="w-4 h-4" /> Official
                </div>
                <span
                  v-else
                  class="text-[9px] font-black text-amber-500 uppercase italic"
                  >Pending Review</span
                >
              </template>
            </Column>

            <Column header="Access">
              <template #body="{ data }">
                <div class="flex gap-2">
                  <BaseButton
                    variant="ghost"
                    size="sm"
                    icon="lucide:eye"
                    @click="openMasterPDF(data)"
                  />
                  <BaseButton
                    variant="ghost"
                    size="sm"
                    icon="lucide:share-2"
                    @click="handleShareLink(data)"
                  />
                </div>
              </template>
            </Column>
          </BaseDataTable>
        </BaseCard>
      </div>

      <!-- 2. ANALYTICS SIDEBAR -->
      <div class="xl:col-span-4 space-y-6">
        <BaseStatCard
          title="Total Archived"
          value="342"
          icon="lucide:library"
          class="border-b-4 border-maedot-navy"
        />

        <BaseCard
          title="Role Protection"
          class="bg-maedot-navy text-white border-none"
        >
          <div class="flex items-center gap-2 mb-3">
            <Icon name="lucide:lock" class="text-maedot-gold w-4 h-4" />
            <p class="text-[10px] font-black uppercase">Gatekeeper Logic</p>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed italic mb-4">
            "Only the Arts Head can modify these master records. Students access
            files via shared temporary links."
          </p>
        </BaseCard>
      </div>
    </div>

    <!-- UPLOAD DRAWER -->
    <BaseGovernanceDrawer
      :is-open="isUploadOpen"
      title="Upload Scanned Manual"
      subtitle="Digital Archiving of Physical Hymn Books"
      action-label="Authorize Upload"
      @close="isUploadOpen = false"
      @confirm="handleUpload"
    >
      <div class="space-y-6">
        <BaseInput label="Hymn Title" placeholder="e.g. Sebhat Le-Amlak" />

        <div
          class="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center bg-slate-50"
        >
          <Icon name="lucide:file-up" class="w-10 h-10 text-slate-300 mb-2" />
          <p class="text-[10px] font-black text-slate-400 uppercase">
            Drop PDF or Scan Image Here
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Season</label
            >
            <select
              class="w-full bg-slate-100 p-4 rounded-3xl text-xs font-bold outline-none border-none"
            >
              <option>All Seasons</option>
              <option>Meskel</option>
              <option>Easter</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Language</label
            >
            <select
              class="w-full bg-slate-100 p-4 rounded-3xl text-xs font-bold outline-none border-none"
            >
              <option>Ge'ez</option>
              <option>Amharic</option>
            </select>
          </div>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
