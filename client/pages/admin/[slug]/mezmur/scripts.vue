<script setup>
/**
 * LITERATURE & SCRIPT PIPELINE (Ref #6)
 * Logic: Kanban Workflow, Version Control, and Institutional Archiving
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- STATE ---
const isSubmitOpen = ref(false);
const selectedScript = ref(null);
const newScript = reactive({ title: "", type: "DRAMA", version: 1 });

const stages = ref([
  {
    id: "DRAFT",
    label: "Incoming Drafts",
    items: [
      {
        id: 1,
        title: "Easter Sunday Drama: The Empty Tomb",
        type: "DRAMA",
        reviewed: false,
        version: 1.0,
      },
      {
        id: 2,
        title: "Article: The Role of Youth in Gbi",
        type: "LITERATURE",
        reviewed: false,
        version: 1.1,
      },
    ],
  },
  {
    id: "REVIEW",
    label: "Theological Review",
    items: [
      {
        id: 3,
        title: "Poem: The Glory of Zion",
        type: "POETRY",
        reviewed: true,
        version: 2.0,
      },
    ],
  },
  {
    id: "READY",
    label: "Ready for Event",
    items: [
      {
        id: 4,
        title: "Annual Mezmur Program Script",
        type: "PROGRAM",
        reviewed: true,
        version: 1.0,
      },
    ],
  },
]);

// --- ACTIONS ---
const selectScript = (item) => {
  selectedScript.value = item;
};

const handleSubmission = () => {
  // Logic: 1. Save to DB | 2. Push to 'Incoming Drafts' | 3. Notify Head
  const entry = {
    id: Date.now(),
    title: newScript.title,
    type: newScript.type,
    reviewed: false,
    version: 1.0,
  };
  stages.value[0].items.push(entry);
  alert(
    `"${newScript.title}" has been successfully submitted to the pipeline.`,
  );
  isSubmitOpen.value = false;
  newScript.title = "";
};

const approveScript = (script) => {
  // Logic: Move from current stage to 'READY' and lock for performance
  alert(
    `Success: "${script.title}" is officially verified and archived for performance.`,
  );
  selectedScript.value = null;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter italic"
        >
          Script Pipeline
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Draft → Review → Approved for Performance
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-plus"
        @click="isSubmitOpen = true"
      >
        Submit New Script
      </BaseButton>
    </div>

    <!-- KANBAN PIPELINE -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="stage in stages"
        :key="stage.id"
        class="bg-slate-50/50 p-6 rounded-[2.5rem] border-2 border-dashed border-slate-100 min-h-[400px]"
      >
        <div class="flex items-center justify-between mb-6 px-2">
          <h3
            class="text-xs font-black text-maedot-navy uppercase tracking-widest"
          >
            {{ stage.label }}
          </h3>
          <span
            class="bg-white px-2 py-1 rounded-xl text-[10px] font-black shadow-sm text-slate-400 border border-slate-100"
          >
            {{ stage.items.length }}
          </span>
        </div>

        <div class="space-y-4">
          <BaseCard
            v-for="item in stage.items"
            :key="item.id"
            padding
            @click="selectScript(item)"
            class="hover:border-maedot-gold transition-all cursor-pointer group relative overflow-hidden"
            :class="
              selectedScript?.id === item.id
                ? 'border-maedot-gold ring-2 ring-maedot-gold/10'
                : ''
            "
          >
            <div class="flex justify-between items-start mb-3">
              <span
                class="text-[8px] font-black text-maedot-gold bg-maedot-gold/5 px-2 py-0.5 rounded-full uppercase"
                >#{{ item.type }}</span
              >
              <span
                class="text-[8px] font-black text-slate-300 uppercase italic"
                >v{{ item.version }}</span
              >
            </div>

            <h4
              class="text-xs font-black text-maedot-navy leading-tight mb-3 group-hover:text-maedot-gold transition-colors"
            >
              {{ item.title }}
            </h4>

            <div
              v-if="item.reviewed"
              class="flex items-center gap-1 text-[8px] font-black text-emerald-600 uppercase"
            >
              <Icon name="lucide:shield-check" class="w-3 h-3" /> Verified
              Theology
            </div>
            <div
              v-else
              class="flex items-center gap-1 text-[8px] font-black text-amber-500 uppercase italic"
            >
              <Icon name="lucide:clock" class="w-3 h-3" /> Under Review
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- FEEDBACK & APPROVAL HUB -->
    <Transition name="fade-up">
      <BaseCard
        v-if="selectedScript"
        class="mt-8 border-l-8 border-maedot-navy bg-slate-50/30"
      >
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="font-black text-maedot-navy uppercase text-sm">
              Reviewer's Command: {{ selectedScript.title }}
            </h3>
            <p class="text-[10px] text-slate-400 font-bold uppercase">
              Departmental Handshake: Arts (#6) + Education (#4)
            </p>
          </div>
          <BaseButton
            variant="secondary"
            size="sm"
            icon="lucide:file-down"
            class="text-[10px] font-black uppercase"
            >Download Draft</BaseButton
          >
        </div>

        <textarea
          class="w-full p-6 bg-white border border-slate-100 rounded-3xl text-xs italic outline-none focus:border-maedot-gold transition-all shadow-inner"
          rows="4"
          placeholder="Add theological corrections or performance notes here..."
        ></textarea>

        <div class="mt-6 flex gap-3">
          <BaseButton
            variant="primary"
            size="sm"
            icon="lucide:check-circle"
            @click="approveScript(selectedScript)"
          >
            Approve for Performance
          </BaseButton>
          <BaseButton
            variant="ghost"
            size="sm"
            class="text-rose-600 font-black text-[10px] uppercase"
          >
            Send Back for Revision
          </BaseButton>
        </div>
      </BaseCard>
    </Transition>

    <!-- SUBMISSION DRAWER -->
    <BaseGovernanceDrawer
      :is-open="isSubmitOpen"
      title="Submit New Literature"
      subtitle="Initial entry into the Dogmatic Review Pipeline"
      action-label="Authorize Submission"
      @close="isSubmitOpen = false"
      @confirm="handleSubmission"
    >
      <div class="space-y-6">
        <BaseInput
          v-model="newScript.title"
          label="Title of Work"
          placeholder="e.g. History of the Apostles Drama"
        />

        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Category</label
          >
          <select
            v-model="newScript.type"
            class="w-full p-4 bg-slate-50 rounded-3xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-maedot-gold"
          >
            <option value="DRAMA">Stage Drama</option>
            <option value="POETRY">Poem / Sinto</option>
            <option value="LITERATURE">Article / Essay</option>
            <option value="PROGRAM">Program Script</option>
          </select>
        </div>

        <div
          class="p-6 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center bg-slate-50"
        >
          <Icon
            name="lucide:upload-cloud"
            class="w-8 h-8 text-slate-300 mb-2"
          />
          <p class="text-[10px] font-black text-slate-400 uppercase">
            Attach Word/PDF Document
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
