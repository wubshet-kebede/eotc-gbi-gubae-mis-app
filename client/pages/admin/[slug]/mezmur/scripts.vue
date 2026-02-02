<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tight"
        >
          Literature & Script Pipeline
        </h1>
        <p
          class="text-[10px] text-slate-500 font-bold uppercase tracking-widest"
        >
          Draft → Review → Approved for Performance (Ref #6)
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-plus"
        @click="showUpload = true"
        >Submit New Script</BaseButton
      >
    </div>

    <!-- Pipeline Stages (Ref #6 Script Review Pipeline) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="stage in stages"
        :key="stage.status"
        class="bg-slate-50 p-4 rounded-3xl border-2 border-dashed border-slate-200"
      >
        <div class="flex items-center justify-between mb-4 px-2">
          <h3
            class="text-xs font-black text-maedot-navy uppercase tracking-tighter"
          >
            {{ stage.label }}
          </h3>
          <span
            class="bg-white px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm"
            >{{ stage.count }}</span
          >
        </div>

        <div class="space-y-3">
          <BaseCard
            v-for="item in stage.items"
            :key="item.id"
            padding
            class="hover:border-maedot-gold transition-all cursor-pointer"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="text-[9px] font-black text-maedot-gold uppercase">{{
                item.type
              }}</span>
              <Icon name="lucide:paperclip" class="w-3 h-3 text-slate-300" />
            </div>
            <h4 class="text-sm font-bold text-slate-700 leading-tight mb-2">
              {{ item.title }}
            </h4>

            <!-- Dogmatic Review Badge (The "Handshake" with Education Dept) -->
            <div
              v-if="item.reviewed"
              class="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase"
            >
              <Icon name="lucide:shield-check" /> Verified by Education
            </div>
            <div
              v-else
              class="flex items-center gap-1 text-[9px] font-bold text-amber-500 uppercase"
            >
              <Icon name="lucide:clock" /> Awaiting Dogmatic Review
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Reviewer's Comment Section (Selected Item) -->
    <BaseCard v-if="selectedScript" class="mt-8 border-l-4 border-maedot-navy">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-maedot-navy">
          Reviewer's Feedback: {{ selectedScript.title }}
        </h3>
        <BaseButton variant="secondary" size="sm">Download Draft</BaseButton>
      </div>
      <textarea
        class="w-full p-4 bg-slate-50 border rounded-2xl text-sm italic"
        placeholder="Add corrections or theological notes..."
      ></textarea>
      <div class="mt-4 flex gap-3">
        <BaseButton variant="primary" size="sm"
          >Approve for Performance</BaseButton
        >
        <BaseButton variant="ghost" size="sm" class="text-rose-600"
          >Send Back for Revision</BaseButton
        >
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const selectedScript = ref(null);

const stages = ref([
  {
    label: "Incoming Drafts",
    count: 2,
    items: [
      {
        id: 1,
        title: "Easter Sunday Drama: The Empty Tomb",
        type: "DRAMA",
        reviewed: false,
      },
      {
        id: 2,
        title: "Article: The Role of Youth in Gbi",
        type: "LITERATURE",
        reviewed: false,
      },
    ],
  },
  {
    label: "Theological Review",
    count: 1,
    items: [
      {
        id: 3,
        title: "Poem: The Glory of Zion",
        type: "POETRY",
        reviewed: true,
      },
    ],
  },
  {
    label: "Ready for Event",
    count: 1,
    items: [
      {
        id: 4,
        title: "Annual Mezmur Program Script",
        type: "PROGRAM",
        reviewed: true,
      },
    ],
  },
]);
</script>
