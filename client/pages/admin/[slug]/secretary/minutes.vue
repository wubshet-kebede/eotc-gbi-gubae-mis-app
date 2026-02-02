<script setup>
definePageMeta({ layout: "admin" });

const minutesContent = ref("");
const sessionTasks = ref([]);
const newTask = reactive({ dept: "Finance", desc: "" });

const leaders = ref([
  { id: 1, dept: "Finance", present: true },
  { id: 2, dept: "Education", present: true },
  { id: 3, dept: "Audit", present: true },
]);

const addTask = () => {
  if (newTask.desc) {
    sessionTasks.value.push({ ...newTask });
    newTask.desc = "";
  }
};

const saveMinutes = () => {
  alert("Senate Minutes Sealed. Tasks pushed to Department Dashboards.");
};
</script>
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-black text-maedot-navy uppercase">
        Senate Minutes Recorder
      </h1>
      <BaseButton variant="primary" icon="lucide:save" @click="saveMinutes"
        >Finalize & Lock</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Attendance & Agenda -->
      <div class="lg:col-span-1 space-y-6">
        <BaseCard title="Senate Attendance">
          <div class="space-y-3">
            <div
              v-for="leader in leaders"
              :key="leader.id"
              class="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span class="text-sm font-bold text-slate-700">{{
                leader.dept
              }}</span>
              <input
                type="checkbox"
                v-model="leader.present"
                class="rounded text-maedot-gold focus:ring-maedot-gold"
              />
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Right: Content & Tasks -->
      <div class="lg:col-span-2 space-y-6">
        <BaseCard title="Meeting Discussion">
          <textarea
            v-model="minutesContent"
            rows="10"
            class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-maedot-gold text-sm"
            placeholder="Type meeting decisions here..."
          ></textarea>
        </BaseCard>

        <!-- Task Creator (Ref #3: Minutes to Tasks) -->
        <BaseCard title="Assign Action Items">
          <div class="flex gap-3 mb-4">
            <select
              v-model="newTask.dept"
              class="p-2 border rounded-xl text-xs bg-slate-50"
            >
              <option v-for="l in leaders" :key="l.id" :value="l.dept">
                {{ l.dept }}
              </option>
            </select>
            <input
              v-model="newTask.desc"
              type="text"
              placeholder="What needs to be done?"
              class="flex-grow p-2 border rounded-xl text-xs"
            />
            <BaseButton variant="secondary" size="sm" @click="addTask"
              >Assign</BaseButton
            >
          </div>

          <div class="space-y-2">
            <div
              v-for="(t, i) in sessionTasks"
              :key="i"
              class="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100"
            >
              <span class="text-xs font-bold text-maedot-navy uppercase">{{
                t.dept
              }}</span>
              <span class="text-xs text-slate-600">{{ t.desc }}</span>
              <Icon
                name="lucide:check-circle"
                class="text-emerald-500 w-4 h-4"
              />
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
