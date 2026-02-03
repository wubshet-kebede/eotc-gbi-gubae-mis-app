<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
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
                  class="flex h-full flex-col bg-white shadow-2xl border-l-4 border-maedot-gold"
                >
                  <!-- Drawer Header -->
                  <div class="bg-maedot-navy p-8 text-white">
                    <div class="flex justify-between items-center">
                      <h2
                        class="text-xl font-black uppercase tracking-tighter italic"
                      >
                        Executive Registration
                      </h2>
                      <button
                        @click="$emit('close')"
                        class="text-slate-400 hover:text-white"
                      >
                        <Icon name="lucide:x" class="w-6 h-6" />
                      </button>
                    </div>
                    <p
                      class="text-[10px] text-maedot-gold font-black uppercase tracking-widest mt-2"
                    >
                      Manual Leadership Entry
                    </p>
                  </div>

                  <!-- Form Content -->
                  <div class="flex-grow p-8 space-y-6 overflow-y-auto">
                    <div class="space-y-4">
                      <BaseInput
                        v-model="form.full_name"
                        label="Full Name"
                        placeholder="Abebe Kebede..."
                        icon="lucide:user"
                      />
                      <BaseInput
                        v-model="form.phone"
                        label="Phone Number"
                        placeholder="+251 9..."
                        icon="lucide:phone"
                      />
                      <BaseInput
                        v-model="form.student_id"
                        label="University ID"
                        placeholder="UoG/123/15"
                        icon="lucide:id-card"
                      />
                    </div>

                    <!-- Role Selector -->
                    <div
                      class="p-4 bg-slate-50 rounded-3xl border border-slate-100 space-y-2"
                    >
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase"
                        >Assigned Guba Role</label
                      >
                      <select
                        v-model="form.role"
                        class="w-full bg-transparent text-sm font-bold outline-none text-maedot-navy"
                      >
                        <option value="MEMBER">Regular Member</option>
                        <option value="ADVISOR">
                          Senate Advisor (Ametatse)
                        </option>
                        <option value="STAFF">Guba Staff</option>
                      </select>
                    </div>

                    <!-- ID Photo Upload (Ref: Proactive Request) -->
                    <div class="space-y-2">
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                        >Physical ID Verification</label
                      >
                      <div
                        class="p-6 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center bg-slate-50 group hover:border-maedot-gold transition-colors cursor-pointer"
                      >
                        <Icon
                          name="lucide:camera"
                          class="w-8 h-8 text-slate-300 group-hover:text-maedot-gold mb-2"
                        />
                        <p
                          class="text-[9px] font-black text-slate-400 uppercase tracking-tighter"
                        >
                          Capture or Upload ID Card
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Action Footer -->
                  <div class="p-6 bg-slate-50 border-t flex gap-3">
                    <BaseButton variant="ghost" block @click="$emit('close')"
                      >Cancel</BaseButton
                    >
                    <BaseButton
                      variant="primary"
                      block
                      icon="lucide:user-plus"
                      @click="handleRegister"
                    >
                      Authorize Entry
                    </BaseButton>
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
const emit = defineEmits(["close", "registered"]);

const form = reactive({
  full_name: "",
  phone: "",
  student_id: "",
  role: "MEMBER",
});

const handleRegister = () => {
  // Logic: Insert directly into public.users with 'is_verified: true'
  // Skip the standard Secretary queue.
  emit("registered", { ...form });
  emit("close");
};
</script>
