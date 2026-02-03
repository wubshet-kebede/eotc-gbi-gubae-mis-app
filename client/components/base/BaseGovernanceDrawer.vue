<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <!-- Standard Backdrop for all Drawers -->
      <TransitionChild
        as="template"
        enter="duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-maedot-navy/40 backdrop-blur-sm" />
      </TransitionChild>

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
                  class="flex h-full flex-col bg-white shadow-2xl"
                  :class="themeBorder"
                >
                  <!-- DYNAMIC HEADER -->
                  <div class="p-8 text-white" :class="themeBg">
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl font-black uppercase tracking-tighter">
                        {{ title }}
                      </h2>
                      <button
                        @click="$emit('close')"
                        class="text-white/60 hover:text-white"
                      >
                        <Icon name="lucide:x" class="w-6 h-6" />
                      </button>
                    </div>
                    <p
                      class="text-[10px] font-black uppercase tracking-widest mt-2 opacity-80"
                    >
                      {{ subtitle }}
                    </p>
                  </div>

                  <!-- THE "SLOT": This is where the specific Task Form goes -->
                  <div class="flex-grow p-8 overflow-y-auto">
                    <slot />
                  </div>

                  <!-- DYNAMIC FOOTER -->
                  <!-- <div class="p-6 bg-slate-50 border-t flex gap-3">
                    <BaseButton variant="ghost" block @click="$emit('close')"
                      >Cancel</BaseButton
                    >
                    <BaseButton
                      variant="primary"
                      block
                      :icon="actionIcon"
                      @click="$emit('confirm')"
                    >
                      {{ actionLabel }}
                    </BaseButton>
                  </div> -->
                  <div v-if="!isRejecting" class="flex gap-3">
                    <BaseButton
                      variant="ghost"
                      block
                      class="text-rose-600"
                      @click="isRejecting = true"
                    >
                      Reject Request
                    </BaseButton>
                    <BaseButton
                      variant="primary"
                      block
                      :icon="actionIcon"
                      @click="$emit('confirm')"
                    >
                      {{ actionLabel }}
                    </BaseButton>
                  </div>
                  <!-- THE REJECTION FORM (Appears when 'Reject' is clicked) -->
                  <div v-else class="space-y-4 animate-slide-up">
                    <div
                      class="p-4 bg-rose-50 rounded-2xl border border-rose-100"
                    >
                      <label
                        class="text-[10px] font-black text-rose-600 uppercase"
                        >Reason for Rejection</label
                      >
                      <textarea
                        v-model="rejectionNote"
                        rows="3"
                        class="w-full mt-2 p-3 bg-white border rounded-xl text-xs italic outline-none focus:border-rose-500"
                        placeholder="e.g. Missing official stamp from the vendor..."
                      ></textarea>
                    </div>

                    <div class="flex gap-2">
                      <BaseButton
                        variant="ghost"
                        size="sm"
                        @click="isRejecting = false"
                        >Back</BaseButton
                      >
                      <BaseButton
                        variant="primary"
                        block
                        class="bg-rose-600 border-none"
                        @click="confirmRejection"
                      >
                        Confirm Rejection & Notify Dept
                      </BaseButton>
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

defineProps({
  isOpen: Boolean,
  title: String,
  subtitle: String,
  actionLabel: String,
  actionIcon: String,
  themeBg: { type: String, default: "bg-maedot-navy" }, // e.g. bg-emerald-600 for reports
  themeBorder: { type: String, default: "border-l-4 border-maedot-gold" },
});

defineEmits(["close", "confirm"]);
</script>
