<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition duration-500"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition duration-500"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-emerald-600"
                >
                  <!-- Header -->
                  <div class="bg-emerald-600 p-8 text-white">
                    <h2
                      class="text-xl font-black uppercase tracking-tighter italic"
                    >
                      Bi-Weekly "Si-so" Report
                    </h2>
                    <p
                      class="text-[10px] font-black uppercase text-emerald-100 mt-2"
                    >
                      Cycle: Oct 15 - Oct 30, 2018 E.C.
                    </p>
                  </div>

                  <!-- Data Summary (Ref #11 BI Logic) -->
                  <div class="flex-grow p-8 space-y-8 overflow-y-auto">
                    <section class="space-y-3">
                      <h3
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >
                        Auto-Aggregated Metrics
                      </h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div class="p-3 bg-slate-50 rounded-2xl">
                          <p
                            class="text-[9px] text-slate-400 font-bold uppercase"
                          >
                            Net Revenue
                          </p>
                          <p class="text-sm font-black text-emerald-600">
                            +4,500 ETB
                          </p>
                        </div>
                        <div class="p-3 bg-slate-50 rounded-2xl">
                          <p
                            class="text-[9px] text-slate-400 font-bold uppercase"
                          >
                            Abinet Attendance
                          </p>
                          <p class="text-sm font-black text-slate-900">88.4%</p>
                        </div>
                      </div>
                    </section>

                    <!-- Personal Commentary -->
                    <div class="space-y-2">
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase"
                        >Chairperson's Narrative</label
                      >
                      <textarea
                        v-model="comment"
                        rows="4"
                        class="w-full p-4 bg-slate-50 border rounded-2xl text-xs italic outline-none"
                        placeholder="How is the spiritual health of the Guba? Any challenges with the University?"
                      ></textarea>
                    </div>

                    <!-- Voice Note Integration (Proactive Request) -->
                    <div
                      class="p-4 bg-maedot-navy rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                      <div class="flex items-center gap-3">
                        <Icon
                          name="lucide:mic"
                          class="w-5 h-5 text-maedot-gold"
                        />
                        <span
                          class="text-[10px] font-black text-white uppercase"
                          >Attach Spiritual Voice Note</span
                        >
                      </div>
                      <Icon
                        name="lucide:plus-circle"
                        class="w-4 h-4 text-slate-500"
                      />
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="p-6 bg-slate-50 border-t flex gap-3">
                    <BaseButton variant="ghost" block @click="$emit('close')"
                      >Cancel</BaseButton
                    >
                    <BaseButton
                      variant="primary"
                      block
                      icon="lucide:send"
                      class="bg-emerald-600 border-none"
                      @click="submitReport"
                    >
                      Seal & Send to Ma'ekel
                    </BaseButton>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
defineProps({ isOpen: Boolean });
const emit = defineEmits(["close"]);
const comment = ref("");

const submitReport = () => {
  // Logic: Post to 'public.bi_weekly_reports' in Hasura
  alert("Report successfully sealed and broadcasted to Ma'ekel.");
  emit("close");
};
</script>
