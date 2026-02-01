<script setup>
definePageMeta({ layout: false });

const route = useRoute();
const loading = ref(false);

const form = reactive({
  full_name: "",
  email: "",
  university_id: "",
  year: 1,
  dept: "Education",
  password: "",
  org_slug: route.params.slug,
});

const departments = [
  "Education",
  "Finance",
  "Mezmur",
  "Planning",
  "Audit",
  "Service",
];

const handleRegister = async () => {
  loading.value = true;
  // INDUSTRY LOGIC:
  // 1. Check if email/ID exists in this Gbi (Hasura)
  // 2. Create User with role 'MEMBER' and status 'PENDING'
  console.log("Registering to:", form.org_slug, form);
  setTimeout(() => (loading.value = false), 2000);
};
</script>
<template>
  <NuxtLayout name="auth">
    <div class="space-y-6">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-black text-maedot-navy capitalize">
          Join {{ $route.params.slug }} Gbi Gubae
        </h1>
        <p class="text-slate-500 text-sm">
          Please provide your details to request membership.
        </p>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister" class="grid grid-cols-1 gap-4">
        <!-- Section 1: Personal -->
        <BaseInput
          v-model="form.full_name"
          label="Full Name"
          icon="lucide:user"
          placeholder="Abebe Kebede"
        />
        <BaseInput
          v-model="form.email"
          label="Email Address"
          type="email"
          icon="lucide:mail"
          placeholder="abebe@uog.edu.et"
        />

        <!-- Section 2: University Data (Multi-tenant Logic) -->
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="form.university_id"
            label="University ID"
            placeholder="UGR/1234/14"
          />
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-slate-700 ml-1"
              >Batch / Year</label
            >
            <select
              v-model="form.year"
              class="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-maedot-gold"
            >
              <option v-for="y in [1, 2, 3, 4, 5, 6]" :key="y" :value="y">
                {{ y }} Year
              </option>
            </select>
          </div>
        </div>

        <!-- Section 3: Spiritual Department Choice -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-slate-700 ml-1"
            >Service Department</label
          >
          <select
            v-model="form.dept"
            class="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-maedot-gold"
          >
            <option v-for="d in departments" :key="d" :value="d">
              {{ d }}
            </option>
          </select>
        </div>

        <BaseInput
          v-model="form.password"
          label="Create Password"
          type="password"
          icon="lucide:lock"
        />

        <BaseButton
          block
          variant="primary"
          size="lg"
          :loading="loading"
          class="mt-4"
        >
          Submit Membership Request
        </BaseButton>
      </form>

      <p class="text-center text-sm text-slate-500">
        Already a member?
        <NuxtLink
          :to="`/login/${$route.params.slug}`"
          class="text-maedot-navy font-bold hover:underline"
        >
          Sign In
        </NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>
