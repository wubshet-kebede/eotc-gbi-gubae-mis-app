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
              <DialogPanel class="pointer-events-auto w-screen max-w-4xl">
                <!-- Wide for Side-by-Side -->
                <div
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-maedot-gold"
                >
                  <div class="flex flex-grow overflow-hidden">
                    <!-- LEFT: PDF PREVIEW (Ref #1 Verification) -->
                    <div
                      class="w-3/5 bg-slate-100 border-r border-slate-200 overflow-y-auto p-4"
                    >
                      <div
                        class="h-full w-full rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center space-y-4"
                      >
                        <Icon
                          name="lucide:file-text"
                          class="w-16 h-16 text-slate-300"
                        />
                        <p
                          class="text-sm font-bold text-slate-500 uppercase tracking-widest"
                        >
                          Recommendation Letter Preview
                        </p>
                        <BaseButton variant="secondary" size="sm"
                          >Open in New Tab</BaseButton
                        >
                      </div>
                    </div>

                    <!-- RIGHT: APPROVAL FORM (Task #1 Logic) -->
                    <div
                      class="w-2/5 p-8 flex flex-col space-y-6 overflow-y-auto"
                    >
                      <div class="flex justify-between items-start">
                        <h2
                          class="text-xl font-black text-slate-900 uppercase tracking-tighter"
                        >
                          Review Application
                        </h2>
                        <button
                          @click="$emit('close')"
                          class="text-slate-400 hover:text-slate-900"
                        >
                          <Icon name="lucide:x" class="w-6 h-6" />
                        </button>
                      </div>

                      <div
                        class="space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <p
                          class="text-xs font-black text-maedot-gold uppercase"
                        >
                          Gubae Information
                        </p>
                        <div>
                          <p class="text-sm font-bold text-slate-900">
                            {{ request?.name }}
                          </p>
                          <p class="text-xs text-slate-500">
                            {{ request?.university }}
                          </p>
                        </div>
                      </div>

                      <div class="space-y-4">
                        <label
                          class="text-xs font-black text-slate-400 uppercase tracking-widest"
                          >Feedback/Comments</label
                        >
                        <textarea
                          v-model="comment"
                          rows="4"
                          class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-maedot-gold text-sm italic"
                          placeholder="Add a reason for rejection or special notes for approval..."
                        ></textarea>
                      </div>

                      <div class="mt-auto space-y-3">
                        <BaseButton
                          variant="primary"
                          block
                          icon="lucide:check-circle"
                          @click="$emit('approve', { id: request.id, comment })"
                          >Approve Organization</BaseButton
                        >
                        <BaseButton
                          variant="ghost"
                          block
                          class="text-rose-600 hover:bg-rose-50"
                          @click="$emit('reject', { id: request.id, comment })"
                          >Reject Application</BaseButton
                        >
                      </div>
                    </div>
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
const props = defineProps({ isOpen: Boolean, request: Object });
const emit = defineEmits(["close", "approve", "reject"]);
const comment = ref("");
</script>
