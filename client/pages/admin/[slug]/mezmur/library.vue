<script setup>
definePageMeta({ layout: "admin" });

const searchQuery = ref("");
const filterLang = ref("ALL");
const filterSeason = ref("ALL");

const hymns = ref([
  {
    id: 1,
    title: "Ye Dingil Mariam",
    lang: "AMH",
    type: "Begena",
    hasLyrics: true,
    hasNotation: true,
  },
  {
    id: 2,
    title: "Bismab Wowold",
    lang: "GEEZ",
    type: "Wubaye",
    hasLyrics: true,
    hasNotation: false,
  },
  {
    id: 3,
    title: "Galata Keeti",
    lang: "ORO",
    type: "Mezmur",
    hasLyrics: true,
    hasNotation: true,
  },
]);

const filteredHymns = computed(() => {
  return hymns.value.filter((h) => {
    const matchesSearch = h.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesLang =
      filterLang.value === "ALL" || h.lang === filterLang.value;
    return matchesSearch && matchesLang;
  });
});
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Hymn & Lyric Library
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Digital Asset & Notation Repository (Ref #6)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-up"
        @click="showUpload = true"
        >Upload Notation/Lyric</BaseButton
      >
    </div>

    <!-- Search & Filter Bar (Ref #6 Search by Category) -->
    <BaseCard
      class="flex flex-wrap gap-4 p-4 bg-slate-50 border-none shadow-inner"
    >
      <div class="flex-grow min-w-[200px]">
        <BaseInput
          v-model="searchQuery"
          icon="lucide:search"
          placeholder="Search by title or category..."
        />
      </div>
      <select
        v-model="filterLang"
        class="p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-maedot-gold"
      >
        <option value="ALL">All Languages</option>
        <option value="AMH">Amharic</option>
        <option value="GEEZ">Ge'ez</option>
        <option value="ORO">Afan Oromo</option>
      </select>
      <select
        v-model="filterSeason"
        class="p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-maedot-gold"
      >
        <option value="ALL">All Seasons</option>
        <option value="TSOM">Tsom (Fast)</option>
        <option value="FASIKA">Fasika (Easter)</option>
        <option value="MESKEL">Meskel</option>
      </select>
    </BaseCard>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 1. THE HYMN DATABASE (Ref #6 Digital Asset) -->
      <div class="xl:col-span-8">
        <BaseDataTable title="Verified Hymn Collection" :data="filteredHymns">
          <Column
            field="title"
            header="Hymn Title"
            class="font-bold text-maedot-navy"
          />
          <Column field="lang" header="Lang">
            <template #body="{ data }">
              <span class="text-[10px] font-black text-slate-400">{{
                data.lang
              }}</span>
            </template>
          </Column>
          <Column field="type" header="Category" />
          <Column header="Assets">
            <template #body="{ data }">
              <div class="flex gap-2">
                <Icon
                  v-if="data.hasLyrics"
                  name="lucide:align-left"
                  class="w-4 h-4 text-emerald-500"
                  title="Lyrics Available"
                />
                <Icon
                  v-if="data.hasNotation"
                  name="lucide:music"
                  class="w-4 h-4 text-maedot-gold"
                  title="Notation Attached"
                />
              </div>
            </template>
          </Column>
          <Column header="Action">
            <template #body>
              <BaseButton variant="ghost" size="sm" icon="lucide:eye"
                >View</BaseButton
              >
            </template>
          </Column>
        </BaseDataTable>
      </div>

      <!-- 2. RECENTLY ADDED / PREVIEW SIDEBAR -->
      <div class="xl:col-span-4 space-y-6">
        <h3
          class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
        >
          Library Insights
        </h3>
        <BaseStatCard title="Total Hymns" value="342" icon="lucide:library" />

        <BaseCard
          title="Talent Connection"
          class="bg-maedot-navy text-white border-none"
        >
          <p class="text-[11px] text-slate-400 leading-relaxed mb-4">
            Link these hymns to specific **Performers** from your talent
            directory for the next program.
          </p>
          <BaseButton
            variant="primary"
            block
            size="sm"
            icon="lucide:users"
            class="bg-white/10 hover:bg-white/20"
          >
            Link to Performers
          </BaseButton>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
