<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-maedot-navy/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-t-8 border-maedot-gold"
          >
            <div class="space-y-6">
              <!-- Header -->
              <div class="text-center">
                <h3
                  class="text-lg font-black text-maedot-navy uppercase tracking-tighter"
                >
                  Appoint {{ slotTitle }}
                </h3>
                <p class="text-xs text-slate-500 italic mt-1">
                  Promote an existing member to this leadership role.
                </p>
              </div>

              <!-- 1. SEARCH INPUT (Ref #3 Member Directory Link) -->
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >Find Member (Name or Phone)</label
                >
                <BaseInput
                  v-model="form.memberName"
                  placeholder="Search Guba Directory..."
                  icon="lucide:search"
                />
              </div>

              <!-- 2. UPLOAD FIELD (Ref #1 Digital Appointment Letter) -->
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >Official Appointment Scan (PDF)</label
                >
                <div
                  class="p-6 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Icon
                    name="lucide:upload-cloud"
                    class="w-8 h-8 text-maedot-gold mb-2"
                  />
                  <p class="text-[10px] font-bold text-slate-400 uppercase">
                    Click to attach official letter
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="pt-4 flex gap-3">
                <BaseButton variant="ghost" block @click="$emit('close')"
                  >Cancel</BaseButton
                >
                <BaseButton
                  variant="primary"
                  block
                  icon="lucide:send"
                  @click="handleConfirm"
                >
                  Appoint & Notify
                </BaseButton>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
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

const props = defineProps({
  isOpen: Boolean,
  slotTitle: String, // e.g. "Finance Head"
});

const emit = defineEmits(["close", "confirm"]);

const form = reactive({
  memberName: "",
  file: null,
});

const handleConfirm = () => {
  // Pass the data back to the parent to trigger the Email/Hasura Logic
  emit("confirm", { ...form });
  emit("close");
};
</script>
