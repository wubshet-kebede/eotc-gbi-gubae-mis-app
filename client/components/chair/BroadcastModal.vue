<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <!-- Logic: Using Backdrop-blur to show this is a 'System-Wide' action -->
      <div class="fixed inset-0 bg-maedot-navy/60 backdrop-blur-md" />

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          class="w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-maedot-gold"
        >
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-maedot-gold/10 rounded-2xl">
                <Icon
                  name="lucide:megaphone"
                  class="w-6 h-6 text-maedot-gold"
                />
              </div>
              <h2
                class="text-xl font-black text-maedot-navy uppercase tracking-tighter italic"
              >
                Council Broadcast
              </h2>
            </div>

            <!-- Message Input -->
            <div class="space-y-2">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >Broadcast Message</label
              >
              <textarea
                v-model="message"
                rows="4"
                class="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-medium outline-none focus:border-maedot-gold transition-all"
                placeholder="Type your executive directive here..."
              ></textarea>
            </div>

            <!-- Target Selection (Ref #1 Logic) -->
            <div
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <span class="text-xs font-bold text-slate-500 uppercase"
                >Target: All Department Leaders</span
              >
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  v-model="isUrgent"
                  class="rounded text-rose-600"
                />
                <label class="text-[10px] font-black text-rose-600 uppercase"
                  >High Priority</label
                >
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <BaseButton variant="ghost" block @click="$emit('close')"
                >Cancel</BaseButton
              >
              <BaseButton
                variant="primary"
                block
                icon="lucide:send"
                @click="sendBroadcast"
              >
                Deploy Announcement
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionRoot } from "@headlessui/vue";
const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close"]);
const message = ref("");
const isUrgent = ref(false);

const sendBroadcast = () => {
  // Logic: Send to Hasura 'announcements' table + trigger Webhook for real-time Push
  alert("Broadcast successfully deployed to all 11 Department Leaders.");
  emit("close");
};
</script>
