<script setup>
/**
 * EXTERNAL RELATIONS & DIPLOMACY (Ref #1 & #2)
 * Tasks: University Liaison, Church Reporting, and Executive Delegation
 */
definePageMeta({ layout: "admin" });

const route = useRoute();
const slug = route.params.slug;
const isConsultationOpen = ref(false);

// TASK: Tracking Interactions with External Entities
const externalTimeline = ref([
  {
    id: 1,
    entity: "University Administration",
    subject: "Hall Reservation: Graduation Feast",
    status: "APPROVED",
    date: "2 days ago",
    icon: "lucide:building-2",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    entity: "EOTC Ma'ekel (Center)",
    subject: "Quarterly Spiritual Progress Report",
    status: "SENT",
    date: "5 days ago",
    icon: "lucide:church",
    color: "bg-maedot-gold",
  },
  {
    id: 3,
    entity: "Local Diocese (Hagere Sibket)",
    subject: "Letter of Support for Annual Bazaar",
    status: "AWAITING STAMP",
    date: "1 week ago",
    icon: "lucide:scroll",
    color: "bg-slate-400",
  },
]);

// TASK: Pushing Work to Vice-Chair (Ref #2 Proxy)
const delegatedTasks = ref([
  {
    id: 101,
    title: "Meet with Campus Security Head",
    due: "Tomorrow",
    priority: "High",
  },
  {
    id: 102,
    title: "Draft Response to Ma'ekel Directive",
    due: "In 3 Days",
    priority: "Normal",
  },
]);

const handleLogConsultation = () => {
  isConsultationOpen.value = true;
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 1. DIPLOMATIC HEADER -->
    <div
      class="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div class="space-y-1">
        <h1
          class="text-2xl font-black text-maedot-navy uppercase tracking-tighter"
        >
          External Diplomacy
        </h1>
        <p
          class="text-xs text-slate-500 font-bold uppercase tracking-widest italic"
        >
          Liaison with University & Church Hierarchy
        </p>
      </div>
      <BaseButton
        variant="primary"
        icon="lucide:file-plus"
        @click="handleLogConsultation"
      >
        New Diplomatic Record
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 2. INTERACTION TIMELINE (Ref #1 Logic) -->
      <div class="xl:col-span-8">
        <BaseCard
          title="Interaction History"
          subtitle="Chronological log of external communications"
        >
          <div class="mt-8 space-y-8">
            <div
              v-for="log in externalTimeline"
              :key="log.id"
              class="relative pl-10"
            >
              <!-- Vertical Line -->
              <div
                class="absolute left-4 top-1 w-[2px] h-full bg-slate-100 last:h-0"
              ></div>
              <!-- Icon Indicator -->
              <div
                :class="log.color"
                class="absolute left-0 top-0 w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200"
              >
                <Icon :name="log.icon" class="w-4 h-4" />
              </div>

              <div
                class="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-maedot-gold transition-colors"
              >
                <div class="flex justify-between items-start mb-2">
                  <span
                    class="text-[10px] font-black text-maedot-gold uppercase tracking-widest"
                    >{{ log.entity }}</span
                  >
                  <span class="text-[10px] font-bold text-slate-400 italic">{{
                    log.date
                  }}</span>
                </div>
                <h4 class="text-sm font-black text-maedot-navy uppercase">
                  {{ log.subject }}
                </h4>
                <div class="mt-4 flex gap-2">
                  <span
                    class="px-2 py-0.5 rounded bg-white border border-slate-200 text-[9px] font-bold uppercase text-slate-500"
                  >
                    Status: {{ log.status }}
                  </span>
                  <BaseButton
                    variant="ghost"
                    size="sm"
                    class="text-[9px] p-0 h-auto"
                    >View Attached Letter</BaseButton
                  >
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- 3. DELEGATION WORKSPACE (Ref #2 Proxy Logic) -->
      <div class="xl:col-span-4 space-y-6">
        <div
          class="p-6 bg-maedot-navy rounded-3xl text-white relative overflow-hidden"
        >
          <Icon
            name="lucide:corner-right-down"
            class="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 text-maedot-gold"
          />
          <h3
            class="text-xs font-black text-maedot-gold uppercase tracking-widest mb-4"
          >
            Task Delegation
          </h3>

          <div class="space-y-4">
            <div
              v-for="task in delegatedTasks"
              :key="task.id"
              class="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div class="flex justify-between items-start mb-1">
                <span
                  class="text-[9px] font-black uppercase"
                  :class="
                    task.priority === 'High'
                      ? 'text-rose-400'
                      : 'text-slate-400'
                  "
                >
                  Due: {{ task.due }}
                </span>
                <Icon
                  name="lucide:user-check"
                  class="w-3 h-3 text-maedot-gold"
                />
              </div>
              <p class="text-xs font-bold text-slate-200 leading-tight">
                {{ task.title }}
              </p>
              <button
                class="mt-3 text-[9px] font-black uppercase text-maedot-gold hover:underline"
              >
                Track Progress
              </button>
            </div>
          </div>

          <BaseButton
            variant="ghost"
            block
            size="sm"
            class="mt-6 border border-white/20 text-white hover:bg-white/10"
          >
            Delegate New Task
          </BaseButton>
        </div>

        <!-- External Support -->
        <BaseCard title="External Contacts" class="bg-slate-50 border-none">
          <div class="space-y-3">
            <div
              class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100"
            >
              <Icon name="lucide:phone" class="w-4 h-4 text-slate-300" />
              <span class="text-xs font-bold text-slate-600"
                >University Dean's Office</span
              >
            </div>
            <div
              class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100"
            >
              <Icon name="lucide:mail" class="w-4 h-4 text-slate-300" />
              <span class="text-xs font-bold text-slate-600"
                >Ma'ekel Reporting Desk</span
              >
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- MODAL: LOG NEW INTERACTION (Reusing Base Drawer) -->
    <BaseGovernanceDrawer
      :is-open="isConsultationOpen"
      title="Log Diplomatic Record"
      subtitle="Filing external communications for institutional memory"
      action-label="Seal & Save Record"
      @close="isConsultationOpen = false"
    >
      <div class="space-y-6">
        <BaseInput
          label="External Entity"
          placeholder="e.g. University Dean"
          icon="lucide:building-2"
        />
        <BaseInput
          label="Subject / Topic"
          placeholder="e.g. Hall Request for Oct 30"
          icon="lucide:scroll"
        />
        <div
          class="p-6 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center bg-slate-50"
        >
          <Icon
            name="lucide:upload-cloud"
            class="w-8 h-8 text-maedot-gold mb-2"
          />
          <p class="text-[10px] font-black text-slate-400 uppercase">
            Upload Scanned Official Letter
          </p>
        </div>
      </div>
    </BaseGovernanceDrawer>
  </div>
</template>
