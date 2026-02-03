<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <div
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-slate-900"
                >
                  <!-- Header -->
                  <div class="bg-slate-900 px-6 py-8 text-white">
                    <div class="flex items-center justify-between">
                      <h2 class="text-xl font-black uppercase tracking-tighter">
                        Credential Verification
                      </h2>
                      <button
                        @click="$emit('close')"
                        class="text-slate-400 hover:text-white"
                      >
                        <Icon name="lucide:x" class="w-6 h-6" />
                      </button>
                    </div>
                    <p
                      class="mt-2 text-xs text-maedot-gold font-black uppercase"
                    >
                      Official Recommendation Letter
                    </p>
                  </div>

                  <div class="flex-grow overflow-y-auto p-8 space-y-8">
                    <!-- User Profile Info -->
                    <div
                      class="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100"
                    >
                      <div
                        class="w-16 h-16 rounded-2xl bg-maedot-gold flex items-center justify-center text-slate-900 text-2xl font-black shadow-lg"
                      >
                        {{ user?.name.charAt(0) }}
                      </div>
                      <div>
                        <h4 class="text-lg font-black text-slate-900">
                          {{ user?.name }}
                        </h4>
                        <p class="text-xs text-slate-500 font-bold uppercase">
                          {{ user?.university }}
                        </p>
                      </div>
                    </div>

                    <!-- PDF PREVIEW AREA (Ref #1 Verification) -->
                    <div class="space-y-3">
                      <h3
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >
                        Document Preview
                      </h3>
                      <div
                        class="aspect-[3/4] w-full bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center"
                      >
                        <Icon
                          name="lucide:file-text"
                          class="w-12 h-12 text-slate-300 mb-2"
                        />
                        <p class="text-xs font-bold text-slate-400 uppercase">
                          Recommendation_Letter.pdf
                        </p>
                        <BaseButton
                          variant="secondary"
                          size="sm"
                          class="mt-4"
                          icon="lucide:external-link"
                          >Open Full PDF</BaseButton
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="p-6 border-t border-slate-100 bg-slate-50">
                    <BaseButton variant="primary" block @click="$emit('close')"
                      >Verified & Done</BaseButton
                    >
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
defineProps({ isOpen: Boolean, user: Object });
defineEmits(["close"]);
</script>
