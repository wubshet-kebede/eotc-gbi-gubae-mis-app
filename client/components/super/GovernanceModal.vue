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
        <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
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
            class="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-t-8"
            :class="config.borderColor"
          >
            <div class="text-center space-y-4">
              <div
                class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-slate-50"
              >
                <Icon
                  :name="config.icon"
                  class="w-8 h-8"
                  :class="config.iconColor"
                />
              </div>

              <DialogTitle
                as="h3"
                class="text-xl font-black text-slate-900 uppercase tracking-tighter"
              >
                {{ config.title }}
              </DialogTitle>

              <p class="text-sm text-slate-500 italic leading-relaxed">
                {{ config.description }}
              </p>
            </div>

            <div class="mt-8 flex gap-3">
              <BaseButton variant="ghost" block @click="$emit('close')"
                >Cancel</BaseButton
              >
              <BaseButton
                :variant="config.btnVariant"
                block
                @click="$emit('confirm')"
              >
                {{ config.confirmText }}
              </BaseButton>
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
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: Boolean,
  actionType: String, // 'archive', 'suspend', 'inspect'
  orgName: String,
});

const emit = defineEmits(["close", "confirm"]);

// Logic: Centralizing the "Personality" of the modal
const config = computed(() => {
  const types = {
    archive: {
      title: `Archive ${props.orgName}?`,
      description:
        "This will seal all current year records and set the organization to Read-Only mode for Alumni access.",
      icon: "lucide:archive",
      borderColor: "border-maedot-gold",
      iconColor: "text-maedot-gold",
      btnVariant: "secondary",
      confirmText: "Seal & Archive",
    },
    suspend: {
      title: `Suspend ${props.orgName}?`,
      description:
        "Immediate lockdown. This will revoke access for all 12 leaders until you manually lift the suspension.",
      icon: "lucide:shield-ban",
      borderColor: "border-rose-600",
      iconColor: "text-rose-600",
      btnVariant: "primary",
      confirmText: "Confirm Suspension",
    },
    inspect: {
      title: `Inspect ${props.orgName}?`,
      description:
        "Entering Technical Oversight mode. You will view the dashboard exactly as the leader sees it (Read-Only).",
      icon: "lucide:search-code",
      borderColor: "border-slate-900",
      iconColor: "text-slate-900",
      btnVariant: "primary",
      confirmText: "Begin Inspection",
    },
  };
  return types[props.actionType] || types.inspect;
});
</script>
