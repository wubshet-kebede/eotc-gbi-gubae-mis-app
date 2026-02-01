<script setup>
definePageMeta({
  layout: false,
});
const loading = ref(false);
const form = reactive({
  name: "",
  university: "",
  city: "Gondar",
  leader_name: "",
});

const submitRequest = async () => {
  loading.value = true;
  // This sends data to your 'pending_organizations' table in Hasura
  setTimeout(() => {
    loading.value = false;
    alert("Request Sent! Our team will verify your Gbi Gubae within 24 hours.");
    navigateTo("/");
  }, 2000);
};
</script>
<template>
  <NuxtLayout name="default">
    <section class="py-20 bg-eotc-cream min-h-screen">
      <div class="max-w-3xl mx-auto px-4">
        <BaseCard padding class="border-t-4 border-maedot-gold">
          <div class="space-y-6">
            <div class="text-center space-y-2">
              <h1 class="text-3xl font-black text-maedot-navy">
                Onboard Your Association
              </h1>
              <p class="text-slate-500">
                Submit a request to join the Ma'edot digital network.
              </p>
            </div>

            <form @submit.prevent="submitRequest" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BaseInput
                  v-model="form.name"
                  label="Gbi Gubae Name"
                  placeholder="e.g. Fasil Gbi Gubae"
                  icon="lucide:church"
                />
                <BaseInput
                  v-model="form.university"
                  label="University Name"
                  placeholder="University of Gondar"
                  icon="lucide:graduation-cap"
                />
              </div>

              <!-- Location Logic -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-slate-700 ml-1"
                    >City / Diocese</label
                  >
                  <select
                    v-model="form.city"
                    class="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-maedot-gold"
                  >
                    <option
                      v-for="city in ['Gondar', 'Addis Ababa', 'Bahir Dar']"
                      :key="city"
                    >
                      {{ city }}
                    </option>
                  </select>
                </div>
                <BaseInput
                  v-model="form.leader_name"
                  label="Chairperson Name"
                  placeholder="Full Name"
                  icon="lucide:user"
                />
              </div>

              <!-- Verification Document (Ref #7) -->
              <div
                class="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center space-y-3"
              >
                <Icon
                  name="lucide:upload-cloud"
                  class="w-10 h-10 text-slate-400 mx-auto"
                />
                <p class="text-xs text-slate-500 font-medium">
                  Upload Official Recommendation Letter (PDF/JPG)
                </p>
                <input
                  type="file"
                  @change="handleFile"
                  class="hidden"
                  id="file-upload"
                />
                <BaseButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  @click="triggerUpload"
                  >Choose File</BaseButton
                >
              </div>

              <BaseButton block size="lg" :loading="loading"
                >Submit Onboarding Request</BaseButton
              >
            </form>
          </div>
        </BaseCard>
      </div>
    </section>
  </NuxtLayout>
</template>
