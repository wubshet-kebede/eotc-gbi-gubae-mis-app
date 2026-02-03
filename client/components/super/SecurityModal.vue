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
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
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
                {{ config.description }} <strong>{{ userName }}</strong
                >.
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
                {{ config.btnText }}
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
  actionType: String, // 'reset', 'ban', 'promote'
  userName: String,
});

const config = computed(() => {
  const settings = {
    reset: {
      title: "Reset Master PIN",
      description: "You are about to generate a temporary security PIN for",
      icon: "lucide:key-round",
      borderColor: "border-maedot-gold",
      iconColor: "text-maedot-gold",
      btnVariant: "secondary",
      btnText: "Send New PIN",
    },
    ban: {
      title: "Global User Ban",
      description: "This will immediately revoke all platform access for",
      icon: "lucide:user-x",
      borderColor: "border-rose-600",
      iconColor: "text-rose-600",
      btnVariant: "primary", // Red button
      btnText: "Confirm Ban",
    },
  };
  return settings[props.actionType] || settings.reset;
});
</script>
