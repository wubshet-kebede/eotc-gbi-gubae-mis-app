<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden justify-center">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 left-10 flex max-w-full pl-10 justify-center"
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
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-maedot-gold"
                >
                  <!-- Header -->
                  <div class="bg-slate-900 px-6 py-8 text-white">
                    <div class="flex items-center justify-between">
                      <h2 class="text-xl font-black uppercase tracking-tighter">
                        System Inspection
                      </h2>
                      <button
                        @click="$emit('close')"
                        class="text-slate-400 hover:text-white"
                      >
                        <Icon name="lucide:x" class="w-6 h-6" />
                      </button>
                    </div>
                    <div class="mt-4 flex items-center gap-3" v-if="guba">
                      <div
                        class="w-10 h-10 rounded-full bg-maedot-gold flex items-center justify-center font-black text-slate-900"
                      >
                        {{ guba.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="text-sm font-bold">{{ guba.name }}</p>
                        <p
                          class="text-[10px] text-maedot-gold font-black uppercase tracking-widest"
                        >
                          {{ guba.city }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-6 space-y-8 flex-grow">
                    <slot />
                    <!-- This allows you to put any debug info here later -->
                  </div>

                  <!-- Action Footer -->
                  <div class="p-6 border-t border-slate-100 bg-slate-50">
                    <BaseButton variant="primary" block @click="$emit('close')"
                      >Close Inspection</BaseButton
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

defineProps({
  isOpen: Boolean,
  guba: Object,
});

defineEmits(["close"]);
</script>
