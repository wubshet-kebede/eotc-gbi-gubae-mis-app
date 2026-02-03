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
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <div
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-maedot-gold"
                >
                  <!-- Drawer Header -->
                  <div class="bg-maedot-navy p-8 text-white">
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl font-black uppercase tracking-tighter">
                        Governance Review
                      </h2>
                      <button
                        @click="$emit('close')"
                        class="text-slate-400 hover:text-white"
                      >
                        <Icon name="lucide:x" class="w-6 h-6" />
                      </button>
                    </div>
                    <p
                      class="text-xs text-maedot-gold font-bold uppercase mt-2"
                    >
                      Source: {{ item?.source }} Department
                    </p>
                  </div>

                  <!-- Side-by-Side Content -->
                  <div class="flex-grow flex overflow-hidden">
                    <!-- 1. DOCUMENT PREVIEW (The Proof) -->
                    <div
                      class="w-1/2 bg-slate-50 border-r border-slate-100 p-6 overflow-y-auto"
                    >
                      <p
                        class="text-[10px] font-black text-slate-400 uppercase mb-4"
                      >
                        Verification Document
                      </p>
                      <div
                        class="aspect-[3/4] bg-white rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-4"
                      >
                        <!-- Integration: Cloudinary/S3 PDF Viewer -->
                        <Icon
                          name="lucide:file-text"
                          class="w-12 h-12 text-slate-200"
                        />
                      </div>
                    </div>

                    <!-- 2. DATA DETAILS (The Context) -->
                    <div class="w-1/2 p-6 space-y-6 overflow-y-auto">
                      <div class="space-y-4">
                        <div
                          v-for="(val, key) in itemDetails"
                          :key="key"
                          class="border-b pb-2"
                        >
                          <p
                            class="text-[9px] font-black text-slate-400 uppercase"
                          >
                            {{ key }}
                          </p>
                          <p class="text-sm font-bold text-maedot-navy">
                            {{ val }}
                          </p>
                        </div>
                      </div>

                      <div class="space-y-2 pt-4">
                        <label
                          class="text-[10px] font-black text-slate-400 uppercase"
                          >Reviewer Comment</label
                        >
                        <textarea
                          class="w-full p-3 bg-slate-50 border rounded-xl text-xs italic"
                          rows="3"
                          placeholder="Add notes for rejection..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- ACTION FOOTER -->
                  <div class="p-6 bg-slate-50 border-t flex gap-3">
                    <BaseButton
                      variant="ghost"
                      block
                      class="text-rose-600"
                      @click="handleReject"
                      >Reject</BaseButton
                    >
                    <BaseButton
                      variant="primary"
                      block
                      icon="lucide:pen-tool"
                      @click="handleApprove"
                      >Sign & Approve</BaseButton
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
const props = defineProps({ isOpen: Boolean, item: Object });
const emit = defineEmits(["close", "approved", "rejected"]);

const itemDetails = computed(() => ({
  "Request Item": props.item?.item,
  Amount: props.item?.amount ? props.item.amount + " ETB" : "N/A",
  "Submitted Date": props.item?.date,
  "Compliance Check": "Verified by Audit #12",
}));

const handleApprove = () => {
  // Logic: Trigger a PIN verification then update Hasura
  emit("approved", props.item.id);
  emit("close");
};
</script>
