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
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-slate-900"
                >
                  <!-- Drawer Header -->
                  <div class="bg-slate-900 px-6 py-8 text-white">
                    <div class="flex items-center justify-between">
                      <h2 class="text-xl font-black uppercase tracking-tighter">
                        Add New Territory
                      </h2>
                      <button
                        @click="$emit('close')"
                        class="text-slate-400 hover:text-white transition-colors"
                      >
                        <Icon name="lucide:x" class="w-6 h-6" />
                      </button>
                    </div>
                    <p
                      class="mt-2 text-xs text-slate-400 font-bold uppercase tracking-widest"
                    >
                      Registering City & Diocese
                    </p>
                  </div>

                  <!-- Form Content -->
                  <div class="p-8 space-y-6 flex-grow overflow-y-auto">
                    <BaseInput
                      v-model="form.name"
                      label="City Name"
                      placeholder="e.g. Hawassa"
                      icon="lucide:map-pin"
                    />
                    <BaseInput
                      v-model="form.diocese"
                      label="Diocese Name"
                      placeholder="e.g. Sidama Diocese"
                      icon="lucide:landmark"
                    />

                    <div
                      class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
                    >
                      <p
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >
                        Visibility Settings
                      </p>
                      <div class="flex items-center justify-between">
                        <label class="text-xs font-bold text-slate-700"
                          >Show on Landing Page</label
                        >
                        <input
                          type="checkbox"
                          v-model="form.isPublic"
                          class="rounded text-maedot-gold focus:ring-maedot-gold"
                        />
                      </div>
                      <p class="text-[9px] text-slate-400 italic">
                        When enabled, new Gubaes in this city can register on
                        the public portal.
                      </p>
                    </div>
                  </div>

                  <!-- Action Footer -->
                  <div
                    class="p-6 border-t border-slate-100 bg-slate-50 flex gap-3"
                  >
                    <BaseButton variant="ghost" block @click="$emit('close')"
                      >Cancel</BaseButton
                    >
                    <BaseButton
                      variant="primary"
                      block
                      @click="$emit('save', form)"
                      >Save Territory</BaseButton
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

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "save"]);

const form = reactive({
  name: "",
  diocese: "",
  isPublic: true,
});
</script>
