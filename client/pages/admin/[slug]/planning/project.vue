<script setup>
/**
 * CAPITAL PROJECT TRACKER (Ref #2 & #8)
 * Logic: Milestone Management, Budget Locking, and Talent Matching
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;

// --- STATE ---
const isNewProjectOpen = ref(false);
const selectedProject = ref(null);

const projects = ref([
  {
    id: 1,
    title: "Guba Office Renovation",
    lead: "Eng. Henok G.",
    budget: "45,000 ETB",
    status: "ON_TRACK",
    progress: 65,
    type: "CAPITAL",
    deadline: "Dec 30, 2018 E.C",
  },
  {
    id: 2,
    title: "Annual Meskel Festival",
    lead: "Dn. Muse T.",
    budget: "120,000 ETB",
    status: "DELAYED",
    progress: 30,
    type: "EVENT",
    deadline: "Sept 17, 2018 E.C",
  },
]);

// --- LOGIC ---
const openProjectDetail = (project) => {
  selectedProject.value = project;
  // Logic: In production, fetch the specific Phase Breakdown from the DB
};

const handleProjectCreate = () => {
  alert(
    "New Strategic Project Initialized. Budget Reservation Request sent to Finance Head (#8).",
  );
  isNewProjectOpen.value = false;
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
          Strategic Projects
        </h1>
        <p
          class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none italic"
        >
          Capital Investments & Event Logistics Management
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:plus-circle"
        @click="isNewProjectOpen = true"
      >
        Initialize Project
      </BaseButton>
    </div>

    <!-- Project Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BaseCard
        v-for="project in projects"
        :key="project.id"
        @click="openProjectDetail(project)"
        class="cursor-pointer transition-all duration-300 hover:shadow-xl border-l-8"
        :class="
          project.status === 'ON_TRACK'
            ? 'border-l-emerald-500'
            : 'border-l-rose-500'
        "
      >
        <div class="space-y-5">
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <span
                class="text-[9px] font-black px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest"
              >
                {{ project.type }}
              </span>
              <h3
                class="text-lg font-black text-maedot-navy uppercase leading-tight"
              >
                {{ project.title }}
              </h3>
            </div>
            <div
              :class="
                project.status === 'ON_TRACK'
                  ? 'text-emerald-600'
                  : 'text-rose-600'
              "
              class="flex items-center gap-1 font-black text-[9px] uppercase"
            >
              <Icon
                :name="
                  project.status === 'ON_TRACK'
                    ? 'lucide:check-circle'
                    : 'lucide:alert-circle'
                "
                class="w-4 h-4"
              />
              {{ project.status.replace("_", " ") }}
            </div>
          </div>

          <!-- Progress Visualization -->
          <div class="space-y-2">
            <div
              class="flex justify-between text-[10px] font-black uppercase text-slate-400"
            >
              <span>Overall Completion</span>
              <span>{{ project.progress }}%</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-1000"
                :class="
                  project.status === 'ON_TRACK'
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                "
                :style="{ width: project.progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-50 grid grid-cols-2 gap-4">
            <div>
              <p class="text-[9px] font-black text-slate-400 uppercase">
                Project Lead
              </p>
              <p class="text-xs font-bold text-maedot-navy">
                {{ project.lead }}
              </p>
            </div>
            <div>
              <p class="text-[9px] font-black text-slate-400 uppercase">
                Reserved Budget
              </p>
              <p class="text-xs font-bold text-maedot-navy">
                {{ project.budget }}
              </p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- INITIALIZE PROJECT DRAWER -->
    <BaseGovernanceDrawer
      :is-open="isNewProjectOpen"
      title="Initialize New Project"
      subtitle="Strategic Capital & Event Setup"
      action-label="Authorize Project"
      @close="isNewProjectOpen = false"
      @confirm="handleProjectCreate"
    >
      <div class="space-y-6">
        <BaseInput
          label="Project Title"
          placeholder="e.g. New Sound System Purchase"
          icon="lucide:rocket"
        />

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase"
              >Project Category</label
            >
            <select
              class="w-full p-4 bg-slate-50 rounded-3xl text-xs font-bold border-none outline-none"
            >
              <option>Construction/Renovation</option>
              <option>Major Event/Festival</option>
              <option>Asset Acquisition</option>
            </select>
          </div>
          <BaseInput
            label="Estimated Budget"
            type="number"
            placeholder="ETB"
            icon="lucide:banknote"
          />
        </div>

        <div class="space-y-2">
          <label
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >Lead Assignment</label
          >
          <div
            class="p-4 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center"
          >
            <Icon name="lucide:user-plus" class="text-slate-300 w-8 h-8 mb-2" />
            <p class="text-[10px] font-black text-slate-400 uppercase">
              Select from [Member Care #5] Skill Registry
            </p>
          </div>
        </div>

        <BaseInput
          label="Completion Deadline"
          type="date"
          icon="lucide:calendar"
        />
      </div>
    </BaseGovernanceDrawer>

    <!-- PROJECT DETAIL MODAL (Phase Control) -->
    <BaseGovernanceDrawer
      v-if="selectedProject"
      :is-open="!!selectedProject"
      :title="selectedProject.title"
      @close="selectedProject = null"
    >
      <div class="space-y-6 py-2">
        <div class="p-5 bg-maedot-navy rounded-3xl text-white">
          <p class="text-[10px] font-black text-maedot-gold uppercase mb-1">
            Current Milestone
          </p>
          <p class="text-sm font-bold leading-relaxed italic">
            "Phase 2: Procurement of materials for the Guba office renovation."
          </p>
        </div>

        <div class="space-y-3">
          <BaseButton block variant="primary" icon="lucide:check-circle"
            >Mark Phase as Complete</BaseButton
          >
          <BaseButton
            block
            variant="secondary"
            icon="lucide:alert-triangle"
            class="text-rose-500 border-rose-500/20"
            >Flag as Delayed</BaseButton
          >
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
