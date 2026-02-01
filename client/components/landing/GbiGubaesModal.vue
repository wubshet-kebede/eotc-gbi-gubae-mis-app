<script setup>
const props = defineProps({
  isOpen: Boolean,
  cityName: String,
});

defineEmits(["close"]);

// Mock Data for Gondar (This will be a Hasura fetch later)
const gbiGubaes = [
  { name: "Fasil Gbi Gubae", campus: "Maraki Campus", slug: "fasil" },
  { name: "Atse Tewodros Gbi Gubae", campus: "Main Campus", slug: "tewodros" },
  { name: "GC Gbi Gubae", campus: "Medicine Campus", slug: "gc" },
  { name: "Tseda Gbi Gubae", campus: "Agriculture Campus", slug: "tseda" },
];

const goToLogin = (slug) => {
  // Redirect to the specific login page we planned
  navigateTo(`/login/${slug}`);
};
</script>
<template>
  <!-- Using the 'Headless' prefix as configured -->
  <HeadlessTransitionRoot :show="isOpen" as="template">
    <HeadlessDialog as="div" @close="$emit('close')" class="relative z-50">
      <!-- 1. Backdrop (The "Blur" effect) -->
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-maedot-navy/60 backdrop-blur-sm"
          aria-hidden="true"
        />
      </HeadlessTransitionChild>

      <!-- 2. Modal Position -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border-t-4 border-maedot-gold"
            >
              <!-- Modal Header -->
              <div class="flex justify-between items-center mb-6">
                <HeadlessDialogTitle class="text-xl font-bold text-maedot-navy">
                  {{ cityName }} Associations
                </HeadlessDialogTitle>
                <button
                  @click="$emit('close')"
                  class="p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <Icon name="lucide:x" class="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <!-- 3. Organization List (Ref #10 Master Directory) -->
              <div
                class="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar"
              >
                <div
                  v-for="gbi in gbiGubaes"
                  :key="gbi.slug"
                  @click="goToLogin(gbi.slug)"
                  class="group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-maedot-gold hover:bg-maedot-gold/5 cursor-pointer transition-all"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors"
                    >
                      <Icon
                        name="lucide:church"
                        class="text-maedot-navy group-hover:text-maedot-gold w-6 h-6"
                      />
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 leading-tight">
                        {{ gbi.name }}
                      </h4>
                      <p class="text-xs text-slate-500 mt-0.5">
                        {{ gbi.campus }}
                      </p>
                    </div>
                  </div>
                  <Icon
                    name="lucide:arrow-right"
                    class="w-5 h-5 text-slate-300 group-hover:text-maedot-gold group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>

              <!-- Footer Note -->
              <p class="mt-6 text-center text-xs text-slate-400">
                Don't see your Gbi Gubae?
                <NuxtLink
                  to="/contact"
                  class="text-maedot-navy font-bold hover:underline"
                  >Contact Ma'ekel</NuxtLink
                >
              </p>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
